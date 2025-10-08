import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image
        src="/logoCapiba.svg"
        alt="Bicho Capiba Logo"
        width={500}
        height={500}
      />
      <h1 style={{ color: "var(--text-color)" }}>Bicho Capiba</h1>
    </div>
  );
}
