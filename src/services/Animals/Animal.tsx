import { getApiInstance } from "@/hooks/Api";

const speciesMap: { [key: string]: string } = {
  Cachorro: "dog",
  Gato: "cat",
  Cavalo: "horse",
  Pássaro: "bird",
  Coelho: "rabbit",
};

export const fetchAnimals = async () => {
  try {
    const api = getApiInstance();
    const response = await api.get("/animals");

    const animals = response.data.result.map((animal: any) => ({
      id: animal.uuid,
      nome: animal.nome,
      image: animal.fotos?.[0]?.url ? `https://${animal.fotos[0].url}` : "",
      sexo: animal.sexo,
      idade: animal.idade,
      especie: speciesMap[animal.especie] || animal.especie.toLowerCase(),
      raca: animal.raca,
      distance: "Próximo",
      neighborhood: animal.ong?.nome || "Não informado",
      city: "Recife",
    }));

    return animals;
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};
