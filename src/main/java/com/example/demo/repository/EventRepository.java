package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Event;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByIsActiveTrueOrderByEventDateTimeAsc();
    
    List<Event> findByTypeAndIsActiveTrueOrderByEventDateTimeAsc(Event.EventType type);
    
    @Query("SELECT e FROM Event e WHERE e.isActive = true AND e.eventDateTime >= :startDate AND e.eventDateTime <= :endDate ORDER BY e.eventDateTime ASC")
    List<Event> findActiveEventsBetweenDates(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT e FROM Event e WHERE e.isActive = true AND e.eventDateTime >= :today ORDER BY e.eventDateTime ASC")
    List<Event> findUpcomingEvents(@Param("today") LocalDateTime today);
    
    @Query("SELECT e FROM Event e WHERE e.isActive = true AND DATE(e.eventDateTime) = DATE(:date) ORDER BY e.eventDateTime ASC")
    List<Event> findEventsByDate(@Param("date") LocalDateTime date);
    
    List<Event> findByCourseCodeAndIsActiveTrueOrderByEventDateTimeAsc(String courseCode);
    
    @Query("SELECT e FROM Event e WHERE e.isActive = true AND e.eventDateTime BETWEEN :start AND :end ORDER BY e.eventDateTime ASC")
    List<Event> findEventsForDeadlineReminder(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}