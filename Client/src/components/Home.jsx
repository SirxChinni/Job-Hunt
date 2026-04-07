import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useGetAllJobs()

  const { user } = useSelector((store) => store.auth)

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="relative">
        {/* Hero */}
        <HeroSection />

        {/* Categories */}
        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <CategoryCarousel />
          </div>
        </section>

        {/* Latest Jobs */}
        <section className="px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-6xl">
            <LatestJobs />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home