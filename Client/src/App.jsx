import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import JobApplicants from './components/admin/JobApplicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

function PublicLayout() {
  return <Outlet />
}

function AdminLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
}

const appRouter = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/jobs',
        element: <Jobs />,
      },
      {
        path: '/description/:id',
        element: <JobDescription />,
      },
      {
        path: '/browse',
        element: <Browse />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'companies',
        element: <Companies />,
      },
      {
        path: 'companies/create',
        element: <CompanyCreate />,
      },
      {
        path: 'companies/:id',
        element: <CompanySetup />,
      },
      {
        path: 'jobs',
        element: <AdminJobs />,
      },
      {
        path: 'jobs/create',
        element: <PostJob />,
      },
      {
        path: 'jobs/:id/applicants',
        element: <JobApplicants />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App