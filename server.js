const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// User data storage
let users = [];
const usersFilePath = './login.json';

// Reviews data storage
let reviews = [];
const reviewsFilePath = './reviews.json';

// Load users from file
function loadUsers() {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        users = JSON.parse(data);
    }
}

// Load reviews from file
function loadReviews() {
    if (fs.existsSync(reviewsFilePath)) {
        const data = fs.readFileSync(reviewsFilePath, 'utf-8');
        reviews = JSON.parse(data);
    }
}

// Save users to file
function saveUsers() {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

// Save reviews to file
function saveReviews() {
    try {
        fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
    } catch (error) {
        console.error('Error saving reviews:', error);
    }
}

// Load data when server starts
loadUsers();
loadReviews();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

// Sign Up Endpoint
app.post('/signup', (req, res) => {
    const userData = req.body;

    // Input validation for signup
    if (!userData.name || !userData.email || !userData.password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    // Add new user data
    users.push(userData);
    saveUsers();
    res.status(200).json({ message: 'User registered successfully!' });
});

// Sign In Endpoint
app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Check for existing user
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful!' });
    } else {
        res.status(401).json({ message: 'Invalid email or password.' });
    }
});

// Get all reviews
app.get('/reviews', (req, res) => {
    res.json(reviews);
});

// Post a new review
app.post('/reviews', (req, res) => {
    const newReview = req.body;

    // Input validation for reviews
    if (!newReview.name || !newReview.bookTitle || !newReview.reviewText || !newReview.rating) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    reviews.push(newReview);
    saveReviews();
    console.log('New review added:', newReview); // Log the new review for debugging
    res.status(201).json({ message: 'Review added successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
