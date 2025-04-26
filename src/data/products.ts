export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Basic T-Shirt",
    price: 25,
    imageUrl: "https://via.placeholder.com/300x400/0000FF/FFFFFF?text=T-Shirt",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 60,
    imageUrl: "https://via.placeholder.com/300x400/00008B/FFFFFF?text=Jeans",
  },
  {
    id: 3,
    name: "Casual Hoodie",
    price: 45,
    imageUrl: "https://via.placeholder.com/300x400/808080/FFFFFF?text=Hoodie",
  },
  {
    id: 4,
    name: "Oxford Shirt",
    price: 50,
    imageUrl: "https://via.placeholder.com/300x400/ADD8E6/000000?text=Shirt",
  },
  {
    id: 5,
    name: "Chino Pants",
    price: 55,
    imageUrl: "https://via.placeholder.com/300x400/F5F5DC/000000?text=Chinos",
  },
  {
    id: 6,
    name: "Bomber Jacket",
    price: 80,
    imageUrl: "https://via.placeholder.com/300x400/006400/FFFFFF?text=Jacket",
  },
  {
    id: 7,
    name: "Crew Neck Sweater",
    price: 50,
    imageUrl: "https://via.placeholder.com/300x400/A52A2A/FFFFFF?text=Sweater",
  },
  {
    id: 8,
    name: "Polo Shirt",
    price: 35,
    imageUrl: "https://via.placeholder.com/300x400/FFA500/000000?text=Polo",
  },
  {
    id: 9,
    name: "Cargo Shorts",
    price: 40,
    imageUrl: "https://via.placeholder.com/300x400/90EE90/000000?text=Shorts",
  },
  {
    id: 10,
    name: "Denim Jacket",
    price: 75,
    imageUrl:
      "https://via.placeholder.com/300x400/4682B4/FFFFFF?text=Denim+Jacket",
  },
  {
    id: 11,
    name: "Grey Oxford Shirt",
    price: 50,
    imageUrl: "/hoodie1.jpg",
  },
  {
    id: 12,
    name: "Light Blue Striped Shirt",
    price: 40,
    imageUrl: "/polo1.jpg",
  },
  {
    id: 13,
    name: "White Linen Camp Shirt",
    price: 55,
    imageUrl: "/tshirt1.jpg",
  },
  {
    id: 14,
    name: "Classic Black T-Shirt",
    price: 20,
    imageUrl: "/tshirt1_black.jpg",
  },
];
