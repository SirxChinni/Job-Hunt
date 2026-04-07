import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Building2, Globe, Loader2, MapPin, UploadCloud } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const params = useParams()
  const companyId = params.id

  useGetCompanyById(companyId)

  const { singleCompany } = useSelector((store) => store.company)

  const [input, setInput] = useState({
    companyName: '',
    description: '',
    website: '',
    location: '',
    file: null,
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('companyName', input.companyName)
      formData.append('description', input.description)
      formData.append('website', input.website)
      formData.append('location', input.location)

      if (input.file) {
        formData.append('file', input.file)
      }

      const response = await axios.post(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )

      if (response.data.success) {
        navigate('/admin/companies')
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInput({
      companyName: singleCompany?.companyName || '',
      description: singleCompany?.description || '',
      website: singleCompany?.website || '',
      location: singleCompany?.location || '',
      file: singleCompany?.file || null,
    })
  }, [singleCompany, companyId])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Header */}
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
                      Company Profile
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Company Setup
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                      Update your company details, public information, and logo from one place.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/admin/companies')}
                  type="button"
                  variant="outline"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
            </div>
          </section>

          {/* Form */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Edit Company Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep this information accurate so the company profile appears complete and professional.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6 px-5 py-6 sm:px-6 sm:py-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    name="companyName"
                    value={input.companyName}
                    onChange={changeEventHandler}
                    placeholder="Enter company name"
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="Enter company location"
                      className="h-12 rounded-xl border-slate-200 bg-white pl-10 pr-4 text-sm shadow-sm transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Description
                  </Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="Write a short company description"
                    className="h-12 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-sm transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Website
                  </Label>
                  <div className="relative">
                    <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="text"
                      name="website"
                      value={input.website}
                      onChange={changeEventHandler}
                      placeholder="https://example.com"
                      className="h-12 rounded-xl border-slate-200 bg-white pl-10 pr-4 text-sm shadow-sm transition-all duration-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Company Logo
                  </Label>

                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                          <UploadCloud className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            Upload company logo
                          </p>
                          <p className="text-xs text-slate-500">
                            PNG, JPG, or WEBP image files are recommended.
                          </p>
                        </div>
                      </div>

                      <Input
                        type="file"
                        accept="image/*"
                        onChange={changeFileHandler}
                        className="max-w-full cursor-pointer rounded-xl border-slate-200 bg-white text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <Button
                  onClick={() => navigate('/admin/companies')}
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-slate-200 px-5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100"
                >
                  Cancel
                </Button>

                {loading ? (
                  <Button
                    type="submit"
                    disabled
                    className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default CompanySetup