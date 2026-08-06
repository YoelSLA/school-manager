import type { ReactNode } from "react";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import Pagination from "@/shared/components/Pagination";
import PageLayout from "../PageLayout";
import styles from "./ToolbarPageLayout.module.scss";

type Props = {
  children: ReactNode;
  toolbar?: ReactNode;
  showToolbar?: boolean;
  showBreadcrumbs?: boolean;

  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export default function ToolbarPageLayout({
  children,
  toolbar,
  showToolbar = true,
  showBreadcrumbs = false,
  page,
  totalPages,
  onPageChange,
}: Props) {
  const showPagination =
    page !== undefined &&
    totalPages !== undefined &&
    onPageChange !== undefined;

  const header =
    showBreadcrumbs || (showToolbar && toolbar) ? (
      <div className={styles.header}>
        {showBreadcrumbs && <Breadcrumbs />}
        {showToolbar && toolbar}
      </div>
    ) : undefined;

  const footer = showPagination ? (
    <Pagination
      page={page}
      totalPages={totalPages}
      onChange={onPageChange}
    />
  ) : undefined;

  return (
    <PageLayout
      header={header}
      footer={footer}
    >
      {children}
    </PageLayout>
  );
}