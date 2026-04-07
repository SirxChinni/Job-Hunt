import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'
import { BriefcaseBusiness, SearchX } from 'lucide-react'

const Browse = () => {
  useGetAllJobs()

  const { allJobs } = useSelector((store) => store.job)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''))
    }
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-[8%] lg:py-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Explore Opportunities
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Browse Jobs
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Discover the latest openings and find roles that match your skills,
                goals, and preferred companies.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Total Results
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {allJobs?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jobs Section */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  Available Listings
                </h2>
                <p className="text-sm text-slate-500">
                  Showing {allJobs?.length || 0} job{allJobs?.length === 1 ? '' : 's'} based on your current results.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {allJobs?.length <= 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                  <SearchX className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  No jobs found
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn’t find any jobs matching your current filters or search.
                  Try changing your filters or searching with different keywords.
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {allJobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Browse