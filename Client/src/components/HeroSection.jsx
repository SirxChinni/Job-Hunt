import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function HeroSection() {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
  dispatch(
    setSearchedQuery({
      location: '',
      industry: query,    // use hero query as title/industry keyword
      salary: '',
    })
  )
  navigate('/browse')
}

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-6xl"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-10 sm:py-16 lg:px-14">
          {/* Soft background accents */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-cyan-100/60 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-slate-200/60 blur-3xl" />
          </div>

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
              Trusted job discovery platform
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Search smarter, apply faster, and land your next{' '}
              <span
                onClick={() => navigate('/browse')}
                className="cursor-pointer text-cyan-600 transition-colors hover:text-cyan-700"
              >
                dream role
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg"
            >
              Discover curated opportunities, explore top companies, and move
              through your job search with a cleaner, faster experience.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50 sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-3 rounded-2xl px-3 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Search className="h-5 w-5" />
                </div>

                <input
                  type="text"
                  placeholder="Search jobs, skills, or companies"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <Button
                onClick={searchJobHandler}
                className="h-12 rounded-2xl bg-slate-900 px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 sm:px-7"
              >
                Search Jobs
              </Button>
            </motion.div>

            {/* Supporting stats / trust strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500"
            >
              <div className="rounded-full bg-slate-100 px-4 py-2">
                Top roles across tech and design
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2">
                Fast and focused search experience
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2">
                Explore jobs from trusted companies
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection