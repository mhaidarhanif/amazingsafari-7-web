export type Product = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Products = Product[];
