import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { BriefcaseBusiness } from 'lucide-react'

function LatestJobs() {
  const { allJobs } = useSelector((state) => state.job)

  return (
    <section className="w-full bg-slate-50 px-4 py-16 sm:px-[5%] lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl"
      >
        {/* Heading */}
        <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            Latest opportunities
          </div>

          <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Discover recent openings from companies hiring now
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Browse curated roles across locations and job types, then open any listing
            to explore requirements, salary, and application details.
          </p>
        </div>

        {/* Jobs Grid */}
        {allJobs && allJobs.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {allJobs.slice(0, 6).map((job) => (
              <motion.div
                key={job._id}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35 }}
              >
                <LatestJobCards job={job} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <BriefcaseBusiness className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No jobs available right now
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              New openings will appear here once companies publish them. Please check
              again soon for fresh opportunities.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  )
}

export default LatestJobs