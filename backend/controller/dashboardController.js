import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";
import { isValidObjectId, Types } from "mongoose";

// Dashboard Data
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income & expenses
    const totalIncome = await incomeModel.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpense = await expenseModel.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // get income transactions in the last 30 days

    const last30DaysIncomeTransactions = await incomeModel.find({
        userId,
        date: { $gte:new Date(Date.now() - 30 *24 * 60 * 60 * 1000)},
    }).sort({ date: -1})

    // get total income for last 30 days
    const totalIncomeLast30Days = last30DaysIncomeTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );

    // get expense transaction in the last 30 days
    const last30DaysExpenseTransactions = await expenseModel
      .find({
        userId,
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      })
      .sort({ date: -1 });

    // get total expense for last 30 days
    const totalExpenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // fetch last 5 transactions ( income + expense)
    const lastTransaction = [
        ...(await incomeModel.find({userId}).sort({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: "income"
            })
        ),
        ...(await expenseModel.find({userId}).sort({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: "expense"
            })
        ),
    ].sort((a,b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysIncomeTransactions,
      totalIncomeLast30Days: totalIncomeLast30Days,
      last30DaysExpenseTransactions: { transactions: last30DaysExpenseTransactions },
      totalExpenseLast30Days: totalExpenseLast30Days,
      RecentTransactions: lastTransaction.slice(0, 5),
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getDashboardData };
