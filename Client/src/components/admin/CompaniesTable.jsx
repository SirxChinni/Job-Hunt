import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Building2, Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company)
  const navigate = useNavigate()

  const [filterCompany, setFilterCompany] = useState(companies)

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true
        }
        return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })

    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="px-4 py-4 text-sm text-slate-500">
            A list of your recently registered companies.
          </TableCaption>

          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-b border-slate-200 hover:bg-slate-50/80">
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Company
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Name
              </TableHead>
              <TableHead className="h-12 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Created On
              </TableHead>
              <TableHead className="h-12 px-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompany && filterCompany.length > 0 ? (
              filterCompany.map((company, idx) => (
                <TableRow
                  key={company._id}
                  className={`border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  <TableCell className="px-4 py-4 sm:px-6">
                    <Avatar className="h-11 w-11 rounded-xl border border-slate-200 bg-slate-50">
                      <AvatarImage
                        src={
                          company?.logo ||
                          'https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?rs=1&pid=ImgDetMain'
                        }
                        alt={company?.companyName || 'Company logo'}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-xl bg-slate-100 text-slate-600">
                        <Building2 className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="px-4 py-4 sm:px-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {company?.companyName || 'N/A'}
                      </p>
                      <p className="text-xs text-slate-500">
                        Registered company
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-4 text-sm text-slate-500 sm:px-6">
                    {company?.createdAt?.split('T')[0]}
                  </TableCell>

                  <TableCell className="px-4 py-4 text-right sm:px-6">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-slate-500 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Open company actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-36 rounded-xl border border-slate-200 p-2 shadow-lg"
                      >
                        <button
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">
                      No companies found
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-slate-500">
                      No companies match your current search. Try another name or add a new company.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CompaniesTable