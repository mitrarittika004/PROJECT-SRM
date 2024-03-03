// backend/routes/user.js
const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET  = require('../config');
const { authMiddleware } = require('../middleware');

const signupBody = zod.object({
    email: zod.string().email(),
    contactNumber: zod.string(),
    password: zod.string(),
    username: zod.string(),
});

router.post('/signup', async (req, res) => {
    const { success, data } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: 'Incorrect inputs',
        });
    }

    const existingUser = await User.findOne({
        username: data.userName, // Corrected field name
    });

    if (existingUser) {
        return res.status(400).json({
            message: 'Email already taken',
        });
    }

    const user = await User.create({
        username: data.username, // Corrected field name
        password: data.password,
        contactNumber: data.contactNumber,
        email: data.email,
    });

    const token = jwt.sign(
        {
            userId: user._id,
        },
        JWT_SECRET
    );

    res.json({
        message: 'User created successfully',
        token: token,
    });
});

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

router.post('/signin', async (req, res) => {
    const { success, data } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: 'Incorrect inputs',
        });
    }

    const user = await User.findOne({
        email: data.email,
        password: data.password,
    });

    if (user) {
        const token = jwt.sign(
            {
                userId: user._id,
            },
            JWT_SECRET
        );

        res.json({
            token: token,
        });
        return;
    }

    res.status(401).json({
        message: 'Error while logging in',
    });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    contactNumber: zod.string().optional(),
});

router.put('/', authMiddleware, async (req, res) => {
    const { success, data } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: 'Incorrect inputs',
        });
    }

    await User.updateOne(
        { _id: req.userId },
        {
            $set: data,
        }
    );

    res.json({
        message: 'Updated successfully',
    });
});

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || '';

    const users = await User.find({
        $or: [
            {
                username: {
                    $regex: filter,
                    $options: 'i', // case-insensitive
                },
            },
            {
                contactNumber: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            contactNumber: user.contactNumber,
            _id: user._id,
        })),
    });
});

module.exports = router;
