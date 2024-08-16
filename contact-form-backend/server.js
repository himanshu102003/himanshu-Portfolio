// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://himanshugupta81870:KKAHjvE1yviRN1O7@test-pro-db.kkuijxq.mongodb.net/contact?retryWrites=true&w=majority&appName=test-pro-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.use(cors({
    origin : ['https://himanshu102003.github.io/himanshu-Portfolio/'],
    methods : ['GET', 'POST'],
    Credential : true
}));
app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();
        res.status(201).send('Message received');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
