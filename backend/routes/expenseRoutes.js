import express from "express";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpensePDF,
} from "../controller/expenseController.js";
import protect from "../middleware/authMiddleware.js";

const expenseRouter = express.Router();

expenseRouter.post("/add", protect, addExpense);
expenseRouter.get("/get", protect, getAllExpense);
expenseRouter.get("/download-pdf", protect, downloadExpensePDF);
expenseRouter.delete("/:id", protect, deleteExpense);

export default expenseRouter;
