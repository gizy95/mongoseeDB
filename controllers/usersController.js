import User from "../models/User.js";


export const getUsers = async (req, res) => {

    try {
        const data = await User.find()
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await User.findById({ _id: id })
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
    }
}


export const postUser = async (req, res) => {

    try {
        const { name, first_name, email } = req.body;
        console.log(name, first_name, email)
        const data = await User.create({ name, first_name, email })
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
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

        const data = await User.updateMany({ name: "John" }, { name: "Bob" })
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(500)
    }
}