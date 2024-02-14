import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// import crypto from 'crypto';
// const secretToken = crypto.randomBytes(32).toString('hex');

const secretToken = process.env.SECRET_TOKEN;

const generateToken = (data) => {
    return jwt.sign(data, secretToken, { expiresIn: '1800s' })
}



export const getUsers = async (req, res) => {

    try {
        const data = await User.find().populate('country')
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)

    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await User.findById({ _id: id }).populate("country");
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)

    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(email)
        const data = await User.findOne({ email })
        console.log(data)
        if (!data) {
            return res.sendStatus(404)
        }

        const validPassword = await bcrypt.compare(password, data.password)

        if (!validPassword) {
            return res.status(400).send('Invalid credentials');
        }

        const token = generateToken({ email: data.email, role: data.role })

        res.json({ token })

    } catch (error) {
        res.sendStatus(500)

    }
}


export const postUser = async (req, res) => {

    try {
        const { name, first_name, email, country } = req.body;
        console.log(name, first_name, email, country)
        const data = await User.create({ name, first_name, email, country })
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        console.log(err)
    }
}


export const modifyUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { name, first_name, email } = req.body;

        let update = {};

        if (name !== undefined) update.name = name;
        if (first_name !== undefined) update.first_name = first_name;
        if (email !== undefined) update.email = email;

        const data = await User.findByIdAndUpdate(id, update, { new: true })
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(500)
    }
}

export const modifyMultipleUsers = async (req, res) => {


    try {
        const updateResult = await Country.updateMany({}, { $set: { visited: true } });
        res.status(200).json(updateResult);
    } catch (err) {
        res.sendStatus(500)
    }
}