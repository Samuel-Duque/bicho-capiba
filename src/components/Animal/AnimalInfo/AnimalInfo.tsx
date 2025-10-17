"use client";

import { useState } from "react";
import { LuBuilding, LuCake, LuHeartOff } from "react-icons/lu";
import { BsFillTelephoneFill } from "react-icons/bs";
import ImageWithFallback from "@/components/utils/ImageWithFallback";
import styles from "./AnimalInfo.module.css";

interface Animal {
  id: string;
  nome: string;
  images: string[];
  sexo: "M" | "F";
  idade: number;
  raca: string;
  distancia: string;
  bairroOng: string;
  cidadeOng: string;
  descricao: string;
  historia?: string;
  castrado?: boolean;
}

interface Ong {
  nome: string;
  endereco: string;
  telefone: string;
  imagem: string;
}

interface AnimalInfoProps {
  animal: Animal;
  ong: Ong;
}

export default function AnimalInfo({ animal, ong }: AnimalInfoProps) {
  const [showFullStory, setShowFullStory] = useState(false);
  const storyText = animal.historia || animal.descricao;
  const maxLength = 550;
  const shouldTruncate = storyText.length > maxLength;
  const displayText =
    shouldTruncate && !showFullStory
      ? storyText.substring(0, maxLength) + "..."
      : storyText;

  return (
    <section className={styles.animalInfo}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>Olá, meu nome é {animal.nome}</h1>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <LuBuilding className={styles.statIcon} />
              <span>{ong.nome}</span>
            </div>
            <div className={styles.statItem}>
              <LuCake className={styles.statIcon} />
              <span>
                {animal.idade} {animal.idade === 1 ? "ano" : "anos"}
              </span>
            </div>
            <div className={styles.statItem}>
              <LuHeartOff className={styles.statIcon} />
              <span>{animal.castrado ? "Castrado" : "Não castrado"}</span>
            </div>
          </div>

          <h2 className={styles.historyTitle}>Minha História</h2>
          <div className={styles.historySection}>
            <div className={styles.historyText}>
              {displayText.split("\n").map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            {shouldTruncate && (
              <button
                className={styles.showMoreButton}
                onClick={() => setShowFullStory(!showFullStory)}
              >
                {showFullStory ? "Mostrar menos" : "Ver história completa"}
              </button>
            )}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <button className={styles.adoptButton}>
            Quero adotar {animal.sexo === "M" ? "o" : "a"} {animal.nome}
          </button>

          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6333824!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a2b2ed7f3a1%3A0xab35da2f5ca62674!2sSão%20Paulo%2C%20SP!5e0!3m2!1spt!2sbr!4v1697875200000!5m2!1spt!2sbr"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            />
          </div>

          <div className={styles.ongInfo}>
            <div className={styles.ongHeader}>
              <div className={styles.ongImageContainer}>
                <ImageWithFallback
                  src={ong.imagem}
                  alt={`Logo da ${ong.nome}`}
                  fill
                  className={styles.ongImage}
                  sizes="80px"
                />
              </div>
              <div className={styles.ongDetails}>
                <h3 className={styles.ongName}>{ong.nome}</h3>
                <p className={styles.ongAddress}>{ong.endereco}</p>
              </div>
              <button className={styles.phoneButton}>
                <BsFillTelephoneFill className={styles.phoneIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
