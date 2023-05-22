import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import { EmployeeData } from '../../data/EmployeeData';


const UpdateEmployee = () => {
    const {id} = useParams<{id: string}>();

    const [employee, setEmployee] = useState<EmployeeData>({
        id: id!,
        firstName: '',
        lastName: '',
        emailId: ''
    });

    const navigaveTo = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
        // console.log(employee);
    }

    function cancelUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        navigaveTo('/employeeList');
    }

    useEffect(() => {
        
        EmployeeService.getEmployeeById(id)
        .then((response) => {
            if (response == null) {
                // Display an error message to the user if the API call failed
                alert("Cannot fetch employee. Something went wrong. Please try again later.");
            }else {
                setEmployee(response);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Cannot Fetch employee. " + error);
        });

    }, [id]);
    

    const updateEmployeeInnerFn = () => {
        // Perform some validation on the employee object
        if (!employee.firstName || !employee.lastName || !employee.emailId) {
            // Display an error message to the user if any required fields are missing
            alert("Please fill out all required fields.");
            return;
        }

        // Call the API to save the employee
        EmployeeService.updateEmployeeById(employee.id, employee)
        .then((response) => {
            if (response == null) {
                // Display an error message to the user if the API call failed
                alert("Cannot update employee. Something went wrong. Please try again later.");
            }
            alert("Employee updated successfully.");

        })
        .catch((error) => {
            console.log(error);
            alert("Cannot Update Employee. " + error);
        })
        .finally(() => {
          navigaveTo('/employeeList');
        });
    };


  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update Employee</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 pt-2">
          <label className="block text-gray-600 font-normal">
            First Name
          </label>
          <input type='text'
            name='firstName'
            value={employee?.firstName}
            onChange={(e) => handleChange(e)}
            className="h-18 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 pt-2">
          <label className="block text-gray-600 font-normal">
            Last Name
          </label>
          <input type='text'
            name='lastName'
            value={employee?.lastName}
            onChange={(e) => handleChange(e)}
            className="h-18 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 pt-2">
          <label className="block text-gray-600 font-normal">
            Email Id
          </label>
          <input type='text'
            name='emailId'
            value={employee?.emailId}
            onChange={(e) => handleChange(e)}
            className="h-18 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 pt-4 space-x-5">
         <button onClick={updateEmployeeInnerFn}
         className="rounded text-white bg-teal-500 px-2 py-2
          hover:bg-teal-800 ">
            Update
          </button>
         <button
         onClick={e => cancelUpdate(e)}
         className="rounded text-white bg-orange-500 px-2 py-2
          hover:bg-orange-800 ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployee