import expenseModel from "../models/expenseModel.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';


// Add Expense Source
const addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, title, category, amount, date, description } = req.body;
    
    // Use title as category if category is not provided (for frontend compatibility)
    const expenseCategory = category || title;
    
    if (!expenseCategory || !amount || !date) {
      return res.json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    
    const newExpense = new expenseModel({
      userId,
      icon,
      category: expenseCategory,
      amount: parseFloat(amount),
      date: new Date(date),
    });

    await newExpense.save();

    res.json({ 
      success: true, 
      message: "Expense added successfully",
      expense: newExpense 
    });
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
  }
};

// get all expense source
const getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await expenseModel.find({userId}).sort({ date:-1});
    // if (!income) {
    //   return res.json({
    //     success: false,
    //     message: "No income found",
    //   });
    // }
    res.json({ success: true, expense });
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
  }
};

// Delete Expense source
const deleteExpense = async (req, res) => {
  try {
    await expenseModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Expense source deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
  }
};

// Download Pdf
const downloadExpensePDF = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await expenseModel.find({ userId }).sort({ date: -1 });

    // Set up PDF file
    const doc = new PDFDocument({ margin: 30 });
    const filePath = 'expense_details.pdf';
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Title
    doc.fontSize(18).text('Expense Details', { align: 'center' });
    doc.moveDown();

    // Table Header
    doc.fontSize(12).text('Category', 50, doc.y, { continued: true });
    doc.text('Amount', 200, doc.y, { continued: true });
    doc.text('Date', 300, doc.y);
    doc.moveDown();

    // Table Body
    expense.forEach((item) => {
      doc.text(item.category, 50, doc.y, { continued: true });
      doc.text(item.amount.toString(), 200, doc.y, { continued: true });
      doc.text(new Date(item.date).toLocaleDateString(), 300, doc.y);
      doc.moveDown();
    });

    doc.end();

    // When done writing, send the file
    writeStream.on('finish', () => {
      res.download(filePath, (err) => {
        if (err) {
          console.error('Download error:', err);
        }
        fs.unlinkSync(filePath); // delete the file after download
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addExpense, getAllExpense, deleteExpense, downloadExpensePDF };