import {
  forwardRef,
  type MouseEvent,
  type ReactNode,
  useState,
} from "react";
import styles from "./Button.module.scss";
import type {
  ButtonSize,
  ButtonVariant,
  DropdownItem,
} from "./Button.types";

const variantClass = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  success: styles.btnSuccess,
  danger: styles.btnDanger,
  ghost: styles.btnGhost,
  filter: styles.btnFilter,
};

const sizeClass = {
  sm: styles.btnSm,
  md: styles.btnMd,
  icon: styles.btnIcon,
};

type Props = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title?: string;
  id?: string;
  fullWidth?: boolean;
  dropdownItems?: DropdownItem[];
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      onClick,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      active = false,
      type = "button",
      className = "",
      leftIcon,
      rightIcon,
      title,
      id,
      fullWidth = false,
      dropdownItems,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const isDisabled = disabled || loading;

    const classes = [
      styles.btn,
      variantClass[variant],
      sizeClass[size],
      active && styles.isActive,
      loading && styles.isLoading,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (dropdownItems) {
        setOpen((prev) => !prev);
        return;
      }

      onClick?.(e);
    };

    const button = (
      <button
        ref={ref}
        id={id}
        title={title}
        type={type}
        className={classes}
        onClick={isDisabled ? undefined : handleClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
      >
        {loading && <span className={styles.spinner} />}

        <span className={styles.content}>
          {leftIcon && (
            <span className={styles.icon}>
              {leftIcon}
            </span>
          )}

          <span>{children}</span>

          {dropdownItems ? (
            <span className={styles.icon}>▾</span>
          ) : (
            rightIcon && (
              <span className={styles.icon}>
                {rightIcon}
              </span>
            )
          )}
        </span>
      </button>
    );

    if (!dropdownItems) {
      return button;
    }

    return (
      <div className={styles.wrapper}>
        {button}

        {open && (
          <div className={styles.dropdown}>
            {dropdownItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={[
                  styles.dropdownItem,
                  item.danger &&
                  styles.dropdownItemDanger,
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;

                  item.onClick();
                  setOpen(false);
                }}
              >
                {item.icon && (
                  <span className={styles.icon}>
                    {item.icon}
                  </span>
                )}

                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Button.displayName = "Button";

export default Button;