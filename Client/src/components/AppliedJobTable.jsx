import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { BriefcaseBusiness, CalendarDays } from 'lucide-react'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job)

  const getStatusClasses = (status) => {
    switch (status) {
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border border-rose-200'
      case 'pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200'
      default:
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    }
  }

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Application History
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
              Applied Jobs
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track the roles you have applied for and monitor their current status.
            </p>
          </div>

          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 sm:flex">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <Table>
            <TableCaption className="py-4 text-sm text-slate-500">
              A complete list of your recent job applications
            </TableCaption>

            <TableHeader>
              <TableRow className="border-b border-slate-200 bg-slate-50 hover:bg-slate-50">
                <TableHead className="h-12 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Date
                </TableHead>
                <TableHead className="h-12 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Job Role
                </TableHead>
                <TableHead className="h-12 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Company
                </TableHead>
                <TableHead className="h-12 px-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!allAppliedJobs || allAppliedJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="px-4 py-14">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                        <CalendarDays className="h-6 w-6" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">
                        No applications yet
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        You haven’t applied to any jobs yet. Once you start applying,
                        your application history and statuses will appear here.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                allAppliedJobs.map((item, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50/80"
                  >
                    <TableCell className="px-4 py-4 text-sm text-slate-500">
                      {item?.createdAt?.split('T')[0]}
                    </TableCell>

                    <TableCell className="px-4 py-4">
                      <div className="font-medium text-slate-900">
                        {item?.job?.title}
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-4 text-sm text-slate-600">
                      {item?.job?.company?.companyName}
                    </TableCell>

                    <TableCell className="px-4 py-4 text-right">
                      <Badge
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-none ${getStatusClasses(
                          item?.status
                        )}`}
                      >
                        {item?.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default AppliedJobTable