package dev.ixale.employeemanagementbackend.service;


import dev.ixale.employeemanagementbackend.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    /**
     * Get all employees
     *
     * @return a list of all employees
     */
    Optional<List<Employee>> getAllEmployees();
    /**
     * Get all employees by page.
     * Example: getEmployeesByPage(0, 10) will return the first 10 employees.
     * @param pageIndex        zero based page index to get [MUST BE NON NEGATIVE]
     * @param employeesPerPage number of employees per page[MUST BE GREATER THAN ZERO]
     * @return a list of the employees on the given page.
     *        If pageIndex is negative or employeesPerPage is zero, an empty optional is returned.
     *        If pageIndex is zero and employeesPerPage is zero, all employees are returned.
     */
    Optional<List<Employee>> getEmployeesByPage(int pageIndex, int employeesPerPage);
    /**
     * Get employee by id
     * @param id id of the employee to search for
     * @return an optional employee if found
     */
    Optional<Employee> getEmployeeById(long id);

    /**
     * Get employee by first name
     * @param firstName first name of the employee to search for
     * @return an optional employee if found
     */
    Optional<List<Employee>>  getEmployeeByFirstName(String firstName);
    /**
     * Get employee by last name
     * @param lastName last name of the employee to search for
     * @return an optional employee if found
     */
    Optional<List<Employee>>  getEmployeeByLastName(String lastName);
    /**
     * Get employee by email id
     * @param emailId email id of the employee to search for
     * @return an optional employee if found
     */
    Optional<List<Employee>>  getEmployeeByEmailId(String emailId);
    /**
     * Search for employees by first name, last name and email id
     * @param firstName first name of the employee to search for (optional)
     * @param lastName last name of the employee to search for (optional)
     * @param emailId email id of the employee to search for (optional)
     * @return a list of employees matching the search criteria
     */
    List<Employee> searchEmployees(String firstName, String lastName, String emailId);

    /**
     * Save a new employee
     * @param employee the employee to save
     * @return the saved employee if it doesn't already exist, otherwise an empty optional
     */
    Optional<Employee> saveNewEmployee(Employee employee);

    /**
     * Update an employee
     * @param id the id of the employee to update
     * @param employee the new employee data
     * @return the updated employee if it exists, otherwise an empty optional
     */
    Optional<Employee> updateEmployee(long id, Employee employee);

    /**
     * Delete an employee by id
     * @param id the id of the employee to delete
     * @return  the deleted employee if it exists, otherwise an empty optional
     */
    Optional<Employee> deleteEmployee(long id);
}
