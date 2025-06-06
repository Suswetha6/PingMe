package com.example.demo.security;

import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("eventSecurity")
public class EventSecurity {

    @Autowired
    private EventRepository eventRepository;

    public boolean isOwner(Long eventId, String username) {
        return eventRepository.findById(eventId)
                .map(event -> event.getCreatedBy() != null && event.getCreatedBy().getEmail().equals(username))
                .orElse(false);
    }
} 