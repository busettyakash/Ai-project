package com.salesshop.repository;

import com.salesshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUserId(Long userId);

    List<Product> findBySku(String sku);

    long countByUserId(Long userId);
}
