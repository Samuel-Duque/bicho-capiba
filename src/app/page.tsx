import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import AdoptionDonationSections from "@/components/AdoptionDonationSections";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Encontre seu melhor amigo para sempre:{" "}
            <span className={styles.highlight}>adote</span>,{" "}
            <span className={styles.highlight}>ame</span> e seja{" "}
            <span className={styles.highlight}>amado.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Em nossos abrigos, dezenas de corações batem na esperança de
            encontrar uma família para amar. Cães e gatos resgatados, cada um
            com sua história única, aguardam pacientemente por alguém especial.
            Será você a pessoa que eles tanto esperam?
          </p>
          <Link href="/adotar">
            <Button
              variant="primary"
              color="yellow"
              size="large"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Saiba Mais
            </Button>
          </Link>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/HeroDog.png"
            alt="Cachorro esperando por adoção"
            width={470}
            height={470}
            priority
          />
        </div>
      </section>
      <AdoptionDonationSections />
    </div>
  );
}
