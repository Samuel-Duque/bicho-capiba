export const especiesData = [
  {
    value: "Cachorros",
    label: "Cachorros",
    iconSrc: "/images/DogFilter.png",
    iconAlt: "Cachorro"
  },
  {
    value: "Gatos",
    label: "Gatos",
    iconSrc: "/images/CatFilter.png",
    iconAlt: "Gato"
  },
  {
    value: "Equinos",
    label: "Equinos",
    iconSrc: "/images/HorseFilter.png",
    iconAlt: "Cavalo"
  },
  {
    value: "Cobras",
    label: "Cobras",
    iconSrc: "/images/SnakeFilter.png",
    iconAlt: "Cobra"
  },
  {
    value: "Roedores",
    label: "Roedores",
    iconSrc: "/images/RatFilter.png",
    iconAlt: "Roedor"
  }
];

export const sexoData = [
  {
    value: "M",
    label: "Macho",
    iconType: "male"
  },
  {
    value: "F",
    label: "Fêmea",
    iconType: "female"
  }
];

export const porteOptions = [
  { value: "Pequeno", label: "Pequeno" },
  { value: "Medio", label: "Médio" },
  { value: "Grande", label: "Grande" }
];

export const coresData = [
  {
    value: "Preto",
    label: "Preto",
    hex: "#000000"
  },
  {
    value: "Branco",
    label: "Branco",
    hex: "#FFFFFF"
  },
  {
    value: "Marrom",
    label: "Marrom",
    hex: "#8B4513"
  },
  {
    value: "Caramelo",
    label: "Caramelo",
    hex: "#D2691E"
  },
  {
    value: "Cinza",
    label: "Cinza",
    hex: "#808080"
  },
  {
    value: "Dourado",
    label: "Dourado",
    hex: "#FFD700"
  },
  {
    value: "Amarelo",
    label: "Amarelo",
    hex: "#FFFF00"
  },
  {
    value: "Laranja",
    label: "Laranja",
    hex: "#FF8C00"
  },
  {
    value: "Vermelho",
    label: "Vermelho",
    hex: "#FF0000"
  },
  {
    value: "Tricolor",
    label: "Tricolor",
    hex: "linear-gradient(45deg, #8B4513, #FFFFFF, #000000)"
  },
  {
    value: "Rajado",
    label: "Rajado",
    hex: "linear-gradient(45deg, #8B4513, #D2691E)"
  },
  {
    value: "Malhado",
    label: "Malhado",
    hex: "linear-gradient(45deg, #FFFFFF, #000000)"
  },
  {
    value: "Outros",
    label: "Outros",
    hex: "#9CA3AF"
  }
];

export const racasPorEspecie = {
  Cachorros: [
    "Sem Raça Definida",
    "Akita",
    "Beagle",
    "Border Collie",
    "Boxer",
    "Bulldog Francês",
    "Bulldog Inglês",
    "Chihuahua",
    "Cocker Spaniel",
    "Dachshund",
    "Dálmata",
    "Doberman",
    "Fila Brasileiro",
    "Golden Retriever",
    "Husky Siberiano",
    "Labrador",
    "Lhasa Apso",
    "Maltês",
    "Pastor Alemão",
    "Pinscher",
    "Pitbull",
    "Poodle",
    "Pug",
    "Rottweiler",
    "Schnauzer",
    "Shih Tzu",
    "Yorkshire",
    "Outra Raça"
  ],
  Gatos: [
    "Sem Raça Definida",
    "Angorá",
    "Bengal",
    "Birmanês",
    "British Shorthair",
    "Maine Coon",
    "Persa",
    "Ragdoll",
    "Russo Azul",
    "Sagrado da Birmânia",
    "Siamês",
    "Sphynx",
    "Outra Raça"
  ],
  Equinos: [
    "Sem Raça Definida",
    "Árabe",
    "Campolina",
    "Crioulo",
    "Lusitano",
    "Mangalarga",
    "Mangalarga Marchador",
    "Paint Horse",
    "Pantaneiro",
    "Puro Sangue Inglês",
    "Quarter Horse",
    "Outra Raça"
  ],
  Cobras: [
    "Sem Raça Definida",
    "Jiboia",
    "Píton",
    "Cobra do Milho",
    "King Snake",
    "Ball Python",
    "Outra Raça"
  ],
  Roedores: [
    "Sem Raça Definida",
    "Hamster Sírio",
    "Hamster Chinês",
    "Hamster Anão Russo",
    "Porquinho da Índia",
    "Chinchila",
    "Gerbil",
    "Rato Twister",
    "Outra Raça"
  ]
};

// Helper function to convert race arrays to dropdown format
export const getRacasOptions = (especie: string) => {
  const racas = racasPorEspecie[especie as keyof typeof racasPorEspecie] || [];
  return racas.map(raca => ({ value: raca, label: raca }));
};

// Helper function to convert vaccines to checkbox format (keeping current structure)
export const getVacinasOptions = (especie: string) => {
  return vacinasPorEspecie[especie as keyof typeof vacinasPorEspecie] || [];
};

export const vacinasPorEspecie = {
  Cachorros: [
    "V8 (Óctupla)",
    "V10 (Décupla)",
    "Antirrábica",
    "Gripe Canina (Traqueobronquite)",
    "Giardíase",
    "Leishmaniose",
    "Não vacinado",
    "Outras"
  ],
  Gatos: [
    "V3 (Tríplice Felina)",
    "V4 (Quádrupla Felina)",
    "V5 (Quíntupla Felina)",
    "Antirrábica",
    "FeLV (Leucemia Felina)",
    "FIV (Imunodeficiência Felina)",
    "Não vacinado",
    "Outras"
  ],
  Equinos: [
    "Tétano",
    "Encefalomielite",
    "Influenza Equina",
    "Herpesvírus Equino",
    "Adenite Equina",
    "Não vacinado",
    "Outras"
  ],
  Cobras: [
    "Não se aplica",
    "Antiofídica (se necessário)",
    "Outras"
  ],
  Roedores: [
    "Não se aplica",
    "Vacinas específicas da espécie",
    "Outras"
  ]
};