import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import {
  BriefcaseBusiness,
  BuildingIcon,
  HomeIcon,
  LogOut,
  MenuIcon,
  SearchCheck,
  User2,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth)

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      )

      if (response.data.success) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed')
    }
  }

  const resetQuery = () => dispatch(setSearchedQuery(''))

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Brand */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-all duration-200 hover:bg-slate-100"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
            JH
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[19px]">
              Job<span className="text-cyan-600">Hunt</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
              Career Portal
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 sm:flex">
          <ul className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-2 py-1 text-sm font-medium text-slate-600">
            {user?.role === 'recruiter' ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="inline-flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-white hover:text-slate-900"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="inline-flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-white hover:text-slate-900"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      resetQuery()
                      navigate('/')
                    }}
                    className="inline-flex items-center rounded-full px-4 py-2 text-slate-600 transition-all duration-200 hover:bg-white hover:text-slate-900"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-white hover:text-slate-900"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      resetQuery()
                      navigate('/browse')
                    }}
                    className="inline-flex items-center rounded-full px-4 py-2 text-slate-600 transition-all duration-200 hover:bg-white hover:text-slate-900"
                  >
                    Browse
                  </button>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="h-10 rounded-full border-slate-300 bg-white px-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="h-10 rounded-full bg-slate-900 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md transition-all duration-200 hover:bg-slate-800">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-full border border-slate-200 bg-white pl-1 pr-3 py-1 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                      alt="profile"
                    />
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <p className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
                      {user?.fullname}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                      {user?.role}
                    </p>
                  </div>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                    <Avatar className="h-12 w-12 ring-1 ring-slate-200">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                        alt="profile"
                      />
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold text-slate-900">
                        {user?.fullname}
                      </h4>
                      <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">
                        {user?.profile?.bio || 'No bio added yet'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {user?.role === 'student' && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <User2 size={18} />
                        <span>View Profile</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={logoutHandler}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-rose-600 transition-all duration-200 hover:bg-rose-50"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 sm:hidden">
          {!user ? (
            <Link to="/login">
              <Button className="h-9 rounded-full bg-slate-900 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
                Login
              </Button>
            </Link>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 bg-white p-0.5 shadow-sm"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                      alt="profile"
                    />
                  </Avatar>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-64 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
                <div className="flex flex-col gap-1.5">
                  {user?.role === 'student' && (
                    <button
                      type="button"
                      onClick={() => navigate('/profile')}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50"
                    >
                      <User2 size={18} />
                      <span>Profile</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={logoutHandler}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-rose-600 transition-all duration-200 hover:bg-rose-50"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50"
              >
                <MenuIcon className="h-4 w-4" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-64 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="flex flex-col gap-1.5">
                {user?.role === 'recruiter' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate('/admin/companies')}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50"
                    >
                      <BuildingIcon size={18} />
                      <span>Companies</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/admin/jobs')}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50"
                    >
                      <BriefcaseBusiness size={18} />
                      <span>Jobs</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        resetQuery()
                        navigate('/')
                      }}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50"
                    >
                      <HomeIcon size={18} />
                      <span>Home</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/jobs')}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50"
                    >
                      <BriefcaseBusiness size={18} />
                      <span>Jobs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        resetQuery()
                        navigate('/browse')
                      }}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50"
                    >
                      <SearchCheck size={18} />
                      <span>Browse</span>
                    </button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}

export default Navbar