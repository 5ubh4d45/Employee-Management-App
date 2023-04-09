package dev.ixale.employeemanagementbackend.service;

import dev.ixale.employeemanagementbackend.model.Employee;
import dev.ixale.employeemanagementbackend.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Optional<Employee> getEmployeeByFirstName(String firstName) {
        return employeeRepository.findEmployeeByFirstName(firstName);
    }

    @Override
    public Optional<Employee> getEmployeeByLastName(String lastName) {
        return employeeRepository.findEmployeeByLastName(lastName);
    }

    @Override
    public Optional<Employee> getEmployeeByEmailId(String emailId) {
        return employeeRepository.findEmployeeByEmailId(emailId);
    }

    @Override
    public Optional<Employee> saveNewEmployee(Employee employee) {
        return Optional.of(employeeRepository.save(employee));
    }

    @Override
    public Optional<Employee> updateEmployee(long id, Employee employee) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);

        if (employeeOptional.isEmpty()) {
            return employeeOptional;
        }

        Employee existingEmployee = employeeOptional.get();
        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmailId(employee.getEmailId());

        return Optional.of(employeeRepository.save(existingEmployee));
    }

    @Override
    public Optional<Employee> deleteEmployee(long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);

        if (employeeOptional.isEmpty()) {
            return employeeOptional;
        }
        employeeRepository.deleteById(id);
        return employeeOptional;
    }
}
