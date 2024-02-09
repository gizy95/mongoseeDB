import express from "express";
import { getCountries, postCountry, getCountry, modifyCountry } from "../controllers/countryController.js";

const countryRoutes = express.Router();


countryRoutes.get("/", getCountries)
countryRoutes.get("/:code", getCountry)
countryRoutes.post("/", postCountry)
countryRoutes.put("/:code", modifyCountry)
countryRoutes.delete("/:id")
countryRoutes.put("/")

export default countryRoutes;