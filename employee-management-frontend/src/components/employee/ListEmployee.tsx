import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EmployeeData } from '../../data/EmployeeData';
import EmployeeService from '../../services/EmployeeService';
import EmployeeListComp from './EmployeeListComp';

const ListEmployee = () => {
    const navigateTo = useNavigate();

    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const DEFAULT_EMPLOYEES_PER_PAGE = 5;    
    const [currentEmployeesPage, setCurrentEmployeesPage] = useState<EmployeeData[]>([]);
    const [employeesPerPage, setEmployeesPerPage] = useState<number>(DEFAULT_EMPLOYEES_PER_PAGE);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    
    // get employees data on page load
    useEffect(() => {
        // console.log("on Get Employee Data");
        setLoading(true);
        EmployeeService.getEmployees()
        .then((response) => {
            if (response == null) {
                alert("Cannot retrieve employees. Something went wrong. Please try again later.");
                return;
            }
            setEmployees(response);
        })
        .catch((error) => {
            console.log(error);
            alert("Some error occurred while retrieving employees. Please try again later.");
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    
    const goToPage = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPageNumber(pageNumber);
        setCurrentEmployeesPage(employees.slice((pageNumber - 1) * employeesPerPage, pageNumber * employeesPerPage));
        
        // TODO: Remove this console.log 
        // console.log("Total pages: " + totalPages
        // + ", employeesPerPage: " + employeesPerPage
        // + ", employees.length: " + employees.length);
        
        // console.log("employees current page: " + JSON.stringify(currentEmployeesPage));
        
    };


    // update employees data
    useEffect(() => {
        // console.log("on Update Employee Page");
        setLoading(true);
        // Pagination
        setTotalPages(Math.ceil(employees.length / employeesPerPage));
            
        setLoading(false);

        goToPage(1);
        setLoading(false);
        // setTimeout(() => {
        // }, 0);
    }, [employees, employeesPerPage]);


    const nextPage = () => {
        goToPage(currentPageNumber + 1);
        
    }

    const previousPage = () => {
        goToPage(currentPageNumber - 1);
    }
    
    const changeEmployeePerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        // console.log("[Change] Value: " + value);
        
        if (value > 0) {
            setEmployeesPerPage(value);
            
            // console.log("[Change] employeesPerPage: " + employeesPerPage
            // + ", Total pages: " + totalPages);
            
            e.target.value = value.toString();
        }
        else {
            alert("Employees per page must be greater than 0.");
            e.target.value = employeesPerPage.toString();
        }
    };

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
        <div className="h-12 flex items-center">
            <button
            onClick={() => navigateTo('/addEmployee')}
            className="rounded bg-slate-700 text-white px-6 py-2 font-semibold
            hover:bg-slate-900">
                Add Employee
            </button>
            <div className='flex-grow'></div>
            <div>
                {/* // input to set employee per page */}
                <span className="px-4 text-base font-medium">Employees per page:</span>
                <input 
                type="number"
                className="rounded bg-slate-700 text-white w-20 px-3 py-2 font-semibold
                hover:bg-slate-900"
                defaultValue={employeesPerPage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeEmployeePerPage(e)} />
            </div>
        </div>
        <div>
            <EmployeeListComp loading={loading}
            employees={currentEmployeesPage}
            deleteEmployee={deleteEmployee}
            updateEmployee={updateEmployee} />
        </div>
        <div>
            <button
            onClick={previousPage}
            className="rounded bg-slate-700 text-white px-6 py-2 font-semibold
            hover:bg-slate-900"
            disabled={currentPageNumber === 1}>
                Previous
            </button>
            <span className="px-4">{currentPageNumber} of {totalPages}</span>
            <button
            onClick={nextPage}
            className="rounded bg-slate-700 text-white px-6 py-2 font-semibold
            hover:bg-slate-900"
            disabled={currentPageNumber === totalPages}>
                Next
            </button>
        </div>
    </div>
  )
}

export default ListEmployee