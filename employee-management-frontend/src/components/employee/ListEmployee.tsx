import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EmployeeData } from '../../data/EmployeeData';
import EmployeeService from '../../services/EmployeeService';
import EmployeeRowComp from './EmployeeRowComp';

const ListEmployee = () => {
    const navigateTo = useNavigate();

    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    
    useEffect(() => {
        setLoading(true);
        EmployeeService.getEmployees()
        .then((response) => {
            if (response == null) {
                alert("Cannot retrieve employees. Something went wrong. Please try again later.");
                return;
            }

            setEmployees(response);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            alert("Some error occurred while retrieving employees. Please try again later.");
        });
    }, []);
    
    const deleteEmployee = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        e.preventDefault();
        EmployeeService.deleteEmployee(id)
        .then((response) => {
            if (response == null) {
                alert("Cannot delete employee. Something went wrong. Please try again later.");
                return;
            }
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
            alert("Employee deleted successfully.");
        })
        .catch((error) => {
            alert("Cannot delete employee. "+ error);
        });
    }
    
    function updateEmployee(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string): void {
        e.preventDefault();
        navigateTo(`/updateEmployee/${id}`);
    }

  return (
    <div className="container mx-auto my-8 text-center">
        <div className="h-12 inline-block">
            <button
            onClick={() => navigateTo('/addEmployee')}
            className="rounded bg-slate-700 text-white px-6 py-2 font-semibold
            hover:bg-slate-900">
                Add Employee
            </button>
        </div>
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
    </div>
  )
}

export default ListEmployee