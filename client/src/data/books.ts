export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  rating?: number;
  category: string;
  price: number;
  stock: number;
}

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
