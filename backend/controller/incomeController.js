import userModel from "../models/userModel.js";
import incomeModel from "../models/incomeModel.js";
import PDFDocument from "pdfkit";
import fs from "fs";

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
    const newIncome = new incomeModel({
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
    res.json({ success: false, message: error.message });
  }
};

// get all income source
const getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await incomeModel.find({ userId }).sort({ date: -1 });
    // if (!income) {
    //   return res.json({
    //     success: false,
    //     message: "No income found",
    //   });
    // }
    res.json({ success: true, income });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete Income source
const deleteIncome = async (req, res) => {
  try {
    await incomeModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Income source deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Download pdf
const downloadIncomePDF = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await incomeModel.find({ userId }).sort({ date: -1 });

    // Set up PDF file
    const doc = new PDFDocument({ margin: 30 });
    const filePath = "income_details.pdf";
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Title
    doc.fontSize(18).text("Income Details", { align: "center" });
    doc.moveDown();

    // Table Header
    doc.fontSize(12).text("Source", 50, doc.y, { continued: true });
    doc.text("Amount", 200, doc.y, { continued: true });
    doc.text("Date", 300, doc.y);
    doc.moveDown();

    // Table Body
    income.forEach((item) => {
      doc.text(item.source, 50, doc.y, { continued: true });
      doc.text(item.amount.toString(), 200, doc.y, { continued: true });
      doc.text(new Date(item.date).toLocaleDateString(), 300, doc.y);
      doc.moveDown();
    });

    doc.end();

    // When done writing, send the file
    writeStream.on("finish", () => {
      res.download(filePath, (err) => {
        if (err) {
          console.error("Download error:", err);
        }
        fs.unlinkSync(filePath); // delete the file after download
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addIncome, getAllIncome, deleteIncome, downloadIncomePDF };
