package dev.ixale.employeemanagementbackend.controller;

import dev.ixale.employeemanagementbackend.model.Employee;
import dev.ixale.employeemanagementbackend.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins ="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // GET
    @GetMapping("/")
    public ResponseEntity<Object> getAllEmployees() {

        return ResponseEntity.ok(employeeService.getAllEmployees());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getEmployee(@PathVariable("id") Long id) {
        Optional<Employee> employeeOptional = employeeService.getEmployeeById(id);

        return processEmptyOptional(employeeOptional);
    }

    // Search
    @GetMapping("/search/firstName")
    public ResponseEntity<Object> searchEmployeeByFirstName(@RequestParam("firstName") String firstName) {
        Optional<Employee> employeeOptional = employeeService.getEmployeeByFirstName(firstName);

        return processEmptyOptional(employeeOptional);
    }
    @GetMapping("/search/lastName")
    public ResponseEntity<Object> searchEmployeeByLastName(@RequestParam("lastName") String lastName) {
        Optional<Employee> employeeOptional = employeeService.getEmployeeByLastName(lastName);

        return processEmptyOptional(employeeOptional);
    }
    @GetMapping("/search/emailId")
    public ResponseEntity<Object> searchEmployeeByEmailId(@RequestParam("emailId") String emailId) {
        Optional<Employee> employeeOptional = employeeService.getEmployeeByEmailId(emailId);

        return processEmptyOptional(employeeOptional);
    }


    // POST
    @PostMapping("/")
    public ResponseEntity<Object> postEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.saveNewEmployee(employee));
    }


    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Object> putEmployee(@PathVariable("id") Long id, @RequestBody Employee employee) {
        Optional<Employee> employeeOptional = employeeService.updateEmployee(id, employee);

        return processEmptyOptional(employeeOptional);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable("id") Long id) {
        Optional<Employee> employeeOptional = employeeService.deleteEmployee(id);

        return processEmptyOptional(employeeOptional);
    }

    private ResponseEntity<Object> processEmptyOptional(Optional<Employee> employeeOptional) {
        if (employeeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employeeOptional.get());
    }
}
