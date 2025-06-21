import React from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from './CustomBarChart'
import { useState } from 'react'
import { useEffect } from 'react'
import { prepareIncomeBarChartData, addThousandsSeparator } from '../utils/helper'


const IncomeOverview = ({transactions, onEdit, onDelete, loading}) => {
    const [chartData, setChartData] = useState([])
    
    // Calculate total income
    const totalIncome = transactions.reduce((sum, income) => sum + income.amount, 0)

    useEffect(()=>{
        const result = prepareIncomeBarChartData(transactions)
        setChartData(result)
        return () => {}
    },[transactions])

  return (
    <div className='bg-white rounded-lg shadow-sm border'>
        <div className='p-6'>
            <div className='flex items-center justify-between mb-6'>
                <div className=''>
                    <h5 className='text-xl font-semibold'>Income Overview</h5>
                    <p className='text-sm text-gray-600 mt-1'>Track your earning over time and analyze your income trends</p>
                    <p className='text-green-600 font-semibold mt-2'>
                        Total Income: ₹{addThousandsSeparator(totalIncome)}
                    </p>
                </div>
            </div>
            
            {loading ? (
                <div className='flex justify-center py-8'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-600'></div>
                </div>
            ) : transactions.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <p>No income records found</p>
                    <p className='text-sm'>Start by adding your first income</p>
                </div>
            ) : (
                <div className='space-y-3'>
                    {transactions.map((income) => (
                        <div key={income._id} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                            <div className='flex-1'>
                                <h3 className='font-medium text-gray-900'>{income.source}</h3>
                                <p className='text-sm text-gray-600'>{income.source}</p>
                                <p className='text-xs text-gray-500'>
                                    {new Date(income.date).toLocaleDateString()}
                                </p>
                                {income.description && (
                                    <p className='text-sm text-gray-600 mt-1'>{income.description}</p>
                                )}
                            </div>
                            <div className='flex items-center gap-3'>
                                <span className='font-semibold text-green-600'>
                                    ₹{addThousandsSeparator(income.amount)}
                                </span>
                                <button
                                    onClick={() => onEdit(income)}
                                    className='px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 text-sm'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(income)}
                                    className='px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 text-sm'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default IncomeOverview