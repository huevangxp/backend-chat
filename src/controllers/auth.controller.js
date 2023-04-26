const User = require('../models/user.model');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const newPass = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { phone }],
            },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Email or Phone already exists.' });
        }
        const newUser = await User.create({
            name,
            email,
            phone,
            password: newPass
        })
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        })
        if (!user) {
            return res.status(200).json({message:'email and password incorret..'})
        }
        const users = {
            id: user.id,
            name: user.name,
            email: user.email,
        }
        const token = await jwt.sign(users, process.env.KEY, {expiresIn:'120d'})
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.select = async (req, res) => {
    try {
        const user = await User.findAll();
        if (!user) {
            return res.status(404).json({ message:'No user' });
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}