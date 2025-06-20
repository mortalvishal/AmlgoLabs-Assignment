import express from 'express'
import {addIncome, getAllIncome, deleteIncome, downloadIncomePDF } from '../controller/incomeController.js'
import protect from '../middleware/authMiddleware.js'


const incomeRouter = express.Router();

incomeRouter.post("/add", protect, addIncome);
incomeRouter.get("/get", protect, getAllIncome);
incomeRouter.get("/download-pdf", protect, downloadIncomePDF)
incomeRouter.delete("/:id", protect, deleteIncome)

export default incomeRouter;