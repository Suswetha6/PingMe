package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.sendgrid.SendGrid;

@Configuration
public class SendGridConfig {
    
    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;
    
    @Bean
    public SendGrid sendGrid() {
        return new SendGrid(sendGridApiKey);
    }
} 