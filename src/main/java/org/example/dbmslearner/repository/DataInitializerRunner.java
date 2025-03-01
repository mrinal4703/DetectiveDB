package org.example.dbmslearner.repository;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DataInitializerRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Use RestTemplate to make a POST request to the /api/initialize/data endpoint
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8085/api/initialize/data";
        String response = restTemplate.postForObject(url, null, String.class);

        System.out.println("Data initialization response: " + response);
    }
}