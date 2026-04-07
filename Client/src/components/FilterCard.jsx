import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { SlidersHorizontal } from 'lucide-react'

const filterData = [
  {
    filterType: 'location',
    label: 'Location',
    array: ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Visakhapatnam', 'Chennai'],
  },
  {
    filterType: 'industry',
    label: 'Industry',
    array: [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Data Scientist',
      'Machine Learning',
    ],
  },
  // Salary filter ready to enable later:
//   {
//     filterType: 'salary',
//     label: 'Salary',
//     array: ['6', '10', '20', '50']
//   }
]

const FilterCard = () => {
  useGetAllJobs()
  const dispatch = useDispatch()

  const [filters, setFilters] = useState({
    location: '',
    industry: '',
    // salary: ''
  })

  const handleToggle = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? '' : value,
    }))
  }

  useEffect(() => {
    dispatch(setSearchedQuery(filters))
  }, [filters, dispatch])

  const clearAll = () =>
    setFilters({
      location: '',
      industry: '',
    })

  return (
    <aside className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-slate-900">
              Filter Jobs
            </h1>
            <p className="text-xs text-slate-500">
              Narrow results by location and role.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:bg-slate-100"
        >
          Clear All
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        {filterData.map((data, index) => (
          <section key={index} className="space-y-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {data.label}
            </h2>

            <RadioGroup value={filters[data.filterType]} className="space-y-1.5">
              {data.array.map((item, idx) => {
                const itemId = `r-${index}-${idx}`
                const isSelected = filters[data.filterType] === item

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggle(data.filterType, item)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-slate-50 shadow-sm'
                        : 'bg-transparent text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        checked={isSelected}
                        className={isSelected ? 'border-slate-50 text-slate-50' : ''}
                      />
                      <Label
                        htmlFor={itemId}
                        className={`cursor-pointer ${
                          isSelected ? 'text-slate-50' : 'text-slate-700'
                        }`}
                      >
                        {item}
                      </Label>
                    </div>

                    {isSelected && (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-100">
                        ON
                      </span>
                    )}
                  </button>
                )
              })}
            </RadioGroup>
          </section>
        ))}
      </div>
    </aside>
  )
}

export default FilterCard