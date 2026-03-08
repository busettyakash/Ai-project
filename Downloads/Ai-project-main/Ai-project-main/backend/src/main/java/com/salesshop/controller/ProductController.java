package com.salesshop.controller;

import com.salesshop.entity.Product;
import com.salesshop.entity.User;
import com.salesshop.repository.ProductRepository;
import com.salesshop.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public ProductController(ProductRepository productRepo, UserRepository userRepo) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    private Long userId(Authentication auth) {
        return Long.parseLong(auth.getPrincipal().toString());
    }

    @GetMapping
    public List<Product> list(Authentication auth) {
        return productRepo.findByUserId(userId(auth));
    }

    @PostMapping
    public ResponseEntity<?> create(Authentication auth, @RequestBody Map<String, String> body) {
        User user = userRepo.findById(userId(auth)).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));

        Product p = new Product();
        p.setName(body.getOrDefault("name", ""));
        p.setDescription(body.getOrDefault("description", ""));
        p.setPrice(new BigDecimal(body.getOrDefault("price", "0")));
        String sku = body.getOrDefault("sku", "");
        if (sku.isEmpty()) {
            sku = "SKU-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
        p.setSku(sku);
        p.setStockQuantity(Integer.parseInt(body.getOrDefault("stockQuantity", "0")));
        p.setUser(user);
        return ResponseEntity.ok(productRepo.save(p));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(Authentication auth, @PathVariable Long id, @RequestBody Map<String, String> body) {
        Product p = productRepo.findById(id).orElse(null);
        if (p == null || !p.getUser().getId().equals(userId(auth)))
            return ResponseEntity.notFound().build();

        if (body.containsKey("name"))
            p.setName(body.get("name"));
        if (body.containsKey("description"))
            p.setDescription(body.get("description"));
        if (body.containsKey("price"))
            p.setPrice(new BigDecimal(body.get("price")));
        if (body.containsKey("sku"))
            p.setSku(body.get("sku"));
        if (body.containsKey("stockQuantity"))
            p.setStockQuantity(Integer.parseInt(body.get("stockQuantity")));
        return ResponseEntity.ok(productRepo.save(p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Authentication auth, @PathVariable Long id) {
        Product p = productRepo.findById(id).orElse(null);
        if (p == null || !p.getUser().getId().equals(userId(auth)))
            return ResponseEntity.notFound().build();
        productRepo.delete(p);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
