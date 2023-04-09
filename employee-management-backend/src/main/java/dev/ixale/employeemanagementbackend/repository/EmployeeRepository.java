package dev.ixale.employeemanagementbackend.repository;

import dev.ixale.employeemanagementbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findEmployeeByFirstName(String firstName);

    Optional<Employee> findEmployeeByLastName(String lastName);

    Optional<Employee> findEmployeeByEmailId(String emailId);
}
