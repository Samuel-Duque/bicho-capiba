"use client";

import React, { use, useState } from "react";
import AnimalCard from "@/components/ui/AnimalsCard/AnimalCard";
import { mockAnimals } from "@/data/mockAnimals";
import styles from "./CloseAnimalsFeed.module.css";

const CloseAnimalsFeed = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFavoriteClick = (animalId: string) => {
    setFavorites((prev) =>
      prev.includes(animalId)
        ? prev.filter((id) => id !== animalId)
        : [...prev, animalId]
    );
  };

  return (
    <div className={styles.feed}>
      {mockAnimals.map((animal) => (
        <AnimalCard
          key={animal.id}
          id={animal.id}
          name={animal.name}
          image={animal.image}
          gender={animal.gender}
          age={animal.age}
          species={animal.species}
          distance={animal.distance}
          neighborhood={animal.neighborhood}
          city={animal.city}
          isFavorite={favorites.includes(animal.id)}
          onFavoriteClick={handleFavoriteClick}
        />
      ))}
    </div>
  );
};

export default CloseAnimalsFeed;
