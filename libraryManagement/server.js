
const express = require('express');

const app = express();

app.use(express.json());

// Initial book records
let books = [
    {
        id: 101,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        genre: "Autobiography",
        publishedYear: 1999,
        available: true
    },
    {
        id: 102,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        publishedYear: 1988,
        available: true
    },
    {
        id: 103,
        title: "Harry Potter",
        author: "J.K. Rowling",
        genre: "Fantasy",
        publishedYear: 1997,
        available: false
    }
];

 // Filter books by author
app.get('/api/books/filter', (req, res) => {
    const author = req.query.author;

    const result = books.filter(book =>
        book.author.toLowerCase() === author.toLowerCase()
    );

    res.status(200).json(result);
});


// Get all books
app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

 // Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, genre, publishedYear, available } = req.body;

    if (!title || !author || !genre || !publishedYear || typeof available !== 'boolean') {
        return res.status(400).json({ message: "Please enter valid book details" });
    }

    const newBook = {
        id: Math.max(...books.map(book => book.id)) + 1,
        title,
        author,
        genre,
        publishedYear,
        available
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

 // Get a book by ID
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
});

 // Update a book
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books[index] = {
        id: id,
        ...req.body
    };

    res.status(200).json(books[index]);
});

 // Delete a book
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(index, 1);

    res.status(200).json({ message: "Book deleted successfully" });
});




// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
