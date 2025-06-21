import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // function to update user data
    const updateUser = (userData) => {
        setUser(userData)
    }

    // function to clear user data 
    const clearUser = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

    // function to load user data from API
    const loadUserData = async () => {
        const token = localStorage.getItem("token")
        if (token && !user) {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
                if (response.data.success) {
                    setUser(response.data.user)
                } else {
                    localStorage.removeItem("token")
                }
            } catch (error) {
                console.log("Error loading user data:", error)
                localStorage.removeItem("token")
            }
        }
    }

    // Load user data on component mount
    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider