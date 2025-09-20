// kolamData.ts

export interface Kolam {
  id: number;
  title: string;
  image: string;
  complexity: "Beginner" | "Intermediate" | "Expert";
  description: string;
  dotPattern?: "Pulli" | "Freehand"; // optional
  theme?: "Floral" | "Animal" | "Geometric"; // optional
  region?: "Tamil Nadu" | "Andhra Pradesh" | "Karnataka"; // optional
}

export const kolamData: Kolam[] = [
  {
    id: 1,
    title: "Pulli Kolam",
    image: "/images/kolam1.jpg",
    complexity: "Expert",
    description: "A complex geometric pattern from Tamil Nadu, created by meticulously connecting a grid of dots, known as pulli.",
    dotPattern: "Pulli",
    theme: "Geometric",
    region: "Tamil Nadu",
  },
  {
    id: 2,
    title: "Flower Kolam",
    image: "/images/kolam2.jpg",
    complexity: "Intermediate",
    description: "A vibrant, freehand floral kolam from Andhra Pradesh, often used to celebrate festivals and auspicious occasions.",
    dotPattern: "Freehand",
    theme: "Floral",
    region: "Andhra Pradesh",
  },
  {
    id: 3,
    title: "Floral Rangoli",
    image: "/images/kolam3.jpg",
    complexity: "Beginner",
    description: "An elegant and simple floral rangoli from Karnataka, making it an ideal design for beginners to create a welcoming ambiance.",
    dotPattern: "Freehand",
    theme: "Floral",
    region: "Karnataka",
  },
  {
    id: 4,
    title: "Peacock Kolam",
    image: "/images/kolam4.jpg",
    complexity: "Beginner",
    description: "A colorful and easy-to-draw peacock kolam from Karnataka, symbolizing beauty, grace, and good fortune in the household.",
    dotPattern: "Freehand",
    theme: "Animal",
    region: "Karnataka",
  },
  {
    id: 5,
    title: "Floral Muggu",
    image: "/images/kolam5.jpg",
    complexity: "Intermediate",
    description: "A lovely freehand muggu from Andhra Pradesh with a beautiful floral motif, showcasing graceful lines and flowing patterns.",
    dotPattern: "Freehand",
    theme: "Floral",
    region: "Andhra Pradesh",
  },
  {
    id: 6,
    title: "Festive Muggu",
    image: "/images/kolam6.jpg",
    complexity: "Expert",
    description: "An elaborate and grand muggu from Andhra Pradesh, traditionally drawn during major festivals to invite prosperity and joy.",
    dotPattern: "Freehand",
    theme: "Floral",
    region: "Andhra Pradesh",
  },
  {
    id: 7,
    title: "Intricate Rangavalli",
    image: "/images/kolam7.jpg",
    complexity: "Expert",
    description: "A highly detailed and complex rangavalli from Karnataka, featuring exquisite floral patterns that require both skill and patience.",
    dotPattern: "Freehand",
    theme: "Floral",
    region: "Karnataka",
  },
  {
    id: 8,
    title: "Freehand Flowers",
    image: "/images/kolam8.jpg",
    complexity: "Intermediate",
    description: "A beautiful freehand rangoli from Karnataka, composed of various flower designs and often used for daily home decoration.",
    dotPattern: "Freehand",
    theme: "Floral",
    region: "Karnataka",
  },
  {
    id: 9,
    title: "Fish Rangavalli",
    image: "/images/kolam9.jpg",
    complexity: "Intermediate",
    description: "A unique rangavalli from Karnataka with a fish motif, a symbol of good luck, fertility, and abundance in Indian culture.",
    dotPattern: "Freehand",
    theme: "Animal",
    region: "Karnataka",
  },
  {
    id: 10,
    title: "Flower Muggu",
    image: "/images/kolam10.jpg",
    complexity: "Intermediate",
    description: "Another delightful freehand flower muggu from Andhra Pradesh, a perfect design for adding a touch of elegance to any occasion.",
    dotPattern: "Freehand",
    theme: "Floral",
    region: "Andhra Pradesh",
  },
  {
    id: 11,
    title: "Sikku Kolam",
    image: "/images/kolam11.jpg",
    complexity: "Beginner",
    description: "A simple yet captivating Sikku or 'tangled' kolam from Tamil Nadu, created with a single, continuous line looping around dots.",
    dotPattern: "Pulli",
    theme: "Geometric",
    region: "Tamil Nadu",
  },
  {
    id: 12,
    title: "Pulli Kolam",
    image: "/images/kolam12.jpg",
    complexity: "Beginner",
    description: "A traditional Pulli kolam from Tamil Nadu that forms a basic geometric pattern, making it ideal for daily practice and decoration.",
    dotPattern: "Pulli",
    theme: "Geometric",
    region: "Tamil Nadu",
  },
];