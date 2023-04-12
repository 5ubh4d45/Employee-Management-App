package dev.ixale.employeemanagementbackend.repository;

import dev.ixale.employeemanagementbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<List<Employee>> findEmployeeByFirstName(String firstName);

    Optional<List<Employee>>  findEmployeeByLastName(String lastName);

    Optional<List<Employee>>  findEmployeeByEmailId(String emailId);
}
