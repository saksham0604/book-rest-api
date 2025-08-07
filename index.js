const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory book array
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});



// GET a book by ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// POST (add) a new book
app.post('/books', (req, res) => {
  const newBook = req.body;

  // Automatically assign a new unique ID
  newBook.id = books.length ? books[books.length - 1].id + 1 : 1;

  // Add the book to the array
  books.push(newBook);

  // Return the added book with 201 status
  res.status(201).json(newBook);
});

// PUT update a book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  books[index] = { id, ...req.body };
  res.json(books[index]);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted successfully' });
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:${PORT}');
});