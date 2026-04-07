import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { ArrowLeft, Building2, ChevronRight } from 'lucide-react'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [companyName, setCompanyName] = useState('')

  const registerNewCompany = async () => {
    try {
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company))
        const companyId = response?.data?.company?._id
        toast.success(response.data.message)
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Page Header */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative px-5 py-6 sm:px-8 sm:py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-white to-blue-50 opacity-80" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                    <Building2 className="h-7 w-7" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex w-fit items-center rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                      Company Setup
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Create New Company
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                      Add your company name to get started. You can update the rest of the company details in the next step.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/companies')}
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
            </div>
          </section>

          {/* Form Card */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Company Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the official company name you want to register in the system.
              </p>
            </div>

            <div className="space-y-6 px-5 py-6 sm:px-6 sm:py-8">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Company Name
                </Label>
                <Input
                  type="text"
                  value={companyName}
                  className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  placeholder="Jobhunt, Microsoft, Infosys..."
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <p className="text-xs leading-5 text-slate-500">
                  Use the company’s official or most recognizable name. You can edit additional details after registration.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/companies')}
                  className="h-11 rounded-xl border-slate-200 px-5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100"
                >
                  Cancel
                </Button>

                <Button
                  onClick={registerNewCompany}
                  className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default CompanyCreate