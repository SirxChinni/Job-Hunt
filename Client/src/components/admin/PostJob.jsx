import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  IndianRupee,
  Loader2,
  MapPin,
  Sparkles,
} from 'lucide-react'

const PostJob = () => {
  const { companies } = useSelector((store) => store.company)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    experience: '',
    jobType: '',
    position: 0,
    companyId: '',
  })

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.companyName.toLowerCase() === value.toLowerCase()
    )
    setInput({ ...input, companyId: selectedCompany._id })
  }

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const postNewJob = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/admin/jobs')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Header */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative px-5 py-6 sm:px-8 sm:py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 opacity-80" />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                    <BriefcaseBusiness className="h-7 w-7" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex w-fit items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Recruitment Panel
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Post New Job
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                      Create a professional job listing with all the key details candidates need before applying.
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/jobs')}
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100"
                >
                  Back to Jobs
                </Button>
              </div>
            </div>
          </section>

          {/* Form */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Job Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Fill in the fields below to publish a new opportunity.
              </p>
            </div>

            <form onSubmit={postNewJob} className="space-y-6 px-5 py-6 sm:px-6 sm:py-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Job Title
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    placeholder="Frontend Developer"
                    onChange={changeEventHandler}
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Company
                  </Label>
                  {companies.length > 0 ? (
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm focus:ring-2 focus:ring-emerald-100">
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem key={company._id} value={company.companyName}>
                              {company.companyName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="rounded-xl border border-dashed border-rose-300 bg-rose-50 px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-rose-700">
                            No company registered yet
                          </p>
                          <p className="text-sm text-rose-600">
                            You need to register a company before posting a job.
                          </p>
                          <button
                            type="button"
                            onClick={() => navigate('/admin/companies/create')}
                            className="inline-flex items-center text-sm font-medium text-rose-700 transition-colors duration-200 hover:text-rose-900"
                          >
                            Create company
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Description
                  </Label>
                  <Input
                    type="text"
                    name="description"
                    placeholder="Write a short and clear job description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Requirements
                  </Label>
                  <Input
                    type="text"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    placeholder="React, Tailwind CSS, REST APIs, Git"
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                  <p className="text-xs text-slate-500">
                    Separate requirements with commas for better readability.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Salary
                  </Label>
                  <div className="relative">
                    <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="number"
                      name="salary"
                      value={input.salary}
                      placeholder="12"
                      onChange={changeEventHandler}
                      className="h-12 rounded-xl border-slate-200 bg-white pl-10 pr-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <p className="text-xs text-slate-500">Enter salary in LPA.</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      placeholder="Bengaluru, Hyderabad, Remote"
                      onChange={changeEventHandler}
                      className="h-12 rounded-xl border-slate-200 bg-white pl-10 pr-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Job Type
                  </Label>
                  <Input
                    type="text"
                    name="jobType"
                    placeholder="Full Time / Part Time / Internship"
                    value={input.jobType}
                    onChange={changeEventHandler}
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Experience Level
                  </Label>
                  <Input
                    type="number"
                    name="experience"
                    placeholder="2"
                    value={input.experience}
                    onChange={changeEventHandler}
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                  <p className="text-xs text-slate-500">Enter experience in years.</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Number of Positions
                  </Label>
                  <Input
                    type="number"
                    name="position"
                    placeholder="3"
                    value={input.position}
                    onChange={changeEventHandler}
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Posting tip
                    </p>
                    <p className="text-sm text-slate-600">
                      Clear titles, concise descriptions, and well-structured requirements usually attract more relevant applicants.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/jobs')}
                  className="h-11 rounded-xl border-slate-200 px-5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100"
                >
                  Cancel
                </Button>

                {loading ? (
                  <Button
                    type="submit"
                    disabled
                    className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800"
                  >
                    Post New Job
                  </Button>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default PostJob