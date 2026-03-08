package com.salesshop.repository;

import com.salesshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findByCustomerId(Long customerId);

    Optional<Order> findByOrderNumber(String orderNumber);
}
