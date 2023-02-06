import axios from "axios";

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/v1/employees;'

// function EmployeeService() {
//     const getEmployee = () =>{
//         return axios.get(EMPLOYEE_API_BASE_URL)
//     }
//     return getEmployee();
// }

export const getEmployees = () => {return axios.get(EMPLOYEE_API_BASE_URL)};

