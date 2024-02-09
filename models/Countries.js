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
    alpha3code: {
        required: true,
        type: String
    }
});

const Country = mongoose.model("Country", CountriesSchema)

export default Country;

