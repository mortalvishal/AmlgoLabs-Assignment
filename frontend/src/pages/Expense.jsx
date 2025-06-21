import React, { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import ExpenseTransactions from '../components/ExpenseTransactions'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import { useUserAuth } from '../hooks/useUserAuth'
import { toast } from 'react-hot-toast'
import { addThousandsSeparator } from '../utils/helper'

const Expense = () => {
  useUserAuth();
  
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })

  // Calculate total expense
  const totalExpense = expenseData.reduce((sum, expense) => sum + expense.amount, 0)

  // get all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      if (response.data && response.data.success) {
        setExpenseData(response.data.expenses || [])
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error("Failed to fetch expense data")
    } finally {
      setLoading(false)
    }
  }

  // Handle Add/Edit Expense
  const handleAddExpense = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill all required fields")
      return
    }
    
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount)
      }
      
      if (editingExpense) {
        // Update existing expense
        const response = await axiosInstance.put(
          `/api/expense/update/${editingExpense._id}`,
          payload
        )
        if (response.data.success) {
          toast.success("Expense updated successfully")
          setEditingExpense(null)
        }
      } else {
        // Add new expense
        const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, payload)
        if (response.data.success) {
          toast.success("Expense added successfully")
        }
      }
      
      setOpenAddExpenseModal(false)
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      })
      fetchExpenseDetails()
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      const response = await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      if (response.data.success) {
        toast.success("Expense deleted successfully")
        fetchExpenseDetails()
        setOpenDeleteAlert({ show: false, data: null })
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete expense")
    }
  }

  // Handle edit
  const handleEdit = (expense) => {
    setEditingExpense(expense)
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: new Date(expense.date).toISOString().split('T')[0],
      description: expense.description || ''
    })
    setOpenAddExpenseModal(true)
  }

  // Handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'expense-report.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success("Report downloaded successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to download report")
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    })
    setEditingExpense(null)
  }

  useEffect(() => {
    fetchExpenseDetails();
    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Expenses">
      <div className='my-5 mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>Expense Management</h1>
            <p className='text-gray-600 mt-1'>
              Total Expenses: <span className='font-semibold text-red-600'>₹{addThousandsSeparator(totalExpense)}</span>
            </p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={handleDownloadExpenseDetails}
              className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
            >
              Download Report
            </button>
            <button
              onClick={() => {
                resetForm()
                setOpenAddExpenseModal(true)
              }}
              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              Add Expense
            </button>
          </div>
        </div>
        
        <div className='grid grid-cols-1 gap-6'>
          <div className='bg-white rounded-lg shadow-sm border'>
            <div className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Recent Expenses</h2>
              {loading ? (
                <div className='flex justify-center py-8'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-600'></div>
                </div>
              ) : expenseData.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  <p>No expenses found</p>
                  <p className='text-sm'>Start by adding your first expense</p>
                </div>
              ) : (
                <div className='space-y-3'>
                  {expenseData.map((expense) => (
                    <div key={expense._id} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>{expense.title}</h3>
                        <p className='text-sm text-gray-600'>{expense.category}</p>
                        <p className='text-xs text-gray-500'>
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                        {expense.description && (
                          <p className='text-sm text-gray-600 mt-1'>{expense.description}</p>
                        )}
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='font-semibold text-red-600'>
                          ₹{addThousandsSeparator(expense.amount)}
                        </span>
                        <button
                          onClick={() => handleEdit(expense)}
                          className='px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 text-sm'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setOpenDeleteAlert({ show: true, data: expense })}
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
        </div>
        
        {/* Add/Edit Expense Modal */}
        {openAddExpenseModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg w-full max-w-md mx-4'>
              <h2 className='text-xl font-bold mb-4'>
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
              </h2>
              <form onSubmit={handleAddExpense}>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Title *</label>
                  <input
                    type='text'
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                    placeholder='Enter expense title'
                    required
                  />
                </div>
                
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Amount *</label>
                  <input
                    type='number'
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                    placeholder='Enter amount'
                    min='0'
                    step='0.01'
                    required
                  />
                </div>
                
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                    required
                  >
                    <option value=''>Select category</option>
                    <option value='Food'>Food</option>
                    <option value='Transportation'>Transportation</option>
                    <option value='Shopping'>Shopping</option>
                    <option value='Entertainment'>Entertainment</option>
                    <option value='Bills'>Bills</option>
                    <option value='Healthcare'>Healthcare</option>
                    <option value='Education'>Education</option>
                    <option value='Travel'>Travel</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
                
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Date *</label>
                  <input
                    type='date'
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                    required
                  />
                </div>
                
                <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                    placeholder='Enter description (optional)'
                    rows='3'
                  />
                </div>
                
                <div className='flex gap-3 justify-end'>
                  <button
                    type='button'
                    onClick={() => {
                      setOpenAddExpenseModal(false)
                      resetForm()
                    }}
                    className='px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
                  >
                    {editingExpense ? 'Update' : 'Add'} Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {openDeleteAlert.show && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg w-full max-w-md mx-4'>
              <h2 className='text-xl font-bold mb-4 text-red-600'>Confirm Delete</h2>
              <p className='text-gray-600 mb-6'>
                Are you sure you want to delete "{openDeleteAlert.data?.title}"? This action cannot be undone.
              </p>
              <div className='flex gap-3 justify-end'>
                <button
                  onClick={() => setOpenDeleteAlert({ show: false, data: null })}
                  className='px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteExpense(openDeleteAlert.data._id)}
                  className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Expense
