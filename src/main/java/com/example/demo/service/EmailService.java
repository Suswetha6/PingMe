package com.example.demo.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {
    
    private final SendGrid sendGrid;
    
    @Value("${sendgrid.from.email}")
    private String fromEmail;
    
    public EmailService(SendGrid sendGrid) {
        this.sendGrid = sendGrid;
    }
    
    public void sendEmail(String to, String subject, String content) {
        try {
            System.out.println("Attempting to send email to: " + to); // Debug log
            System.out.println("From email: " + fromEmail); // Debug log
            
            Email from = new Email(fromEmail);
            Email toEmail = new Email(to);
            Content emailContent = new Content("text/html", content);
            
            Mail mail = new Mail(from, subject, toEmail, emailContent);
            
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            
            Response response = sendGrid.api(request);
            
            System.out.println("SendGrid Response Status: " + response.getStatusCode()); // Debug log
            System.out.println("SendGrid Response Body: " + response.getBody()); // Debug log
            
            if (response.getStatusCode() >= 400) {
                System.err.println("Failed to send email. Status code: " + response.getStatusCode());
                System.err.println("Response body: " + response.getBody());
            }
            
        } catch (IOException e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }
} 