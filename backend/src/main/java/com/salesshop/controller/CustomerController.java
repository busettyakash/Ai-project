package com.salesshop.controller;

import com.salesshop.entity.Customer;
import com.salesshop.entity.User;
import com.salesshop.repository.CustomerRepository;
import com.salesshop.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository customerRepo;
    private final UserRepository userRepo;

    public CustomerController(CustomerRepository customerRepo, UserRepository userRepo) {
        this.customerRepo = customerRepo;
        this.userRepo = userRepo;
    }

    private Long userId(Authentication auth) {
        return Long.parseLong(auth.getPrincipal().toString());
    }

    @GetMapping
    public List<Customer> list(Authentication auth) {
        return customerRepo.findByUserId(userId(auth));
    }

    @PostMapping
    public ResponseEntity<?> create(Authentication auth, @RequestBody Map<String, String> body) {
        User user = userRepo.findById(userId(auth)).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));

        Customer c = new Customer();
        c.setName(body.getOrDefault("name", ""));
        c.setEmail(body.getOrDefault("email", ""));
        c.setPhone(body.getOrDefault("phone", ""));
        c.setCompany(body.getOrDefault("company", ""));
        c.setUser(user);
        return ResponseEntity.ok(customerRepo.save(c));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(Authentication auth, @PathVariable Long id, @RequestBody Map<String, String> body) {
        Customer c = customerRepo.findById(id).orElse(null);
        if (c == null || !c.getUser().getId().equals(userId(auth)))
            return ResponseEntity.notFound().build();

        if (body.containsKey("name"))
            c.setName(body.get("name"));
        if (body.containsKey("email"))
            c.setEmail(body.get("email"));
        if (body.containsKey("phone"))
            c.setPhone(body.get("phone"));
        if (body.containsKey("company"))
            c.setCompany(body.get("company"));
        return ResponseEntity.ok(customerRepo.save(c));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Authentication auth, @PathVariable Long id) {
        Customer c = customerRepo.findById(id).orElse(null);
        if (c == null || !c.getUser().getId().equals(userId(auth)))
            return ResponseEntity.notFound().build();
        customerRepo.delete(c);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
