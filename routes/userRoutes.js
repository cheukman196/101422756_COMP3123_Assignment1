const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user.js');


// route: POST /api/v1/user/signup
// create user 
router.post('/signup', async (req, res) => {
    try {
        // hash password
        const password = req.body.password;
        const saltRounds = 10; // defines computational cost, default 10
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: passwordHash
        });
        await newUser.save(); // persist to db

        // on success
        res.status(201).json({
            message: "User created successfully",
            username: newUser.username,
            user_id: newUser._id
        });
    } catch (err) {

        res.status(500).send({ 
            message: "Signup operation failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
    
});

// route: POST /api/v1/user/login
// authenticate login by username/email
router.post('/login', async (req, res) => {  
    try {
        // extract from request body
        const {email, username, password} = req.body;
        const credentials = email || username; // either email or user

        const user = await User.findOne({
            $or: [{email: credentials}, {username: credentials}] // query both fields for match
        });

        const result = await bcrypt.compare(password, user.password); // check pw

        if (result)
            res.status(200).send({status: true, message: `User '${user.username}' logged in successfully`}); 
         else 
            res.status(401).send({status: false, message: "Authentication unsuccessful."}); 
        

    } catch (err) {
        res.status(500).send({ message: '500: internal server error', error: err });
    }

})

module.exports = router;