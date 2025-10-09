"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import styles from "./FilterCarousel.module.css";

const filters = [
  {
    title: "Gatos",
    imageSrc: "/images/CatFilter.png",
    imageAlt: "Gato",
  },
  {
    title: "Cachorros",
    imageSrc: "/images/DogFilter.png",
    imageAlt: "Cachorro",
  },
  {
    title: "Equinos",
    imageSrc: "/images/HorseFilter.png",
    imageAlt: "Cavalo",
  },
];

export default function FilterCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filters.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filters.length) % filters.length);
  };

  return (
    <div className={styles.carousel}>
      <button
        className={styles.arrowButton}
        onClick={prevSlide}
        aria-label="Filtro anterior"
      >
        <FaArrowLeft size={25} />
      </button>

      <div className={styles.cardsContainer}>
        <div className={styles.cardsWrapper}>
          {filters.map((filter, index) => (
            <div key={index} className={styles.cardItem}>
              <div className={styles.card}>
                <h3 className={styles.title}>{filter.title}</h3>

                <img
                  src={filter.imageSrc}
                  alt={filter.imageAlt}
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className={styles.arrowButton}
        onClick={nextSlide}
        aria-label="Próximo filtro"
      >
        <FaArrowRight size={25} />
      </button>
    </div>
  );
}
