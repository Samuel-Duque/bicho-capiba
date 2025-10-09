import Image from "next/image";
import FilterCarousel from "@/components/Adote/FilterCarousel";
import styles from "./page.module.css";

export default function Adotar() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBlurLeft}>
          <img
            src="/icons/blurredPaws.svg"
            alt=""
            className={styles.blurredPaws}
          />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.textContainer}>
            <h1 className={styles.heroTitle}>
              Adote um Companheiro <br /> para a Vida
            </h1>
            <p className={styles.heroSubtitle}>
              Transforme uma vida e ganhe um amigo para sempre. São milhares de
              pets esperando por um lar cheio de amor, carinho e a chance de
              serem felizes.
            </p>
          </div>
          <img
            src="/images/AdoptionHeroDog.png"
            alt="Cachorro esperando por adoção"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroBlurRight}>
          <img
            src="/icons/blurredPaws2.svg"
            alt=""
            className={styles.blurredPaws2}
          />
        </div>
      </section>

      <section className={styles.filtersSection}>
        <FilterCarousel />
      </section>
    </div>
  );
}
