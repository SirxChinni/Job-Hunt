import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { BriefcaseBusiness, Loader2, LogIn, ShieldCheck, UserCircle2 } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, user } = useSelector((store) => store.auth)

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (response.data.success) {
        dispatch(setUser(response.data.user))
        navigate('/')
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-h-[calc(100vh-120px)] max-w-6xl items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <section className="hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:block">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="inline-flex items-center rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  Welcome Back
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                  <LogIn className="h-8 w-8" />
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                    Access your job portal dashboard
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-slate-600">
                    Sign in to manage applications, post jobs, explore opportunities, and continue your workflow without interruption.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Secure sign-in
                      </p>
                      <p className="text-sm text-slate-600">
                        Your session is protected and credentials are submitted securely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        For students and recruiters
                      </p>
                      <p className="text-sm text-slate-600">
                        Choose your role and continue with the experience designed for your workflow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Login Form */}
          <section className="w-full">
            <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-8 space-y-3 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md lg:hidden">
                  <LogIn className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Login to your account
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  Enter your credentials and select your role to continue.
                </p>
              </div>

              <form className="space-y-5" onSubmit={submitHandler}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="john.doe@gmail.com"
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="Enter your password"
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Continue as
                  </Label>

                  <RadioGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {['student', 'recruiter'].map((role) => {
                      const isActive = input.role === role

                      return (
                        <label
                          key={role}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                            isActive
                              ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <Input
                            type="radio"
                            name="role"
                            value={role}
                            checked={isActive}
                            onChange={changeEventHandler}
                            className="h-4 w-4 cursor-pointer accent-slate-900"
                          />
                          <div className="flex items-center gap-2">
                            {role === 'student' ? (
                              <UserCircle2 className="h-4 w-4" />
                            ) : (
                              <BriefcaseBusiness className="h-4 w-4" />
                            )}
                            <span className="text-sm font-medium capitalize">
                              {role}
                            </span>
                          </div>
                        </label>
                      )
                    })}
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                  {loading ? 'Logging in...' : 'Login'}
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Don&apos;t have an account?{' '}
                  <Link
                    to="/signup"
                    className="font-semibold text-cyan-700 transition-colors duration-200 hover:text-cyan-900"
                  >
                    Signup
                  </Link>
                </p>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Login