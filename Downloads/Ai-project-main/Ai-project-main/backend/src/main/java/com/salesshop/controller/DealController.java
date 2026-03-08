package com.salesshop.controller;

import com.salesshop.entity.Customer;
import com.salesshop.entity.Deal;
import com.salesshop.entity.User;
import com.salesshop.repository.CustomerRepository;
import com.salesshop.repository.DealRepository;
import com.salesshop.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    private final DealRepository dealRepo;
    private final CustomerRepository customerRepo;
    private final UserRepository userRepo;

    public DealController(DealRepository dealRepo, CustomerRepository customerRepo, UserRepository userRepo) {
        this.dealRepo = dealRepo;
        this.customerRepo = customerRepo;
        this.userRepo = userRepo;
    }

    private Long userId(Authentication auth) {
        return Long.parseLong(auth.getPrincipal().toString());
    }

    @GetMapping
    public List<Deal> list(Authentication auth) {
        return dealRepo.findByUserId(userId(auth));
    }

    @PostMapping
    public ResponseEntity<?> create(Authentication auth, @RequestBody Map<String, String> body) {
        User user = userRepo.findById(userId(auth)).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));

        Long customerId = Long.parseLong(body.getOrDefault("customerId", "0"));
        Customer customer = customerRepo.findById(customerId).orElse(null);
        if (customer == null || !customer.getUser().getId().equals(userId(auth)))
            return ResponseEntity.badRequest().body(Map.of("error", "Customer not found"));

        Deal d = new Deal();
        d.setTitle(body.getOrDefault("title", ""));
        d.setValue(new BigDecimal(body.getOrDefault("value", "0")));
        d.setStage(body.getOrDefault("stage", "PROSPECT"));
        d.setCustomer(customer);
        d.setUser(user);
        return ResponseEntity.ok(dealRepo.save(d));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(Authentication auth, @PathVariable Long id, @RequestBody Map<String, String> body) {
        Deal d = dealRepo.findById(id).orElse(null);
        if (d == null || !d.getUser().getId().equals(userId(auth)))
            return ResponseEntity.notFound().build();

        if (body.containsKey("title"))
            d.setTitle(body.get("title"));
        if (body.containsKey("value"))
            d.setValue(new BigDecimal(body.get("value")));
        if (body.containsKey("stage"))
            d.setStage(body.get("stage"));
        return ResponseEntity.ok(dealRepo.save(d));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Authentication auth, @PathVariable Long id) {
        Deal d = dealRepo.findById(id).orElse(null);
        if (d == null || !d.getUser().getId().equals(userId(auth)))
            return ResponseEntity.notFound().build();
        dealRepo.delete(d);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
