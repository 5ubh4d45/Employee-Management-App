import React from 'react'
import { EmployeeData } from '../../data/EmployeeData'
import EmployeeRowComp from './EmployeeRowComp';

function EmployeeListComp(props: {
    loading: boolean,
    employees: EmployeeData[],
    deleteEmployee: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void,
    updateEmployee: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
})
{
    const {loading, employees, deleteEmployee, updateEmployee} = props;
  return (
    <div className="flex my-3 shadow border-b">
            <table className="min-w-full">
                <thead className=" bg-slate-200 font-extralight uppercase 
                    tracking-wider px-4 py-2">
                    <tr>
                        <th className="px-2 py-1">First Name</th>
                        <th className="px-2 py-1">Last Name</th>
                        <th className="px-2 py-1">Email Id</th>
                        <th className="px-2 py-1">Actions</th>
                    </tr>
                </thead>
                {!loading && (
                <tbody className="bg-slate-50 font-light px-4 py-2">
                    {employees.map((employee) =>(
                        <EmployeeRowComp key={employee.id}
                        employee={employee}
                        deleteEmployee={deleteEmployee}
                        updateEmployee={updateEmployee}
                        />
                    ))}
                </tbody>
                )}
            </table>
        </div>
  )
}

export default EmployeeListComp