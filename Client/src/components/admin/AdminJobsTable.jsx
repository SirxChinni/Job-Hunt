import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { BriefcaseBusiness, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job)
  const navigate = useNavigate()

  const [filterJobs, setFilterJobs] = useState(allAdminJobs)

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true

      return (
        job?.company?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
      )
    })

    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-b border-slate-200 hover:bg-slate-50/80">
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Company Name
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Role
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Posted On
              </TableHead>
              <TableHead className="h-12 px-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs && filterJobs.length > 0 ? (
              filterJobs.map((job, idx) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: idx * 0.03 }}
                  className={`border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  <TableCell className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 sm:flex">
                        <BriefcaseBusiness className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {job?.company?.companyName || 'N/A'}
                        </p>
                        <p className="text-xs text-slate-500">
                          Company
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4 sm:px-6">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {job?.title || 'N/A'}
                      </p>
                      <p className="text-xs text-slate-500">
                        Job title
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4 text-sm text-slate-500 sm:px-6">
                    {job?.createdAt?.split('T')[0]}
                  </TableCell>

                  <TableCell className="px-4 py-4 text-right sm:px-6">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-500 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Open row actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-44 rounded-xl border border-slate-200 p-2 shadow-lg"
                      >
                        <button
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye className="h-4 w-4" />
                          Applicants
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                      <BriefcaseBusiness className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">
                      No jobs found
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-slate-500">
                      No job listings match your current search. Try a different keyword or clear the filter.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminJobsTable