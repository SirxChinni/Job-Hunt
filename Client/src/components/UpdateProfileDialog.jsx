import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  Loader2,
  FileText,
  UploadCloud,
  User,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((store) => store.auth)

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: '',
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('fullname', input.fullname)
      formData.append('email', input.email)
      formData.append('phoneNumber', input.phoneNumber)
      formData.append('bio', input.bio)
      formData.append('skills', input.skills)

      if (input.file) {
        formData.append('file', input.file)
      }

      const response = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )

      if (response.data.success) {
        dispatch(setUser(response.data.user))
        toast.success('Profile updated successfully!')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }

    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-h-[90vh] overflow-y-auto border-0 bg-transparent p-0 shadow-none sm:max-w-4xl"
      >
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
          {/* Top banner */}
          <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-6 py-6 sm:px-8">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />

            <DialogHeader className="relative z-10">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>

              <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
                Update your profile
              </DialogTitle>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Keep your information fresh, highlight your skills, and upload your
                latest resume so your profile stays ready for the best opportunities.
              </p>
            </DialogHeader>
          </div>

          <form onSubmit={submitHandler} className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left column */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Personal details
                  </h3>

                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Full name
                      </Label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          name="fullname"
                          type="text"
                          placeholder="Enter your full name"
                          value={input.fullname}
                          onChange={changeEventHandler}
                          className="h-12 rounded-xl border-slate-200 bg-white pl-10 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Email address
                      </Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={input.email}
                          onChange={changeEventHandler}
                          className="h-12 rounded-xl border-slate-200 bg-white pl-10 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Phone number
                      </Label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          value={input.phoneNumber}
                          onChange={changeEventHandler}
                          className="h-12 rounded-xl border-slate-200 bg-white pl-10 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Professional summary
                  </h3>

                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Bio
                      </Label>
                      <Input
                        name="bio"
                        placeholder="Frontend developer, React enthusiast, actively seeking new opportunities"
                        value={input.bio}
                        onChange={changeEventHandler}
                        className="h-12 rounded-xl border-slate-200 bg-white shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Skills
                      </Label>
                      <Input
                        name="skills"
                        placeholder="React, Node.js, MongoDB, Tailwind CSS"
                        value={input.skills}
                        onChange={changeEventHandler}
                        className="h-12 rounded-xl border-slate-200 bg-white shadow-sm"
                      />
                      <p className="text-xs text-slate-400">
                        Separate each skill with a comma.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Resume upload
                  </h3>

                  <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                    <div className="flex flex-col items-start">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                        <UploadCloud className="h-5 w-5" />
                      </div>

                      <h4 className="text-base font-semibold text-slate-900">
                        Upload updated resume
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Add a PDF version of your latest resume to improve your
                        profile and keep your applications current.
                      </p>

                      <Input
                        name="file"
                        type="file"
                        accept="application/pdf"
                        onChange={fileChangeHandler}
                        className="mt-4 h-12 rounded-xl border-slate-200 bg-white shadow-sm file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700"
                      />

                      {input.file ? (
                        <div className="mt-4 flex w-full items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
                          <FileText className="h-4 w-4 shrink-0" />
                          <span className="truncate">{input.file.name}</span>
                        </div>
                      ) : (
                        <div className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-400">
                          No file selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Quick tips
                  </h3>

                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      Use a short, clear bio that explains your role and strengths.
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      Add relevant skills recruiters are likely to search for.
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      Upload your newest resume before applying to more roles.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-11 rounded-xl border-slate-300 px-5"
              >
                Cancel
              </Button>

              {loading ? (
                <Button
                  className="h-11 rounded-xl bg-slate-900 px-6 text-white hover:bg-slate-900"
                  disabled
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving changes...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-11 rounded-xl bg-slate-900 px-6 text-white hover:bg-slate-800"
                >
                  Save changes
                </Button>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog