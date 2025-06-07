package com.example.demo.controller;

import com.example.demo.dto.EventRequest;
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

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Autowired
    public EventController(EventRepository eventRepository,
                         UserRepository userRepository,
                         NotificationService notificationService) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findByIsActiveTrueOrderByEventDateTimeAsc();
        return ResponseEntity.ok(events);
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
            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Event event = new Event();
            event.setTitle(request.getTitle());
            event.setDescription(request.getDescription());
            event.setType(Event.EventType.valueOf(request.getType()));
            event.setEventDateTime(LocalDateTime.parse(request.getEventDateTime()));
            event.setCourseCode(request.getCourseCode());
            event.setClassroom(request.getClassroom());
            event.setCreatedBy(user);

            Event savedEvent = eventRepository.save(event);
            notificationService.sendNotificationToAllUsers(savedEvent);

            return ResponseEntity.ok(savedEvent);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create event.");
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('FACULTY', 'ADMIN') or @eventSecurity.isOwner(#id, authentication.name)")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody EventRequest request, Authentication auth) {
        try {
            Event event = eventRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            event.setTitle(request.getTitle());
            event.setDescription(request.getDescription());
            event.setType(Event.EventType.valueOf(request.getType()));
            event.setEventDateTime(LocalDateTime.parse(request.getEventDateTime()));
            event.setCourseCode(request.getCourseCode());
            event.setClassroom(request.getClassroom());

            Event updatedEvent = eventRepository.save(event);
            return ResponseEntity.ok(updatedEvent);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update event.");
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN') or @eventSecurity.isOwner(#id, authentication.name)")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id, Authentication auth) {
        try {
            Event event = eventRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Event not found"));
            event.setActive(false);
            eventRepository.save(event);
            return ResponseEntity.ok("Event deleted successfully");
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete event.");
        }
    }
}