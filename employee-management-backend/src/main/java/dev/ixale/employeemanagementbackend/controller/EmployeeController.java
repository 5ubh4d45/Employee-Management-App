package dev.ixale.employeemanagementbackend.controller;

import dev.ixale.employeemanagementbackend.model.Employee;
import dev.ixale.employeemanagementbackend.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

        return processEmptyOptionalEmployee(employeeOptional);
    }

    // Search
    @GetMapping("/search/firstName")
    public ResponseEntity<Object> searchEmployeeByFirstName(@RequestParam("firstName") String firstName) {
        Optional<List<Employee>> employeeOptional = employeeService.getEmployeeByFirstName(firstName);

        return processEmptyOptionalEmployeeList(employeeOptional);
    }
    @GetMapping("/search/lastName")
    public ResponseEntity<Object> searchEmployeeByLastName(@RequestParam("lastName") String lastName) {
        Optional<List<Employee>> employeeOptional = employeeService.getEmployeeByLastName(lastName);

        return processEmptyOptionalEmployeeList(employeeOptional);
    }
    @GetMapping("/search/emailId")
    public ResponseEntity<Object> searchEmployeeByEmailId(@RequestParam("emailId") String emailId) {
        Optional<List<Employee>> employeeOptional = employeeService.getEmployeeByEmailId(emailId);

        return processEmptyOptionalEmployeeList(employeeOptional);
    }
    @GetMapping("/search")
    public ResponseEntity<Object> searchEmployees(
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "emailId", required = false) String emailID ) {

        List<Employee> searchedEmployees = employeeService.searchEmployees(firstName, lastName, emailID);

        if (searchedEmployees.isEmpty()) return ResponseEntity.noContent().build();

        return ResponseEntity.ok(searchedEmployees);
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

        return processEmptyOptionalEmployee(employeeOptional);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable("id") Long id) {
        Optional<Employee> employeeOptional = employeeService.deleteEmployee(id);

        return processEmptyOptionalEmployee(employeeOptional);
    }

    private ResponseEntity<Object> processEmptyOptionalEmployee(Optional<Employee> employeeOptional) {
        if (employeeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employeeOptional.get());
    }
    private ResponseEntity<Object> processEmptyOptionalEmployeeList(Optional<List<Employee>> employeeOptional) {
        if (employeeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employeeOptional.get());
    }

}
