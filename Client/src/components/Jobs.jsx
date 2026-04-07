import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'
import { SlidersHorizontal, X, SearchX } from 'lucide-react'

function Jobs() {
  const dispatch = useDispatch()

  useGetAllJobs()

  const { allJobs, searchedQuery } = useSelector((state) => state.job)

  const [filterJobs, setFilterJobs] = useState([])
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false)

  useEffect(() => {
    if (!allJobs) return

    const filtered = allJobs.filter((job) => {
    return (
        (!searchedQuery.location ||
        (job.location || '')
            .toLowerCase()
            .includes(searchedQuery.location.toLowerCase())) &&

        (!searchedQuery.industry ||
        (job.title || '')
            .toLowerCase()
            .includes(searchedQuery.industry.toLowerCase())) &&

        (!searchedQuery.salary ||
        Number(job.salary) >= Number(searchedQuery.salary))
    )
    })

    setFilterJobs(filtered)
  }, [allJobs, searchedQuery])

  useEffect(() => {
    return () => {
      dispatch(
        setSearchedQuery({
          location: '',
          industry: '',
          salary: '',
        })
      )
    }
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 px-4 py-6 sm:px-[5%] lg:px-[8%] lg:py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden min-w-[280px] xl:block">
            <div className="sticky top-24">
              <FilterCard />
            </div>
          </aside>

          {/* Main Content */}
          <section className="w-full">
            {/* Top Header */}
            <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Search Results
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    Explore Jobs
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Found{' '}
                    <span className="font-semibold text-slate-900">
                      {filterJobs.length}
                    </span>{' '}
                    matching job{filterJobs.length === 1 ? '' : 's'} based on your
                    current search and filters.
                  </p>
                </div>

                {/* Mobile Filter Button */}
                <div className="xl:hidden">
                  <Button
                    onClick={() => setIsFilterBoxOpen(true)}
                    className="h-11 rounded-2xl bg-slate-900 px-4 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {isFilterBoxOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterBoxOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-900/30 xl:hidden"
                  />

                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.25 }}
                    className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-2xl xl:hidden"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-slate-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        onClick={() => setIsFilterBoxOpen(false)}
                        className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <FilterCard />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Results */}
            {filterJobs.length === 0 ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 text-center shadow-sm">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <SearchX className="h-7 w-7" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  No results found
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn’t find any jobs matching your current filters. Try
                  adjusting your search terms or selecting different filter options.
                </p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3"
              >
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Jobs