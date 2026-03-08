package com.salesshop.controller;

import com.salesshop.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(dashboardService.getStats(userId));
    }

    @GetMapping("/recent-activity")
    public ResponseEntity<?> getRecentActivity(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(dashboardService.getRecentActivity(userId));
    }
}
