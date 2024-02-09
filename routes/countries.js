import express from "express";
import { getCountries, postCountry } from "../controllers/countryController.js";

const countryRoutes = express.Router();


countryRoutes.get("/", getCountries)
countryRoutes.get("/:id")
countryRoutes.post("/", postCountry)
countryRoutes.put("/:id")
countryRoutes.delete("/:id")
countryRoutes.put("/")

export default countryRoutes;