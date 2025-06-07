package com.example.demo.service;

import com.example.demo.entity.Event;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EventService {
    
    private final EventRepository eventRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    
    public EventService(EventRepository eventRepository, 
                       EmailService emailService,
                       UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }
    
    public Event createEvent(Event event) {
        Event savedEvent = eventRepository.save(event);
        
        // Send notifications to all users
        userRepository.findAll().forEach(user -> {
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
            
            emailService.sendEmail(user.getEmail(), subject, content);
        });
        
        return savedEvent;
    }
    
   
} 