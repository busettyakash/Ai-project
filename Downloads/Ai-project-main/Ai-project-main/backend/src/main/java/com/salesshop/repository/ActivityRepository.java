package com.salesshop.repository;

import com.salesshop.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUserId(Long userId);

    List<Activity> findByCustomerId(Long customerId);

    List<Activity> findByDealId(Long dealId);

    List<Activity> findTop10ByUserIdOrderByCreatedAtDesc(Long userId);

    long countByUserId(Long userId);
}
