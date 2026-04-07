import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import JobApplicantsTable from './JobApplicantsTable'
import axios from 'axios'
import { APPLICANT_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { BadgeCheck, Users } from 'lucide-react'
import { Button } from '../ui/button'

const JobApplicants = () => {
  const dispatch = useDispatch()

  const params = useParams()
  const jobId = params.id

  const { allApplicants } = useSelector((store) => store.application)
  const applicantsCount = allApplicants?.applications?.length || 0

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const response = await axios.get(
          `${APPLICANT_API_END_POINT}/${jobId}/applicants`,
          { withCredentials: true }
        )

        if (response.data.success) {
          dispatch(setAllApplicants(response.data.job))
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchAllApplicants()
  }, [dispatch, jobId])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative px-5 py-6 sm:px-8 sm:py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 opacity-80" />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                    <Users className="h-7 w-7" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex w-fit items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Job Applicants
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Applicants
                      </h1>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {applicantsCount} total
                      </span>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                      Review all candidates who applied to this job. Use the table below to scan profiles, statuses, and other details.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-xl border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 sm:text-sm"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    {applicantsCount} applicants
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Applicant List
              </h2>
              <p className="text-sm text-slate-500">
                All applicants associated with this job requisition are listed below.
              </p>
            </div>

            <div className="px-2 py-2 sm:px-4 sm:py-4">
              <JobApplicantsTable />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default JobApplicants