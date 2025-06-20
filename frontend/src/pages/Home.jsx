import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useUserAuth } from '../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import InfoCard from '../components/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard } from 'react-icons/io'
import { addThousandsSeparator } from '../utils/helper';
import RecentTransactions from '../components/RecentTransactions';
import FinanceOverview from '../components/FinanceOverview';
import ExpenseTransactions from '../components/ExpenseTransactions';
import Last30DaysExpenseTransactions from '../components/last30DaysExpenseTransactions';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false);
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if(response.data && response.data.success){
        setDashboardData(response.data)
        console.log('Dashboard data fetched:', response.data); // Debug log
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchDashboardData();
    return() => {};
  },[])
  return (
    <DashboardLayout activeMenu="Home">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon = {<IoMdCard/>}
          label = "Total Balance"
          value = {addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color = "bg-primary"
          />
          <InfoCard
          icon = {<LuWalletMinimal/>}
          label = "Total Income"
          value = {addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color = "bg-orange-500"
          />
          <InfoCard
          icon = {<LuHandCoins/>}
          label = "Total Expense"
          value = {addThousandsSeparator(dashboardData?.totalExpense || 0)}
          color = "bg-red-500"
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions={dashboardData?.RecentTransactions}
          onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
          totalBalance = {dashboardData?.totalBalance||0}
          totalIncome = {dashboardData?.totalIncome||0}
          totalExpense = {dashboardData?.totalExpense||0}
          />
          <ExpenseTransactions
          transactions = {dashboardData?.last30DaysExpenseTransactions?.transactions||[]}
          onSeeMore = {() => navigate("/expense")}
          />
          <Last30DaysExpenseTransactions
          data = {dashboardData?.last30DaysExpenseTransactions||[]}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home