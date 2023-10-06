const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt'); // Import bcrypt
const User = require('../modal/UserModal'); // Import your Mongoose User model


// Register a new user route
router.post('/', async (req, res) => {

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new User instance with validated data and the hashed password
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword, // Use the hashed password
    });
    
    // Save the user data to MongoDB
    const savedUser = await newUser.save();
    
    
    // If the user is saved successfully, send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // If an error occurs during saving, send an error response
    res.send(error)
    
  }
});


module.exports = router