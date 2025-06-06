package com.example.demo.dto  ;

public class EventRequest {
  private String title;
  private String description;
  private String type;
  private String eventDateTime;
  private String courseCode;
  private String classroom;

  public EventRequest() {}

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }

  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }

  public String getType() { return type; }
  public void setType(String type) { this.type = type; }

  public String getEventDateTime() { return eventDateTime; }
  public void setEventDateTime(String eventDateTime) { this.eventDateTime = eventDateTime; }

  public String getCourseCode() { return courseCode; }
  public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

  public String getClassroom() { return classroom; }
  public void setClassroom(String classroom) { this.classroom = classroom; }
}