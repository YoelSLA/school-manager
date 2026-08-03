import {
  Search,
} from "lucide-react";
import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import useDebounce from "../../../../../shared/utils/hooks/useDebounce";
import useEmpleadoSearch from "../../../hooks/queries/useEmpleadoSearch";
import type { EmpleadoEducativoBasicoDTO } from "../../../types";
import styles from "./EmpleadoAutocompleteBase.module.scss";

type AutocompleteProps = {
  value: string;
  onChange: (v: string) => void;
  onSelect: (e: EmpleadoEducativoBasicoDTO) => void;
  label?: ReactNode;
  placeholder?: string;
  error?: { message?: string };
  disabled?: boolean;
};

export default function EmpleadoAutocompleteBase({
  value,
  onChange,
  onSelect,
  label,
  placeholder,
  error,
  disabled,
}: AutocompleteProps) {
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const debouncedSearch = useDebounce(value, 300);

  const shouldSearch =
    !disabled && debouncedSearch.trim().length > 0;

  const { empleados, loading } = useEmpleadoSearch(
    shouldSearch ? debouncedSearch : "",
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  const handleSelect = (
    empleado: EmpleadoEducativoBasicoDTO,
  ) => {
    onSelect(empleado);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!empleados.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < empleados.length - 1 ? prev + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : empleados.length - 1,
        );
        break;

      case "Enter":
        if (highlightIndex >= 0) {
          e.preventDefault();
          handleSelect(empleados[highlightIndex]);
        }
        break;

      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.autocomplete}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={styles.label}
        >
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        <Search
          size={18}
          className={styles.searchIcon}
        />

        <input
          id={inputId}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          className={`${styles.input} ${error ? styles.inputError : ""
            }`}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setHighlightIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {shouldSearch && isOpen && (
        <div className={styles.dropdown}>
          {loading ? (
            <div className={styles.loading}>
              Buscando empleados...
            </div>
          ) : empleados.length > 0 ? (
            <ul className={styles.list}>
              {empleados.map((empleado, index) => (
                <li
                  key={empleado.id}
                  className={styles.item}
                >
                  <button
                    type="button"
                    className={`${styles.button} ${index === highlightIndex
                      ? styles.active
                      : ""
                      }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(empleado);
                    }}
                  >
                    {empleado.apellido},{" "}
                    {empleado.nombre}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              No se encontraron empleados.
            </div>
          )}
        </div>
      )}

      {error && (
        <span className={styles.error}>
          {error.message}
        </span>
      )}
    </div>
  );
}