import axios from "axios";
import { Employee } from "../data/Employee";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees/";


class EmployeeService{

    /**
     * saves the given employee to the backend
     * @param employee the employee to save
     * @returns the saved promise type Employee or error mssg if expected error occurs
     * or null if an unexpected error occurred
     */
    async saveEmployee(employee: Employee) : Promise<Employee | null>{
        try {
            const response = await axios.post<Employee>(EMPLOYEE_API_BASE_URL, employee);
            return Promise.resolve(response.data);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log("status: " + e.response?.status);
                console.error("error response: " + e.response);
                if (e.response?.status === 404) {
                   return Promise.reject(e.response.data);
                }
            }
            else {
                console.log(e);
            }
            return null;
        }
    }
}
// const  employeeService = new EmployeeService();
export default new EmployeeService();