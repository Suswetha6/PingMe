package com.example.demo.dto;

public class RegisterRequest {
  private String email;
  private String password;
  private String fullName;
  private String studentId;
  private String phoneNumber;

  public RegisterRequest() {}

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }

  public String getFullName() { return fullName; }
  public void setFullName(String fullName) { this.fullName = fullName; }

  public String getStudentId() { return studentId; }
  public void setStudentId(String studentId) { this.studentId = studentId; }

  public String getPhoneNumber() { return phoneNumber; }
  public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
}
