import {
  FaHeart,
  FaRegHeart,
  FaMars,
  FaVenus,
  FaClock,
  FaPaw,
  FaMapMarkerAlt,
} from "react-icons/fa";
import styles from "./AnimalCard.module.css";

interface AnimalCardProps {
  id: string;
  name: string;
  image: string;
  gender: "male" | "female";
  age: string;
  species: string;
  distance: string;
  neighborhood: string;
  city: string;
  isFavorite?: boolean;
  onFavoriteClick?: (id: string) => void;
}

export default function AnimalCard({
  id,
  name,
  image,
  gender,
  age,
  species,
  distance,
  neighborhood,
  city,
  isFavorite = false,
  onFavoriteClick,
}: AnimalCardProps) {
  const handleFavoriteClick = () => {
    onFavoriteClick?.(id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonLiked : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? (
            <FaHeart className={styles.heartFilled} />
          ) : (
            <FaRegHeart className={styles.heart} />
          )}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.nameRow}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.genderIcon} title={gender === "male" ? "Macho" : "Fêmea"}>
            {gender === "male" ? <FaMars /> : <FaVenus />}
          </div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <FaClock className={styles.icon} />
            <span className={styles.text}>{age}</span>
          </div>
          <div className={styles.infoItem}>
            <FaPaw className={styles.icon} />
            <span className={styles.text}>{species}</span>
          </div>
        </div>

        <div className={styles.locationRow}>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <span className={styles.text}>
              {distance} • {neighborhood}, {city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
