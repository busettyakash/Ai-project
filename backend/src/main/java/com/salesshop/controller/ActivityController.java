package com.salesshop.controller;

import com.salesshop.entity.Activity;
import com.salesshop.repository.ActivityRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityRepository activityRepo;

    public ActivityController(ActivityRepository activityRepo) {
        this.activityRepo = activityRepo;
    }

    @GetMapping
    public List<Activity> list(Authentication auth) {
        Long userId = Long.parseLong(auth.getPrincipal().toString());
        return activityRepo.findByUserId(userId);
    }
}
