import React from 'react'
import EmployeeListComp from './EmployeeListComp'

function SearchEmployee() {
  return (
    <div className="container mx-auto my-8 text-center">
        <EmployeeListComp loading={false}
        employees={[]}
        deleteEmployee={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {}}
        updateEmployee={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {}} />
    </div>
  )
}

export default SearchEmployee