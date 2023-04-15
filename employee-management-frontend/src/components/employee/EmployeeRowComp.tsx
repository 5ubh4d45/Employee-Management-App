import React from 'react'
import { EmployeeData } from '../../data/EmployeeData';

const EmployeeRowComp = (props: {employee: EmployeeData,
deleteEmployee: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void,
updateEmployee: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
}) => {
    const {employee, deleteEmployee, updateEmployee} = props;

    return (
      <tr className="bg-white">
        <td className="px-2 py-1">{employee.firstName}</td>
        <td className="px-2 py-1">{employee.lastName}</td>
        <td className="px-2 py-1">{employee.emailId}</td>
        <td className=" bg-slate-50 px-2 py-1 space-x-2 font-medium tracking-wide
        hover:cursor-pointer">
          <button 
            onClick={(e) => updateEmployee(e, employee.id)}
          className="text-teal-500 hover:text-teal-800">
            Edit
          </button>
          <button
            onClick={(e) => deleteEmployee(e, employee.id)}
            className="text-red-500 hover:text-red-800"
          >
            Delete
          </button>
        </td>
      </tr>
    );
}

export default EmployeeRowComp