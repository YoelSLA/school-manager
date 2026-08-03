import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/Navbar";
import styles from "./AppLayout.module.scss";

export default function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Navbar />

      <main className={styles.appLayout__content}>
        <Outlet />
      </main>
    </div>
  );
}
