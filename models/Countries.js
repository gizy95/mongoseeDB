import mongoose from "mongoose";

const CountriesSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    alpha2Code: {
        required: true,
        type: String
    },
    alpha3Code: {
        required: true,
        type: String
    }, visited: {
        required: true,
        type: Boolean
    }
});

const Country = mongoose.model("Country", CountriesSchema)

export default Country;

