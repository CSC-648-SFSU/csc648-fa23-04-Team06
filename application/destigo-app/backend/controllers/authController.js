const authController = require('express').Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

authController.post('/register', async (req, res) => {
    try {
        const isExisting = await User.findOne({email: req.body.email})
        if (isExisting) {
            return res.status(400).json({ message: "An account with this email already exists. Please log in." });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ ...req.body, password: hashedPassword });

        // Return a success message without a token
        return res.status(201).json({ message: "Registration successful. Please log in to continue." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

authController.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if (!comparePass) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { password, ...others } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        return res.status(200).json({ user: others, token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = authController
