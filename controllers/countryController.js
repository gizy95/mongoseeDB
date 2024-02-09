import Country from "../models/Countries.js";

export const getCountries = async (req, res) => {
    const { sort } = req.query
    try {
        let data = await Country.find()
        if (sort && sort === "true") {
            data = data.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
    }
}

export const postCountry = async (req, res) => {

    try {
        const { name, alpha2Code, alpha3Code } = req.body;
        const data = await Country.create({ name, alpha2Code, alpha3Code })
        console.log(data)
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

