export interface Animal {
  id: string;
  name: string;
  image: string;
  gender: "male" | "female";
  age: string;
  species: string;
  distance: string;
  neighborhood: string;
  city: string;
}

export const mockAnimals: Animal[] = [
  {
    id: "1",
    name: "Bolt",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop",
    gender: "male",
    age: "2 anos",
    species: "Golden Retriever",
    distance: "0.7km",
    neighborhood: "Imbiribeira",
    city: "Recife"
  },
  {
    id: "2",
    name: "Luna",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
    gender: "female",
    age: "1 ano",
    species: "Vira-lata",
    distance: "1.2km",
    neighborhood: "Boa Viagem",
    city: "Recife"
  },
  {
    id: "3",
    name: "Max",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    gender: "male",
    age: "3 anos",
    species: "Labrador",
    distance: "2.1km",
    neighborhood: "Pina",
    city: "Recife"
  },
  {
    id: "4",
    name: "Mia",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
    gender: "female",
    age: "6 meses",
    species: "Gato Persa",
    distance: "0.5km",
    neighborhood: "Setúbal",
    city: "Recife"
  },
  {
    id: "5",
    name: "Rex",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    gender: "male",
    age: "4 anos",
    species: "Pastor Alemão",
    distance: "3.2km",
    neighborhood: "Casa Forte",
    city: "Recife"
  },
  {
    id: "6",
    name: "Bella",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop",
    gender: "female",
    age: "2 anos",
    species: "Border Collie",
    distance: "1.8km",
    neighborhood: "Graças",
    city: "Recife"
  }
];