"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaClipboardList, FaDollarSign } from "react-icons/fa";
import AnimalCard from "@/components/UI/AnimalsCard/AnimalCard";
import { fetchUserFavorites, fetchUserAdoptions, fetchUserDonations, FavoriteAnimal, AdoptionProcess, UserDonation } from "@/services/User/User";
import styles from "./page.module.css";

export default function UserProfile() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [favoriteAnimals, setFavoriteAnimals] = useState<FavoriteAnimal[]>([]);
  const [adoptionProcesses, setAdoptionProcesses] = useState<AdoptionProcess[]>([]);
  const [donations, setDonations] = useState<UserDonation[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [isLoadingAdoptions, setIsLoadingAdoptions] = useState(true);
  const [isLoadingDonations, setIsLoadingDonations] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/entrar");
      return;
    }

    if (user) {
      loadUserData();
    }
  }, [user, isLoading, router]);

  const loadUserData = async () => {
    try {
      setIsLoadingFavorites(true);
      setIsLoadingAdoptions(true);
      setIsLoadingDonations(true);

      const [favorites, adoptions, userDonations] = await Promise.all([
        fetchUserFavorites(),
        fetchUserAdoptions(),
        fetchUserDonations()
      ]);

      setFavoriteAnimals(favorites);
      setAdoptionProcesses(adoptions);
      setDonations(userDonations);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoadingFavorites(false);
      setIsLoadingAdoptions(false);
      setIsLoadingDonations(false);
    }
  };

  const handleFavoriteClick = (animalId: string) => {
    setFavoriteAnimals(prev => prev.filter(animal => animal.id !== animalId));
  };

  const getAdoptionStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "var(--yellow-capiba)";
      case "approved":
        return "var(--green-capiba)";
      case "rejected":
        return "var(--orange-capiba)";
      default:
        return "var(--text-color)";
    }
  };

  const getAdoptionStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Aguardando";
      case "approved":
        return "Aprovado";
      case "rejected":
        return "Rejeitado";
      default:
        return "Desconhecido";
    }
  };

  const getDonationStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "var(--yellow-capiba)";
      case "completed":
        return "var(--green-capiba)";
      case "failed":
        return "var(--orange-capiba)";
      default:
        return "var(--text-color)";
    }
  };

  const getDonationStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Processando";
      case "completed":
        return "Concluída";
      case "failed":
        return "Falhou";
      default:
        return "Desconhecido";
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>
                {user.fullName || user.nome}
              </h1>
              <p className={styles.subtitle}>
                Seu perfil de adotante
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleContainer}>
              <FaHeart className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>Animais Favoritos</h2>
            </div>
            <span className={styles.sectionCount}>
              {favoriteAnimals.length} {favoriteAnimals.length === 1 ? 'animal' : 'animais'}
            </span>
          </div>

          {isLoadingFavorites ? (
            <div className={styles.loading}>Carregando favoritos...</div>
          ) : favoriteAnimals.length > 0 ? (
            <div className={styles.animalsGrid}>
              {favoriteAnimals.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  {...animal}
                  isFavorite={true}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <FaHeart className={styles.emptyIcon} />
              <h3>Nenhum animal favoritado</h3>
              <p>Você ainda não favoritou nenhum animal. Explore nossos pets disponíveis!</p>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleContainer}>
              <FaClipboardList className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>Processos de Adoção</h2>
            </div>
            <span className={styles.sectionCount}>
              {adoptionProcesses.length} {adoptionProcesses.length === 1 ? 'processo' : 'processos'}
            </span>
          </div>

          {isLoadingAdoptions ? (
            <div className={styles.loading}>Carregando processos...</div>
          ) : adoptionProcesses.length > 0 ? (
            <div className={styles.adoptionGrid}>
              {adoptionProcesses.map((process) => (
                <div key={process.id} className={styles.adoptionCard}>
                  <div className={styles.adoptionImageContainer}>
                    <img
                      src={process.animalImage || "/images/placeholder-animal.jpg"}
                      alt={process.animalNome}
                      className={styles.adoptionImage}
                    />
                  </div>
                  <div className={styles.adoptionContent}>
                    <h3 className={styles.adoptionAnimalName}>{process.animalNome}</h3>
                    <p className={styles.adoptionOngName}>{process.ongNome}</p>
                    <div
                      className={styles.adoptionStatus}
                      style={{ backgroundColor: getAdoptionStatusColor(process.status) }}
                    >
                      {getAdoptionStatusText(process.status)}
                    </div>
                    <div className={styles.adoptionDates}>
                      <small>Iniciado: {new Date(process.dataInicio).toLocaleDateString()}</small>
                      <small>Última atualização: {new Date(process.ultimaAtualizacao).toLocaleDateString()}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <FaClipboardList className={styles.emptyIcon} />
              <h3>Nenhum processo de adoção</h3>
              <p>Você ainda não iniciou nenhum processo de adoção. Que tal começar agora?</p>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleContainer}>
              <FaDollarSign className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>Doações</h2>
            </div>
            <span className={styles.sectionCount}>
              {donations.length} {donations.length === 1 ? 'doação' : 'doações'}
            </span>
          </div>

          {isLoadingDonations ? (
            <div className={styles.loading}>Carregando doações...</div>
          ) : donations.length > 0 ? (
            <div className={styles.donationGrid}>
              {donations.map((donation) => (
                <div key={donation.id} className={styles.donationCard}>
                  <div className={styles.donationContent}>
                    <h3 className={styles.donationOngName}>{donation.ongNome}</h3>
                    <div className={styles.donationAmount}>
                      R$ {donation.valor.toFixed(2)}
                    </div>
                    <div className={styles.donationDate}>
                      {new Date(donation.data).toLocaleDateString()}
                    </div>
                    <div
                      className={styles.donationStatus}
                      style={{ backgroundColor: getDonationStatusColor(donation.status) }}
                    >
                      {getDonationStatusText(donation.status)}
                    </div>
                    {donation.mensagem && (
                      <div className={styles.donationMessage}>
                        "{donation.mensagem}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <FaDollarSign className={styles.emptyIcon} />
              <h3>Nenhuma doação realizada</h3>
              <p>Você ainda não fez nenhuma doação. Ajude uma ONG hoje!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}