import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search } from 'lucide-react'

const Companies = () => {
  useGetAllCompanies()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState('')

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input, dispatch])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header Section */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative px-5 py-6 sm:px-8 sm:py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-white to-blue-50 opacity-80" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                    <Building2 className="h-7 w-7" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex w-fit items-center rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                      Admin Panel
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Manage Companies
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                      View, search, and organize all registered companies from one clean dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Search company by name..."
                      className="h-11 rounded-xl border-slate-200 bg-white pl-10 pr-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>

                  <Button
                    className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800"
                    onClick={() => navigate('/admin/companies/create')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Company
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Table Section */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Company Directory
              </h2>
              <p className="text-sm text-slate-500">
                Browse all companies and use the search bar to quickly filter results.
              </p>
            </div>

            <div className="px-2 py-2 sm:px-4 sm:py-4">
              <CompaniesTable />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Companies