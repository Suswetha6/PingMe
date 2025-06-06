package com.example.demo.controller;

import com.example.demo.dto.EventRequest ; 
import com.example.demo.entity.Event;
import com.example.demo.entity.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findByIsActiveTrueOrderByEventDateTimeAsc();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello,secured world") ; 
    }

    @GetMapping("/today")
    public ResponseEntity<List<Event>> getTodayEvents() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        
        List<Event> events = eventRepository.findActiveEventsBetweenDates(startOfDay, endOfDay);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        List<Event> events = eventRepository.findUpcomingEvents(LocalDateTime.now());
        return ResponseEntity.ok(events);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('FACULTY', 'ADMIN')")
    public ResponseEntity<?> createEvent(@RequestBody EventRequest request, Authentication auth) {
        try {
            // Get the current user
            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Create event
            Event event = new Event();
            event.setTitle(request.getTitle());
            event.setDescription(request.getDescription());
            event.setType(Event.EventType.valueOf(request.getType()));
            event.setEventDateTime(LocalDateTime.parse(request.getEventDateTime()));
            event.setCourseCode(request.getCourseCode());
            event.setClassroom(request.getClassroom());
            event.setCreatedBy(user);

            // Save event
            Event savedEvent = eventRepository.save(event);

            // Send notifications asynchronously
            // notificationService.sendNotificationToAllUsers(savedEvent);

            return ResponseEntity.ok(savedEvent);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to create event.");
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('FACULTY', 'ADMIN') or @eventSecurity.isOwner(#id, authentication.name)")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody EventRequest request, Authentication auth) {
        try {
            Event event = eventRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            // Update event
            event.setTitle(request.getTitle());
            event.setDescription(request.getDescription());
            event.setType(Event.EventType.valueOf(request.getType()));
            event.setEventDateTime(LocalDateTime.parse(request.getEventDateTime()));
            event.setCourseCode(request.getCourseCode());
            event.setClassroom(request.getClassroom());

            Event updatedEvent = eventRepository.save(event);

            // Send update notifications
            // notificationService.sendNotificationToAllUsers(updatedEvent);

            return ResponseEntity.ok(updatedEvent);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to update event.");
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('FACULTY', 'ADMIN') or @eventSecurity.isOwner(#id, authentication.name)")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id, Authentication auth) {
        try {
            Event event = eventRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            // Soft delete
            event.setActive(false);
            eventRepository.save(event);

            return ResponseEntity.ok("Event deleted successfully");
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to delete event.");
        }
    }
}