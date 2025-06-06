package com.example.demo.repository ;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByStudentId(String studentId);
    
    boolean existsByEmail(String email);
    
    boolean existsByStudentId(String studentId);
    
    List<User> findByRole(User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.emailNotifications = true")
    List<User> findUsersWithEmailNotificationsEnabled();
    
    @Query("SELECT u FROM User u WHERE u.smsNotifications = true AND u.phoneNumber IS NOT NULL")
    List<User> findUsersWithSmsNotificationsEnabled();
}