package dev.ixale.employeemanagementbackend.service;


import dev.ixale.employeemanagementbackend.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    /**
     * Get all employees
     * @return a list of all employees
     */
    List<Employee> getAllEmployees();
    /**
     * Get all employees
     * @param numberOfEmployees number of employees to return
     * @return a list of all employees
     */
    List<Employee> getAllEmployees(int numberOfEmployees);
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
