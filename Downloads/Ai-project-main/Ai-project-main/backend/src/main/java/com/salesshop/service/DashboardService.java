package com.salesshop.service;

import com.salesshop.entity.Activity;
import com.salesshop.entity.User;
import com.salesshop.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final DealRepository dealRepository;
    private final ProductRepository productRepository;
    private final ActivityRepository activityRepository;

    public DashboardService(UserRepository userRepository,
            CustomerRepository customerRepository,
            DealRepository dealRepository,
            ProductRepository productRepository,
            ActivityRepository activityRepository) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.dealRepository = dealRepository;
        this.productRepository = productRepository;
        this.activityRepository = activityRepository;
    }

    public Map<String, Object> getStats(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalCustomers", customerRepository.countByUserId(userId));
        stats.put("totalDeals", dealRepository.countByUserId(userId));
        stats.put("totalProducts", productRepository.countByUserId(userId));
        stats.put("totalActivities", activityRepository.countByUserId(userId));

        Map<String, Object> userInfo = new LinkedHashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("name", user.getFullName());
        userInfo.put("email", user.getEmail());
        userInfo.put("shopName", user.getShopName());
        userInfo.put("gstNumber", user.getGstNumber());
        stats.put("user", userInfo);

        return stats;
    }

    public List<Map<String, Object>> getRecentActivity(Long userId) {
        List<Activity> activities = activityRepository.findTop10ByUserIdOrderByCreatedAtDesc(userId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Activity a : activities) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", a.getId());
            item.put("type", a.getType());
            item.put("description", a.getDescription());
            item.put("activityDate", a.getActivityDate());
            item.put("createdAt", a.getCreatedAt());
            result.add(item);
        }
        return result;
    }
}
