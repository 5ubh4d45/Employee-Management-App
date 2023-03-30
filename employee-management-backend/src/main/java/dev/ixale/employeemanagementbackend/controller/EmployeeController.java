package dev.ixale.employeemanagementbackend.controller;

import dev.ixale.employeemanagementbackend.model.Employee;
import dev.ixale.employeemanagementbackend.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins ="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // gets all employees data
    @GetMapping("/")
    public ResponseEntity<Object> getAllEmployees() {

        return ResponseEntity.ok(employeeRepository.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getEmployee(@PathVariable("id") Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);

        if (employeeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employeeOptional.get());
    }

    // rest api
    @PostMapping("/")
    public ResponseEntity<Object> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeRepository.save(employee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee employee) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);

        if (employeeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Employee existingEmployee = employeeOptional.get();
        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmailId(employee.getEmailId());

        employeeRepository.save(existingEmployee);

        return ResponseEntity.ok(existingEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable("id") Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);

        if (employeeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        employeeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
