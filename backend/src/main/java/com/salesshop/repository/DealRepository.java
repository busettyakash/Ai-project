package com.salesshop.repository;

import com.salesshop.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {
    List<Deal> findByUserId(Long userId);

    List<Deal> findByUserIdAndStage(Long userId, String stage);

    List<Deal> findByCustomerId(Long customerId);

    long countByUserId(Long userId);
}
