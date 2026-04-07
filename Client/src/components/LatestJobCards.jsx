import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

function LatestJobCards({ job }) {
  const navigate = useNavigate()

  const shortDescription =
    job?.description && job.description.length > 140
      ? `${job.description.slice(0, 140)}…`
      : job?.description ||
        `Exciting opportunity at ${job?.company?.companyName} for the role of ${job?.title}. Apply to grow your career.`

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="group cursor-pointer rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
    >
      {/* Company + location */}
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-cyan-700">
          {job?.company?.companyName || 'Top Company'}
        </h2>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3 w-3" />
          <span>{job?.location || 'India'}</span>
        </p>
      </div>

      {/* Job title + description */}
      <div className="mt-3">
        <h3 className="text-base font-semibold tracking-tight text-slate-900 group-hover:text-slate-900">
          {job?.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {shortDescription}
        </p>
      </div>

      {/* Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
        {job?.position && (
          <Badge className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            {job.position} Opening{job.position > 1 ? 's' : ''}
          </Badge>
        )}
        {job?.jobType && (
          <Badge className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            {job.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
            ₹ {job.salary} LPA
          </Badge>
        )}
      </div>

      {/* CTA hint */}
      <p className="mt-4 text-xs font-medium text-slate-400">
        Tap to view full job details
      </p>
    </motion.div>
  )
}

export default LatestJobCards