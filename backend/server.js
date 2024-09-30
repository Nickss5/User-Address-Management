const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors({
    origin: 'https://user-address-fullstack.onrender.com', // Replace with your frontend URL
    methods: ['GET', 'POST'], // Allowed methods
}));
app.use(bodyParser.json());

// Connect to MongoDB 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDb connection error', error);
        process.exit(1); //Exit process with failure
    }
};

connectDB(); 

// Define the User schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    addresses: {
        type: [String],
        required: [true, 'Address is required'],
    },
});

const User = mongoose.model('User', UserSchema);

// Route to register a user with multiple address

app.post('/register', async (req,res) => {
    const {name, address} = req.body;

    // Find user by name

    let user = await User.findOne({ name });
    
    if (user) {
        // User exists, add the adress to the existing user
        user.addresses.push(address);
        await user.save();
        res.send('User registered successfully');
    } else {
        // Create a new user with the address
        user = new User({
            name,
            addresses: [address], // Start with an array containing the new address
        });
        await user.save();
        res.send('User User registered successfully')

    }
        
});

// Route to get all users with their addresses

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`server running at http://localhost:${PORT}`)
})