import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./AdoptionDonationSections.module.css";

export default function AdoptionDonationSections() {
  return (
    <div className={styles.sectionsContainer}>
      <div className={styles.adoptionSection}>
        <div className={styles.pawsImageContainer}>
          <img
            src="/images/BlurredPaws.png"
            alt="Patas desfocadas"
            className={styles.pawsImage}
          />
        </div>
        <Image
          src="/images/CatAdoptionCard.png"
          alt="Gato para adoção"
          width={268}
          height={268}
          className={styles.adoptionImage}
        />
        <div className={styles.adoptionContent}>
          <h2 className={styles.adoptionTitle}>Adote um pet</h2>
          <p className={styles.adoptionSubtitle}>
            Transforme uma vida e ganhe um amigo para sempre. Milhares de pets
            estão esperando por um lar cheio de amor. Que tal ser você a fazer a
            diferença?
          </p>
          <button className={styles.adoptionButton}>
            Quero adotar
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.donationSection}>
        <img
          src="/images/BlurredCoins.png"
          alt="Moedas desfocadas"
          className={styles.coinsImage}
        />
        <Image
          src="/images/DogDonationCard.png"
          alt="Cachorro para doação"
          width={273.34}
          height={230.36}
          className={styles.donationImage}
        />
        <div className={styles.donationContent}>
          <h2 className={styles.donationTitle}>Apoie uma ONG</h2>
          <p className={styles.donationSubtitle}>
            Transforme uma vida e ganhe um amigo para sempre. Milhares de pets
            estão esperando por um lar cheio de amor. Que tal ser você a fazer a
            diferença?
          </p>
          <button className={styles.donationButton}>
            Apoiar uma ONG
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
