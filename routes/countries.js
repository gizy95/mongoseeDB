import express from "express";
import { getCountries, postCountry, getCountry } from "../controllers/countryController.js";

const countryRoutes = express.Router();


countryRoutes.get("/", getCountries)
countryRoutes.get("/:code", getCountry)
countryRoutes.post("/", postCountry)
countryRoutes.put("/:id")
countryRoutes.delete("/:id")
countryRoutes.put("/")

export default countryRoutes;