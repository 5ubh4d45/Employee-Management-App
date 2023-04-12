package dev.ixale.employeemanagementbackend.service;

import dev.ixale.employeemanagementbackend.model.Employee;
import dev.ixale.employeemanagementbackend.repository.EmployeeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    private final EmployeeRepository employeeRepository;

    @PersistenceContext
    EntityManager entityManager;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    // Get
    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Optional<List<Employee>> getEmployeeByFirstName(String firstName) {
        return employeeRepository.findEmployeeByFirstName(firstName);
    }

    @Override
    public Optional<List<Employee>> getEmployeeByLastName(String lastName) {
        return employeeRepository.findEmployeeByLastName(lastName);
    }

    @Override
    public Optional<List<Employee>> getEmployeeByEmailId(String emailId) {
        return employeeRepository.findEmployeeByEmailId(emailId);
    }

    // Search
    @Override
    public List<Employee> searchEmployees(String firstName, String lastName, String emailId) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Employee> criteriaQuery = criteriaBuilder.createQuery(Employee.class);
        Root<Employee> employeeRoot = criteriaQuery.from(Employee.class);
        List<Predicate> predicates = new ArrayList<>();

        // filtering
        if (firstName != null && !firstName.trim().isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(employeeRoot.get("firstName")), "%" + firstName.toLowerCase() + "%"));
        }
        if (lastName != null && !lastName.trim().isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(employeeRoot.get("lastName")), "%" + lastName.toLowerCase() + "%"));
        }
        if (emailId != null && !emailId.trim().isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(employeeRoot.get("emailId")), "%" + emailId.toLowerCase() + "%"));
        }

        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        TypedQuery<Employee> typedQuery = entityManager.createQuery(criteriaQuery);

        return typedQuery.getResultList();
    }


    // Save & Update
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

    // Delete
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
