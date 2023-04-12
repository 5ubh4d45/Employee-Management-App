package dev.ixale.employeemanagementbackend.service;


import dev.ixale.employeemanagementbackend.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    Optional<Employee> getEmployeeById(long id);


    Optional<List<Employee>>  getEmployeeByFirstName(String firstName);
    Optional<List<Employee>>  getEmployeeByLastName(String lastName);
    Optional<List<Employee>>  getEmployeeByEmailId(String emailId);

    List<Employee> searchEmployees(String firstName, String lastName, String emailId);

    Optional<Employee> saveNewEmployee(Employee employee);

    Optional<Employee> updateEmployee(long id, Employee employee);

    Optional<Employee> deleteEmployee(long id);
}
