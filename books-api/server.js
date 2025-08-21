import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let books = [];

app.get('/books', (req, res) => res.json(books));

app.post('/books', (req, res) => {
  const book = req.body;
  if (!book.id) book.id = Date.now().toString();
  books.push(book);
  res.status(201).json(book);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
