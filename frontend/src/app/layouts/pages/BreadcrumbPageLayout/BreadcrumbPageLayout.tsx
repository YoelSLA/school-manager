import type { ReactNode } from "react";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import PageLayout from "../PageLayout";

type Props = {
  children: ReactNode;
  showBreadcrumbs?: boolean;
};

export default function BreadcrumbPageLayout({
  children,
  showBreadcrumbs = true,
}: Props) {
  return (
    <PageLayout
      header={showBreadcrumbs ? <Breadcrumbs /> : undefined}
    >
      {children}
    </PageLayout>
  );
}