import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'
import { motion } from 'framer-motion'

function Profile() {
  useGetAppliedJobs()

  const [open, setOpen] = useState(false)
  const { user } = useSelector((store) => store.auth)

  return (
    <>
      <Navbar />

      {/* Profile card */}
      <motion.main
        initial={{ opacity: 0, y: 64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full px-[6%] max-sm:px-4 py-6"
      >
        <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4 sm:gap-5">
              <Avatar className="h-20 w-20 cursor-pointer ring-2 ring-slate-100 sm:h-24 sm:w-24">
                {user?.profile?.profilePhoto ? (
                  <AvatarImage src={user.profile.profilePhoto} alt="profile" />
                ) : (
                  <AvatarImage src="https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg" alt="profile" />
                )}
              </Avatar>

              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {user?.fullname}
                </h1>
                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                  {user?.profile?.bio ||
                    'Passionate professional exploring new opportunities and growth.'}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="mt-2 h-10 rounded-2xl border-slate-300 text-sm font-medium text-slate-800 transition-transform hover:scale-[1.02]"
            >
              <Pen className="mr-2 h-4 w-4" />
              Edit profile
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-slate-100" />

          {/* Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Mail className="h-4 w-4 text-slate-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Contact className="h-4 w-4 text-slate-500" />
              <span>{user?.phoneNumber || 'Phone number not added'}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-7">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Skills & expertise
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-400">No skills added yet</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-7">
            <Label className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Resume
            </Label>
            <div className="mt-2 text-sm">
              {user?.profile?.resume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user.profile.resume}
                  className="break-all text-slate-900 underline-offset-2 hover:text-slate-700 hover:underline"
                >
                  {user.profile.resumeOriginalName}
                </a>
              ) : (
                <span className="text-slate-400">No resume uploaded</span>
              )}
            </div>
          </div>
        </section>
      </motion.main>

      {/* Applied jobs block */}
      <section className="mx-auto mb-14 mt-4 w-full px-[6%] max-sm:px-4">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8 sm:py-7">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Applied jobs
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review and track the roles you have applied for.
            </p>
          </div>

          <AppliedJobTable />
        </div>
      </section>

      <UpdateProfileDialog open={open} setOpen={setOpen} />

      <Footer />
    </>
  )
}

export default Profile