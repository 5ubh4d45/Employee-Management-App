import axios from "axios";
import { EmployeeData } from "../data/EmployeeData";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees/";


class EmployeeService{

    /**
     * saves the given employee to the backend
     * @param employee the employee to save
     * @returns the saved promise type Employee or error mssg if expected error occurs
     * or null if an unexpected error occurred
     */
    async saveEmployee(employee: EmployeeData) : Promise<EmployeeData | null>{
        try {
            const response = await axios.post<EmployeeData>(EMPLOYEE_API_BASE_URL, employee);
            return Promise.resolve(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("status: " + error.response?.status);
                console.error("error response: " + error.response);
                if (error.response?.status === 404) {
                   return Promise.reject(error.response.data);
                }
            }
            else {
                console.error(error);
            }
            return null;
        }
    }

    /**
     * updates the employee with the given id in the backend
     * @param id the id of the employee to update
     * @param employee the employee to update
     * @returns the updated employee or error mssg if expected error occurs
     * or null if an unexpected error occurred 
     */
    async updateEmployeeById(employeeId: string | undefined, employee: EmployeeData) : Promise<EmployeeData | null> {
        try {
            const response = await axios.put<EmployeeData>(EMPLOYEE_API_BASE_URL + employeeId, employee);
            return Promise.resolve(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("status: " + error.response?.status);
                console.error("error response: " + error.response);
                if (error.response?.status === 404) {
                   return Promise.reject(error.response.data);
                }
                else {
                    console.error(error);
                }
            }
        }
        return null;
    }

    /**
     * gets all employees from the backend
     * @returns all employees from the backend or null if an error occurred
     */
    async getEmployees() : Promise<EmployeeData[] | null> {
        try {
            const response = await axios.get<EmployeeData[]>(EMPLOYEE_API_BASE_URL);
            return Promise.resolve(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("status: " + error.response?.status);
                console.error("error response: " + error.response);
                if (error.response?.status === 404) {
                   return Promise.reject(error.response.data);
                }
                else {
                    console.error(error);
                }
            }
        }
        return null;
    }

    /**
     * gets the employee with the given id from the backend
     * @param employeeId the id of the employee to get
     * @returns the employee with the given id or null if an error occurred
     */
    async getEmployeeById(employeeId: string | undefined) : Promise<EmployeeData | null> {
        try {
            const response = await axios.get<EmployeeData>(EMPLOYEE_API_BASE_URL + employeeId);
            return Promise.resolve(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("status: " + error.response?.status);
                console.error("error response: " + error.response);
                if (error.response?.status === 404) {
                     return Promise.reject(error.response.data);
                }
                else {
                    console.error(error);
                }
            }
        }
        return null;
    }

    /**
     * gets the employee with the given id from the backend
     * @param employeeId the id of the employee to delete
     * @returns void or error mssg if expected error occurs
     */
    async deleteEmployee(employeeId: string) : Promise<void> {
        try {
            const response = await axios.delete(EMPLOYEE_API_BASE_URL + employeeId);
            return Promise.resolve(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("status: " + error.response?.status);
                console.error("error response: " + error.response);
                if (error.response?.status === 404) {
                   return Promise.reject(error.response.data);
                }
                else {
                    console.error(error);
                }
            }
        }
    }
}
// const  employeeService = new EmployeeService();
export default new EmployeeService();