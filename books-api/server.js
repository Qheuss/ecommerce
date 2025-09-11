import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());
let books = JSON.parse(fs.readFileSync('./books.json', 'utf-8')) || [];

app.get('/books', (req, res) => res.json(books));

app.post('/books', (req, res) => {
  const book = req.body;
  if (!book.id) book.id = Date.now().toString();
  books.push(book);
  res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    return res.json(books[index]);
  }
  res.status(404).json({ message: 'Book not found' });
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    return res.json(deletedBook[0]);
  }
  res.status(404).json({ message: 'Book not found' });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
