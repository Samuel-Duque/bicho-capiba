"use client";

import { useParams } from "next/navigation";
import AnimalHero from "@/components/Animal/AnimalHero/AnimalHero";
import styles from "./page.module.css";

export default function AnimalProfile() {
  const params = useParams();
  const animalId = params.id as string;

  const mockAnimal = {
    id: animalId,
    nome: "Belinha",
    images: [
      "/images/MockDog1.png",
      "/images/MockDog2.png",
      "/images/MockDog3.png",
      "/images/MockDog1.png",
      "/images/MockDog2.png",
      "/images/MockDog3.png",
    ],
    sexo: "F" as const,
    idade: 2,
    raca: "Labrador",
    distancia: "5km",
    bairroOng: "Centro",
    cidadeOng: "São Paulo",
    descricao: "Uma cachorrinha muito carinhosa e brincalhona...",
  };

  return (
    <div className={styles.page}>
      <AnimalHero animal={mockAnimal} />
    </div>
  );
}
