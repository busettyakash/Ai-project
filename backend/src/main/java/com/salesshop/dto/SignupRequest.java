package com.salesshop.dto;

public class SignupRequest {
    private String name;
    private String email;
    private String shopName;
    private String gstNumber;
    private String password;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
