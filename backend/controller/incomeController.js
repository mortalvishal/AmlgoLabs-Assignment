import userModel from "../models/userModel.js";
import incomeModel from "../models/incomeModel.js";

// Add Income Source
const addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;
    if (!source || !amount || !date) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
  }
};

// get all income source
const getAllIncome = async (req, res) => {};

// Delete Income source
const deleteIncome = async (req, res) => {};

// Download Excel
const downloadIncomeExcel = async (req, res) => {};

export { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel };
