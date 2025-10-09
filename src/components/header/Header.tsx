"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Header.module.css";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Adote", href: "/adote" },
  { label: "Faça uma doação", href: "/doacao" },
  { label: "Resgate", href: "/resgate" },
  { label: "Meu Pet dos Sonhos", href: "/pet-sonhos" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/"}>
          <Image
            src="/icons/logoCapibaDark.svg"
            alt="Bicho Capiba Logo"
            width={200}
            height={40}
            style={{ textAlign: "left" }}
            priority
          />
        </Link>
      </div>
      <nav className={styles.nav}>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${
              pathname === item.href ? styles.active : ""
            }`}
          >
            {item.label}
            {pathname === item.href && <span className={styles.dot}></span>}
          </Link>
        ))}
      </nav>
    </header>
  );
}
