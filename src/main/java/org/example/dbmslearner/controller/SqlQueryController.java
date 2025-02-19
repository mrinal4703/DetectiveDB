package org.example.dbmslearner.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sql")
public class SqlQueryController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/execute")
    public Map<String, Object> executeQuery(@RequestParam String query) {
        if (isUnsafeQuery(query)) {
            return Map.of("error", "Unsafe query detected. Only SELECT queries are allowed.");
        }

        try {
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query);
            if (result.isEmpty()) {
                return Map.of("message", "No data found.");
            }
            return Map.of("success", true, "data", result);
        } catch (Exception e) {
            return Map.of("error", "SQL Error: " + e.getMessage());
        }
    }

    private boolean isUnsafeQuery(String sqlQuery) {
        String lowerCaseQuery = sqlQuery.trim().toLowerCase();
        return lowerCaseQuery.startsWith("delete") ||
                lowerCaseQuery.startsWith("drop") ||
                lowerCaseQuery.startsWith("update") ||
                lowerCaseQuery.startsWith("insert") ||
                lowerCaseQuery.startsWith("alter") ||
                lowerCaseQuery.contains(";") ||
                lowerCaseQuery.contains("select * from gamers") ||
                lowerCaseQuery.contains("--");
    }
}
