package com.example.demo.service;

import com.example.demo.entity.Event;
import com.example.demo.entity.Notification;
import com.example.demo.entity.User;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NotificationService {
    
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    
    public NotificationService(NotificationRepository notificationRepository,
                             UserRepository userRepository,
                             EmailService emailService) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    public void sendNotificationToAllUsers(Event event) {
        List<User> users = userRepository.findAll();
        System.out.println("Found " + users.size() + " users to notify"); // Debug log
        
        for (User user : users) {
            System.out.println("Sending notification to user: " + user.getEmail()); // Debug log
            
            // Create notification record
            Notification notification = new Notification(
                user,
                event,
                "New event: " + event.getTitle(),
                Notification.NotificationChannel.EMAIL
            );
            notificationRepository.save(notification);
            
            // Send email
            String subject = "New Event: " + event.getTitle();
            String content = String.format(
                "<h2>New Event Created</h2>" +
                "<p><strong>Title:</strong> %s</p>" +
                "<p><strong>Date:</strong> %s</p>" +
                "<p><strong>Location:</strong> %s</p>" +
                "<p><strong>Description:</strong> %s</p>",
                event.getTitle(),
                event.getEventDateTime(),
                event.getClassroom(),
                event.getDescription()
            );
            
            try {
                emailService.sendEmail(user.getEmail(), subject, content);
                System.out.println("Email sent successfully to: " + user.getEmail()); // Debug log
            } catch (Exception e) {
                System.out.println("Failed to send email to: " + user.getEmail() + " Error: " + e.getMessage()); // Debug log
                e.printStackTrace();
            }
        }
    }
} 