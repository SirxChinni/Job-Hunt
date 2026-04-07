import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICANT_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  CalendarDays,
  IndianRupee,
  MapPin,
  Users,
} from 'lucide-react'

const JobDescription = () => {
  const dispatch = useDispatch()
  const { singleJob } = useSelector((state) => state.job)
  const { user } = useSelector((state) => state.auth)

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false

  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const params = useParams()
  const jobId = params.id

  const applyJobHandler = async () => {
    try {
      const response = await axios.post(
        `${APPLICANT_API_END_POINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      )

      if (response.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    const fetchSingleJobDescription = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        })

        if (response.data.success) {
          dispatch(setSingleJob(response.data.job))
          setIsApplied(
            response.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          )
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchSingleJobDescription()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-[8%] lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-6xl space-y-6"
        >
          {/* Hero card */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  Job opening
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  {singleJob?.title}
                </h1>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {singleJob?.position} Positions
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {singleJob?.jobType}
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    ₹ {singleJob?.salary} LPA
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-auto">
                <motion.button
                  whileHover={{ scale: isApplied ? 1 : 1.02 }}
                  whileTap={{ scale: isApplied ? 1 : 0.98 }}
                  onClick={isApplied ? null : applyJobHandler}
                  disabled={isApplied}
                  className={`w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 lg:min-w-[180px] ${
                    isApplied
                      ? 'cursor-not-allowed bg-slate-300 text-slate-600'
                      : 'bg-slate-900 text-white shadow-sm hover:bg-slate-800'
                  }`}
                >
                  {isApplied ? 'Applied Successfully' : 'Apply Now'}
                </motion.button>
              </div>
            </div>
          </section>

          {/* Details grid */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Job Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A quick overview of the role, compensation, and application activity.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <BriefcaseBusiness className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Role
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {singleJob?.title}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Location
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {singleJob?.location}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <IndianRupee className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Salary
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {singleJob?.salary} LPA
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Applicants
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {singleJob?.applications?.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <BriefcaseBusiness className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Experience
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {singleJob?.experience} yrs
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Posted Date
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {singleJob?.createdAt?.split('T')[0]}
                </p>
              </div>
            </motion.div>
          </section>

          {/* Description */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Job Description
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                {singleJob?.description}
              </p>
            </motion.div>
          </section>
        </motion.div>
      </main>
    </div>
  )
}

export default JobDescription