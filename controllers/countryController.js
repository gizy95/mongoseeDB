import Country from "../models/Countries.js";

export const getCountries = async (req, res) => {
    const { sort, visited } = req.query;

    try {
        let query = {};

        if (visited && visited === "true") {
            query.visited = true;
        }

        let data = await Country.find(query);

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
        const { name, alpha2Code, alpha3Code, visited } = req.body;

        const existingCountry = await Country.findOne({
            $or: [{ alpha2Code }, { alpha3Code }]
        });

        if (existingCountry) {
            return res.status(409).json({ error: "Country already exists" });
        }

        const data = await Country.create({ name, alpha2Code, alpha3Code, visited })
        console.log(data)
        res.status(201).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

export const getCountry = async (req, res) => {
    const { code } = req.params;
    try {


        const data = await Country.findOne({
            $or: [
                { alpha2Code: code },
                { alpha3Code: code }
            ]
        });

        if (!data) {
            return res.status(404).json({ error: "Country not found" });
        }

        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}


export const modifyCountry = async (req, res) => {
    const { code } = req.params;

    try {
        const { name, alpha2Code, alpha3Code, visited } = req.body;

        const existingCountry = await Country.findOne({
            $or: [
                { alpha2Code: code },
                { alpha3Code: code }
            ]
        });

        const { _id } = existingCountry;


        if (!existingCountry) {
            return res.status(404).json({ error: "Country not found" });
        }

        let update = {};

        if (name !== undefined) update.name = name;
        if (alpha2Code !== undefined) update.alpha2Code = alpha2Code;
        if (alpha3Code !== undefined) update.alpha3Code = alpha3Code;
        if (visited !== undefined) update.visited = visited;

        const data = await Country.findByIdAndUpdate(_id, update, { new: true })
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

export const modifyMultipleCountries = async (req, res) => {
    try {
        const updateResult = await Country.updateMany({}, { $set: { visited: false } });
        res.status(200).json(updateResult);
    } catch (err) {
        res.sendStatus(500);
    }
}

export const updateCountrytoVisited = async (req, res) => {
    const { code } = req.params;
    try {

        const existingCountry = await Country.findOne({
            $or: [
                { alpha2Code: code },
                { alpha3Code: code }
            ]
        });

        if (!existingCountry) {
            return res.status(404).json({ error: "Country not found" });
        }

        const { _id } = existingCountry;
        const updateResult = await Country.findByIdAndUpdate(
            _id,
            { $set: { visited: true } },
            { new: true }
        );

        res.status(200).json(updateResult);
    } catch (err) {
        res.sendStatus(500);
    }
}