import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Cyber Security',
]

function CategoryCarousel() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = (query) => {
    dispatch(
      setSearchedQuery({
        location: '',
        industry: query,
        salary: '',
      })
    )
    navigate('/browse')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-12"
    >
      {/* Heading */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
          <span>Popular Categories</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Explore Categories
        </h2>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Jump straight into roles that match your skills and interests.
        </p>
      </div>

      {/* Carousel */}
      <Carousel className="mx-auto w-full max-sm:max-w-[260px] sm:max-w-2xl lg:max-w-4xl">
        <CarouselContent className="gap-3">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Button
                type="button"
                onClick={() => searchJobHandler(cat)}
                className="
                  group w-full justify-start rounded-2xl border border-slate-200 bg-white
                  px-4 py-4 text-left text-sm font-medium text-slate-800
                  shadow-sm transition-all duration-200
                  hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md
                  active:translate-y-0 active:shadow-sm
                "
              >
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white transition-colors duration-200 group-hover:bg-cyan-600">
                  {cat.split(' ')[0][0]}
                </span>
                <span className="line-clamp-2">{cat}</span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </motion.div>
  )
}

export default CategoryCarousel