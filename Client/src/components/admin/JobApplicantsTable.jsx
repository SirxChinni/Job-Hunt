import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  CheckCircle2,
  FileText,
  MoreHorizontal,
  Phone,
  XCircle,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICANT_API_END_POINT } from '@/utils/constant'

const shortListingStatus = ['Accepted', 'Rejected']

const JobApplicantsTable = () => {
  const { allApplicants } = useSelector((store) => store.application)
  const applications = allApplicants?.applications || []

  const statusHandler = async (status, id) => {
    try {
      const response = await axios.post(
        `${APPLICANT_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="px-4 py-4 text-sm text-slate-500">
            A list of users who recently applied for this job.
          </TableCaption>

          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-b border-slate-200 hover:bg-slate-50/80">
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Full Name
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Email
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Contact
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Resume
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Applied On
              </TableHead>
              <TableHead className="h-12 px-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.length > 0 ? (
              applications.map((item, idx) => (
                <TableRow
                  key={item._id}
                  className={`border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  <TableCell className="px-4 py-4 sm:px-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item?.applicant?.fullname || 'N/A'}
                      </p>
                      <p className="text-xs text-slate-500">
                        Applicant
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4 text-sm text-slate-700 sm:px-6">
                    {item?.applicant?.email || 'N/A'}
                  </TableCell>

                  <TableCell className="px-4 py-4 sm:px-6">
                    <div className="inline-flex items-center gap-2 text-sm text-slate-700">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{item?.applicant?.phoneNumber || 'N/A'}</span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4 sm:px-6">
                    {item?.applicant?.profile?.resume ? (
                      <a
                        className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-cyan-700 transition-colors duration-200 hover:text-cyan-900"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="max-w-[180px] truncate sm:max-w-[220px]">
                          {item?.applicant?.profile?.resumeOriginalName}
                        </span>
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">N/A</span>
                    )}
                  </TableCell>

                  <TableCell className="px-4 py-4 text-sm text-slate-500 sm:px-6">
                    {item?.createdAt?.split('T')[0]}
                  </TableCell>

                  <TableCell className="px-4 py-4 text-right sm:px-6">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-500 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Open applicant actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-40 rounded-xl border border-slate-200 p-2 shadow-lg"
                      >
                        {shortListingStatus.map((status, index) => {
                          const isAccepted = status === 'Accepted'

                          return (
                            <button
                              key={index}
                              onClick={() => statusHandler(status, item._id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
                            >
                              {isAccepted ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-rose-600" />
                              )}
                              {status}
                            </button>
                          )
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">
                      No applicants yet
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-slate-500">
                      Applications for this job will appear here once candidates start applying.
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

export default JobApplicantsTable