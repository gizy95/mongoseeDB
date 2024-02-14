import express from "express";
import { getCountries, postCountry, getCountry, modifyCountry, modifyMultipleCountries, updateCountrytoVisited } from "../controllers/countryController.js";
import { authMiddleware } from "../middleware/users.js";

const countryRoutes = express.Router();


countryRoutes.get("/", authMiddleware, getCountries)
countryRoutes.get("/:code", getCountry)
countryRoutes.post("/", postCountry)
countryRoutes.put("/:code", modifyCountry)
countryRoutes.delete("/:code", updateCountrytoVisited)
countryRoutes.put("/", modifyMultipleCountries)

export default countryRoutes;