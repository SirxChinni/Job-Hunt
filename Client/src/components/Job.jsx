import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const Job = ({ job }) => {
  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentDate = new Date()
    const differenceInTime = currentDate.getTime() - createdAt.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)
    return Math.floor(differenceInDays)
  }

  const daysAgo = daysAgoFunction(job?.createdAt)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-lg"
    >
      {/* Top meta row */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          {daysAgo === 0 ? 'New today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`}
        </span>
        {job?.jobType && (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {job.jobType}
          </span>
        )}
      </div>

      {/* Company */}
      <div className="mt-3 flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-2 transition-colors duration-200 group-hover:bg-slate-900">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                job?.company?.logo ||
                'https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?rs=1&pid=ImgDetMain'
              }
              alt={job?.company?.companyName || 'Company logo'}
              className="object-cover"
            />
          </Avatar>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            {job?.company?.companyName}
          </h2>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3 w-3" />
            <span>India</span>
          </p>
        </div>
      </div>

      {/* Job title + description */}
      <div className="mt-4">
        <h3 className="text-base font-semibold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-cyan-700">
          {job?.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {job?.position && (
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            {job.position} Position{job.position > 1 ? 's' : ''}
          </span>
        )}

        {job?.jobType && (
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            {job.jobType}
          </span>
        )}

        {job?.salary && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
            ₹ {job.salary} LPA
          </span>
        )}
      </div>

      {/* Action */}
      <div className="mt-5 flex gap-3">
        <Button
          type="button"
          onClick={() => navigate(`/description/${job._id}`)}
          className="w-full rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-800 shadow-none transition-colors hover:bg-slate-100"
        >
          View details
        </Button>
      </div>
    </motion.div>
  )
}

export default Job