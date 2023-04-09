package dev.ixale.employeemanagementbackend.service;


import dev.ixale.employeemanagementbackend.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    Optional<Employee> getEmployeeById(long id);
    Optional<Employee> getEmployeeByFirstName(String firstName);
    Optional<Employee> getEmployeeByLastName(String lastName);
    Optional<Employee> getEmployeeByEmailId(String emailId);

    Optional<Employee> saveNewEmployee(Employee employee);

    Optional<Employee> updateEmployee(long id, Employee employee);

    Optional<Employee> deleteEmployee(long id);
}
