export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
}

export const books: Book[] = [
  {
    id: '1',
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    description: 'A young wizard discovers his magical heritage.',
    category: 'Fantasy',
  },
  {
    id: '2',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description: 'An epic quest to destroy the One Ring.',
    category: 'Fantasy',
  },
  {
    id: '3',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    description: 'Exploring the origins and structure of the universe.',
    category: 'Science',
  },
  {
    id: '4',
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    description: 'An introduction to evolutionary biology.',
    category: 'Science',
  },
  {
    id: '5',
    title: 'Becoming',
    author: 'Michelle Obama',
    description: 'Memoir of the former First Lady of the USA.',
    category: 'Biography',
  },
  {
    id: '6',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    description: 'Biography of Apple co-founder Steve Jobs.',
    category: 'Biography',
  },
  {
    id: '7',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    category: 'Fiction',
  },
  {
    id: '8',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A novel about racial injustice in the American South.',
    category: 'Fiction',
  },
  {
    id: '9',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A critique of the American Dream in the 1920s.',
    category: 'Fiction',
  },
  {
    id: '10',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'A history of humankind from the Stone Age to modern times.',
    category: 'Non-Fiction',
  },
  {
    id: '11',
    title: 'Educated',
    author: 'Tara Westover',
    description: 'A memoir about growing up in a strict and abusive household.',
    category: 'Non-Fiction',
  },
];

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
