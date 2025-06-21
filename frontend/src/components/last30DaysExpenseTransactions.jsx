import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../utils/helper';
import CustomBarChart from './CustomBarChart';

const last30DaysExpenseTransactions = ({data}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data)
        setChartData(result)
        return ()=>{}
    },[data])

  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
        <div className='text-lg'>Last 30 Days Expenses</div>
        </div>
        <CustomBarChart data ={chartData} />
    </div>
  )
}

export default last30DaysExpenseTransactions