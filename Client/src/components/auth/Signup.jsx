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
import { setLoading } from '@/redux/authSlice'
import {
  BriefcaseBusiness,
  ImagePlus,
  Loader2,
  ShieldCheck,
  Upload,
  UserCircle2,
  UserPlus,
} from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, user } = useSelector((store) => store.auth)

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
    file: null,
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    Object.keys(input).forEach((key) => {
      if (input[key]) formData.append(key, input[key])
    })

    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      if (response.data.success) {
        navigate('/login')
        toast.success(response.data.message)
      }
    } catch (error) {
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
          {/* Left Panel */}
          <section className="hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:block">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  New Account Setup
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                  <UserPlus className="h-8 w-8" />
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                    Join the job portal in a few simple steps
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-slate-600">
                    Create your account to apply for jobs, manage your profile, or hire candidates with a clean and secure onboarding experience.
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
                        Secure registration
                      </p>
                      <p className="text-sm text-slate-600">
                        Your details and profile image are submitted through the same existing registration flow.
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
                        Choose your role
                      </p>
                      <p className="text-sm text-slate-600">
                        Sign up as a student to apply for jobs or as a recruiter to manage openings and hiring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form Panel */}
          <section className="w-full">
            <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-8 space-y-3 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md lg:hidden">
                  <UserPlus className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Create your account
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  Fill in your details to get started.
                </p>
              </div>

              <form className="space-y-5" onSubmit={submitHandler}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="fullname" className="text-sm font-medium text-slate-700">
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={input.fullname}
                      onChange={changeEventHandler}
                      placeholder="Shubham Kumar"
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
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
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-slate-700">
                      Phone Number
                    </Label>
                    <Input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={input.phoneNumber}
                      onChange={changeEventHandler}
                      placeholder="0000000000"
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
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
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Select Role
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

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Profile Image
                  </Label>

                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                          <ImagePlus className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Upload profile photo
                          </p>
                          <p className="text-sm text-slate-500">
                            Supported format: image files only.
                          </p>
                          {input.file && (
                            <p className="mt-1 text-xs font-medium text-emerald-700">
                              Selected: {input.file.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Input
                          accept="image/*"
                          type="file"
                          onChange={changeFileHandler}
                          className="cursor-pointer border-slate-200 bg-white text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Upload className="mr-2 h-5 w-5" />}
                  {loading ? 'Signing up...' : 'Sign Up'}
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-cyan-700 transition-colors duration-200 hover:text-cyan-900"
                  >
                    Login
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

export default Signup