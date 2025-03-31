const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./models/usermodel");
const Note = require("./models/notesmodel");
const session = require('express-session');
const cors = require('cors')

// Middleware to parse JSON data
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow only the frontend app to access
    credentials: true, // Allow cookies to be sent with requests
}));
// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET||'harinimudaliar', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,       // Helps prevent cross-site scripting (XSS) attacks
        secure: false, // Only set this to true in production with HTTPS
        sameSite: 'strict',   // Prevents CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// MongoDB connection
async function main() {

//   await mongoose.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true })
    await mongoose.connect("mongodb+srv://harinimudaliar1503:harini@cluster0.2nj4eul.mongodb.net/mongodb?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
}
main()


// Basic route
app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// Create account
app.post("/create-account", async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname) return res.status(400).json({ error: true, message: "Full Name is required!" });
    if (!email) return res.status(400).json({ error: true, message: "Email is required!" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required!" });

    const isUser = await User.findOne({ email })
    // const isUser = true;
    if (isUser) return res.json({ error: true, message: "User Already Exists!" });

    const newUser = new User({ fullname, email, password });
    console.log(newUser);
    try {
        await newUser.save();
        return res.status(200).json({ message: "User created successfully!" });
    } catch (err) {
        console.error('Error saving user:', err);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ error: true, message: "Email is required!" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required!" });

    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ error: true, message: "User Not Found!" });

    if (user.password === password) {
        req.session.userId = user._id; // Store userId in session
        console.log(req.session.userId);
        return res.json({ error: false, message: "Login Successful" });
    } else {
        return res.json({ error: true, message: "Invalid Credentials" });
    }
});

// Middleware to check user authentication
const isAuthenticated = (req, res, next) => {
    if (!req.session.id) {
        return res.status(401).json({ error: true, message: "Unauthorized" });
    }
    next();
};

// Get user details
app.get("/get-user", isAuthenticated, async (req, res) => {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: true, message: "User Not Found!" });
    
    return res.json({
        user: { fullname: user.fullname, email: user.email, _id: user._id, createdOn: user.createdOn },
        message: "",
    });
});

// Add note
app.post("/add-note", isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    console.log(title, content);
    if (!title) return res.status(400).json({ error: true, message: "Title is required!" });
    if (!content) return res.status(400).json({ error: true, message: "Content is required!" });

    try {
        const note = new Note({
            title,
            content,
            userId: req.session.userId
        });
        await note.save();
        return res.json({ error: false, note, message: "Note Added Successfully" });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Edit note
app.put("/edit-note/:noteId", isAuthenticated, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content } = req.body;

    if (!title && !content) return res.status(400).json({ error: true, message: "No changes provided" });

    try {
        const note = await Note.findOne({ _id: noteId, userId: req.session.id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found!" });

        if (title) note.title = title;
        if (content) note.content = content;

        await note.save();
        return res.json({ error: false, note, message: "Note Updated Successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Get all notes
app.get("/get-all-note", isAuthenticated, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.session.userId });
        return res.json({ error: false, notes, message: "All notes retrieved successfully!" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Delete note
app.delete("/delete-note/:noteId", isAuthenticated, async (req, res) => {
    const noteId = req.params.noteId;

    try {
        const note = await Note.findOne({ _id: noteId, userId: req.session.id });
        if (!note) return res.status(404).json({ error: true, message: "Note Not Found!" });

        await Note.deleteOne({ _id: noteId, userId: req.session.id });
        return res.json({ error: false, message: "Note Deleted Successfully!" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error!" });
    }
});

// Start the server
app.listen(5132, () => {
    console.log('Server running on port 5132');
});

module.exports = app;
