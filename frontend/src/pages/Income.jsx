import React, { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import IncomeOverview from '../components/IncomeOverview'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import { useUserAuth } from '../hooks/useUserAuth'
import { toast } from 'react-hot-toast'

const Income = () => {
  useUserAuth();
  
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingIncome, setEditingIncome] = useState(null)
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

  // get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
      if (response.data && response.data.success) {
        setIncomeData(response.data.income || [])
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error("Failed to fetch income data")
    } finally {
      setLoading(false)
    }
  }

  // Handle Add/Edit Income
  const handleAddIncome = async (e) => {
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
      
      if (editingIncome) {
        // Update existing income
        const response = await axiosInstance.put(
          `/api/income/update/${editingIncome._id}`,
          payload
        )
        if (response.data.success) {
          toast.success("Income updated successfully")
          setEditingIncome(null)
        }
      } else {
        // Add new income
        const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, payload)
        if (response.data.success) {
          toast.success("Income added successfully")
        }
      }
      
      setOpenAddIncomeModal(false)
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      })
      fetchIncomeDetails()
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      const response = await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      if (response.data.success) {
        toast.success("Income deleted successfully")
        fetchIncomeDetails()
        setOpenDeleteAlert({ show: false, data: null })
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete income")
    }
  }

  // Handle edit
  const handleEdit = (income) => {
    setEditingIncome(income)
    setFormData({
      title: income.source, // Map source to title for form
      amount: income.amount.toString(),
      category: income.source, // Map source to category for form
      date: new Date(income.date).toISOString().split('T')[0],
      description: income.description || ''
    })
    setOpenAddIncomeModal(true)
  }

  // Handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'income-report.pdf')
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
    setEditingIncome(null)
  }

  useEffect(() => {
    fetchIncomeDetails();
    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Income Management</h1>
          <div className='flex gap-3'>
            <button
              onClick={handleDownloadIncomeDetails}
              className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
            >
              Download Report
            </button>
            <button
              onClick={() => {
                resetForm()
                setOpenAddIncomeModal(true)
              }}
              className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              Add Income
            </button>
          </div>
        </div>
        
        <div className='grid grid-cols-1 gap-6'>
          <IncomeOverview
            transactions={incomeData}
            onEdit={handleEdit}
            onDelete={(income) => setOpenDeleteAlert({ show: true, data: income })}
            loading={loading}
          />
        </div>
        
        {/* Add/Edit Income Modal */}
        {openAddIncomeModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg w-full max-w-md mx-4'>
              <h2 className='text-xl font-bold mb-4'>
                {editingIncome ? 'Edit Income' : 'Add New Income'}
              </h2>
              <form onSubmit={handleAddIncome}>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Title *</label>
                  <input
                    type='text'
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    placeholder='Enter income title'
                    required
                  />
                </div>
                
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Amount *</label>
                  <input
                    type='number'
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
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
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  >
                    <option value=''>Select category</option>
                    <option value='Salary'>Salary</option>
                    <option value='Freelance'>Freelance</option>
                    <option value='Business'>Business</option>
                    <option value='Investment'>Investment</option>
                    <option value='Gift'>Gift</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
                
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Date *</label>
                  <input
                    type='date'
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  />
                </div>
                
                <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
                    placeholder='Enter description (optional)'
                    rows='3'
                  />
                </div>
                
                <div className='flex gap-3 justify-end'>
                  <button
                    type='button'
                    onClick={() => {
                      setOpenAddIncomeModal(false)
                      resetForm()
                    }}
                    className='px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700'
                  >
                    {editingIncome ? 'Update' : 'Add'} Income
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
                Are you sure you want to delete "{openDeleteAlert.data?.source}"? This action cannot be undone.
              </p>
              <div className='flex gap-3 justify-end'>
                <button
                  onClick={() => setOpenDeleteAlert({ show: false, data: null })}
                  className='px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteIncome(openDeleteAlert.data._id)}
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

export default Income