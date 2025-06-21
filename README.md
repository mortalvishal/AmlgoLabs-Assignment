# Personal Finance Tracker+

A comprehensive personal finance management application built with React (frontend) and Node.js/Express (backend). Track your income, expenses, and get detailed insights into your financial habits.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Dashboard Overview**: Visual representation of your financial data
- **Income Management**: Add, edit, delete, and track income sources
- **Expense Management**: Categorize and manage your expenses
- **Data Visualization**: Interactive charts showing spending patterns
- **PDF Reports**: Download income and expense reports
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Profile Management**: Upload and manage profile pictures

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4.1.10** - Styling framework
- **React Router Dom** - Navigation
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Moment.js** - Date handling
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **PDFKit** - PDF generation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Personal Finance Tracker+"
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

**Important**: Replace the values with your actual MongoDB URI and a secure JWT secret.

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

### 4. Running the Application

#### Start the Backend Server
```bash
cd backend
npm run dev
# or
npm start
```
The backend server will start on `http://localhost:4000`

#### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173` (or the next available port)

## 🎯 Usage

### Getting Started
1. **Sign Up**: Create a new account with your email and password
2. **Profile Setup**: Upload a profile picture (optional)
3. **Dashboard**: View your financial overview
4. **Add Income**: Record your income sources
5. **Track Expenses**: Add and categorize your expenses
6. **Generate Reports**: Download PDF reports of your financial data

### Key Features Usage

#### Dashboard
- View total balance, income, and expenses
- See recent transactions
- Analyze spending patterns with charts
- Get insights into your last 30 days activity

#### Income Management
- Add new income sources
- Edit existing income records
- Delete unwanted entries
- Download income reports in PDF format
- Categorize income by source

#### Expense Management
- Add expenses with categories (Food, Transportation, Shopping, etc.)
- Edit and delete expense records
- View expense trends and patterns
- Download detailed expense reports
- Track daily, weekly, and monthly spending

## 📁 Project Structure

```
Personal Finance Tracker+/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controller/
│   │   ├── authController.js     # Authentication logic
│   │   ├── dashboardController.js # Dashboard data
│   │   ├── expenseController.js  # Expense management
│   │   └── incomeController.js   # Income management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── uploadMiddleware.js   # File upload handling
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   ├── incomeModel.js        # Income schema
│   │   └── expenseModel.js       # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── dashboardRoutes.js    # Dashboard routes
│   │   ├── expenseRoutes.js      # Expense routes
│   │   └── incomeRoutes.js       # Income routes
│   ├── uploads/                  # File storage
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Main server file
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/               # Images and static files
│   │   ├── components/           # Reusable React components
│   │   ├── context/              # React context providers
│   │   ├── hooks/                # Custom React hooks
│   │   ├── pages/                # Page components
│   │   ├── utils/                # Utility functions
│   │   ├── App.jsx               # Main App component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   └── vite.config.js            # Vite configuration
└── README.md                     # This file
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- CORS configuration
- Secure file upload handling

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=4000                                    # Server port
MONGODB_URI=mongodb://localhost:27017        # MongoDB connection
JWT_SECRET=your_jwt_secret_here              # JWT signing secret
NODE_ENV=development                         # Environment mode
```

### API Endpoints

#### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/getUser` - Get user profile
- `POST /api/user/upload-image` - Upload profile image

#### Dashboard
- `GET /api/dashboard` - Get dashboard data

#### Income
- `POST /api/income/add` - Add income
- `GET /api/income/get` - Get all income records
- `DELETE /api/income/delete/:id` - Delete income
- `GET /api/income/download-pdf` - Download income report

#### Expenses
- `POST /api/expense/add` - Add expense
- `GET /api/expense/get` - Get all expenses
- `DELETE /api/expense/delete/:id` - Delete expense
- `GET /api/expense/download-pdf` - Download expense report

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file
   - Verify network connectivity

2. **Frontend Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for any missing dependencies
   - Ensure Node.js version compatibility

3. **Authentication Issues**
   - Verify JWT_SECRET is set correctly
   - Check if the token is being sent in requests
   - Clear browser storage and try again

4. **File Upload Issues**
   - Ensure the uploads directory exists in backend
   - Check file permissions
   - Verify multer configuration

### Performance Optimization

- Use lazy loading for components
- Implement pagination for large datasets
- Optimize database queries
- Use React.memo for expensive components
- Minimize bundle size with code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Vishal**

## 🔮 Future Enhancements

- Budget planning and alerts
- Multi-currency support
- Bank account integration
- Investment tracking
- Financial goal setting
- Advanced analytics and insights
- Mobile app development
- Export data in multiple formats
- Recurring transaction management
- Financial calendar and reminders

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team

---

**Happy Financial Tracking! 💰📈**

