package com.salesshop.repository;

import com.salesshop.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByUserId(Long userId);

    List<Customer> findByUserIdAndNameContainingIgnoreCase(Long userId, String name);

    long countByUserId(Long userId);
}
