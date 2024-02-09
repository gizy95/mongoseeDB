import Country from "../models/Countries.js";

export const getCountries = async (req, res) => {

    try {
        const data = await Country.find()
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const postCountry = async (req, res) => {

    try {
        const { name, alpha2Code, alpha3Code } = req.body;
        //console.log(name, alpha2Code, alpha3Code)
        const data = await Country.create({ name, alpha2Code, alpha3Code })
        console.log(data)
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
    }
}

