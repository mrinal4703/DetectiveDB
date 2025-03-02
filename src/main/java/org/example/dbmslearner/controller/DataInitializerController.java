package org.example.dbmslearner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/initialize")
public class DataInitializerController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/data")
    public String initializeData() {
        // Check if data already exists
        if (isDataAlreadyInitialized()) {
            return "Data already initialized!";
        }

        insertPersons();
        insertPersonRooms();
        insertWitnessStatements();
        insertLocations();
        insertCameras();
        insertEmployees();
        insertProjects();

        return "Data initialization completed!";
    }

    private boolean isDataAlreadyInitialized() {
        String checkPersonsSql = "SELECT COUNT(*) FROM persons";
        String checkPersonRoomsSql = "SELECT COUNT(*) FROM personrooms";
        String checkWitnessStatementsSql = "SELECT COUNT(*) FROM witnessstatements";
        String checkLocationsSql = "SELECT COUNT(*) FROM locations";
        String checkCamerasSql = "SELECT COUNT(*) FROM camera";
        String checkEmployeesSql = "SELECT COUNT(*) FROM employees";
        String checkProjectsSql = "SELECT COUNT(*) FROM projects";

        int personsCount = jdbcTemplate.queryForObject(checkPersonsSql, Integer.class);
        int personRoomsCount = jdbcTemplate.queryForObject(checkPersonRoomsSql, Integer.class);
        int witnessStatementsCount = jdbcTemplate.queryForObject(checkWitnessStatementsSql, Integer.class);
        int locationsCount = jdbcTemplate.queryForObject(checkLocationsSql, Integer.class);
        int camerasCount = jdbcTemplate.queryForObject(checkCamerasSql, Integer.class);
        int employeesCount = jdbcTemplate.queryForObject(checkEmployeesSql, Integer.class);
        int projectsCount = jdbcTemplate.queryForObject(checkProjectsSql, Integer.class);

        return personsCount > 0 || personRoomsCount > 0 || witnessStatementsCount > 0 || locationsCount > 0
                || camerasCount > 0 || employeesCount > 0 || projectsCount > 0;
    }

    private void insertPersons() {
        String sql = "INSERT IGNORE INTO persons (person_name, location, action) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Alice", "Living Room", "Watching TV");
        jdbcTemplate.update(sql, "Bob", "Kitchen", "Cooking");
        jdbcTemplate.update(sql, "Charlie", "Bedroom", "Sleeping");
        jdbcTemplate.update(sql, "Diana", "Bathroom", "Showering");
        jdbcTemplate.update(sql, "Eve", "Study Room", "Reading");
        jdbcTemplate.update(sql, "Frank", "Fruit Shop", "Buying fruits");
        jdbcTemplate.update(sql, "Grace", "Lawn", "Gardening");
        jdbcTemplate.update(sql, "Hank", "Living Room", "Talking on phone");
        jdbcTemplate.update(sql, "Ivy", "Kitchen", "Eating");
        jdbcTemplate.update(sql, "Jack", "Bedroom", "Playing games");
        jdbcTemplate.update(sql, "Karen", "Bathroom", "Brushing teeth");
        jdbcTemplate.update(sql, "Leo", "Study Room", "Writing");
        jdbcTemplate.update(sql, "Mona", "Fruit Shop", "Selling fruits");
        jdbcTemplate.update(sql, "Nina", "Lawn", "Watering plants");
        jdbcTemplate.update(sql, "Oscar", "Living Room", "Listening to music");
    }

    private void insertPersonRooms() {
        String sql = "INSERT IGNORE INTO personrooms (person_name, room_type, room_contents) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Alice", "Lounge", "Sofa, TV, Coffee Table");
        jdbcTemplate.update(sql, "Bob", "Pantry", "Refrigerator, Oven, Sink");
        jdbcTemplate.update(sql, "Charlie", "Master Bedroom", "Bed, Wardrobe, Desk");
        jdbcTemplate.update(sql, "Diana", "Guest Bathroom", "Shower, Toilet, Sink");
        jdbcTemplate.update(sql, "Eve", "Library", "Bookshelf, Desk, Computer");
        jdbcTemplate.update(sql, "Frank", "Store", "Fruits, Cash Register");
        jdbcTemplate.update(sql, "Grace", "Garden", "Grass, Plants, Garden Tools");
        jdbcTemplate.update(sql, "Hank", "Lounge", "Sofa, TV, Coffee Table");
        jdbcTemplate.update(sql, "Ivy", "Pantry", "Refrigerator, Oven, Sink");
        jdbcTemplate.update(sql, "Jack", "Master Bedroom", "Bed, Wardrobe, Desk");
        jdbcTemplate.update(sql, "Karen", "Guest Bathroom", "Shower, Toilet, Sink");
        jdbcTemplate.update(sql, "Leo", "Library", "Bookshelf, Desk, Computer");
        jdbcTemplate.update(sql, "Mona", "Store", "Fruits, Cash Register");
        jdbcTemplate.update(sql, "Nina", "Garden", "Grass, Plants, Garden Tools");
        jdbcTemplate.update(sql, "Oscar", "Lounge", "Sofa, TV, Coffee Table");
    }

    private void insertWitnessStatements() {
        String sql = "INSERT IGNORE INTO witnessstatements (room_type, time, statement) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Lounge", "2023-10-01 10:00:00", "Saw someone suspicious near the TV.");
        jdbcTemplate.update(sql, "Pantry", "2023-10-01 10:05:00", "Heard noises from the fridge.");
        jdbcTemplate.update(sql, "Master Bedroom", "2023-10-01 10:10:00", "Found the window open.");
        jdbcTemplate.update(sql, "Guest Bathroom", "2023-10-01 10:15:00", "Noticed water on the floor.");
        jdbcTemplate.update(sql, "Library", "2023-10-01 10:20:00", "Saw someone looking through the books.");
        jdbcTemplate.update(sql, "Store", "2023-10-01 10:25:00", "Noticed missing fruits.");
        jdbcTemplate.update(sql, "Garden", "2023-10-01 10:30:00", "Saw footprints leading to the house.");
    }

    private void insertLocations() {
        String sql = "INSERT IGNORE INTO locations (location, camera_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, "Living Room", 1);
        jdbcTemplate.update(sql, "Kitchen", 2);
        jdbcTemplate.update(sql, "Bedroom", 3);
        jdbcTemplate.update(sql, "Bathroom", 4);
        jdbcTemplate.update(sql, "Study Room", 5);
        jdbcTemplate.update(sql, "Fruit Shop", 6);
        jdbcTemplate.update(sql, "Lawn", 7);
    }

    private void insertCameras() {
        String sql = "INSERT IGNORE INTO camera (camera_id, status, footage) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, 1, "Working", "Footage of suspicious activity");
        jdbcTemplate.update(sql, 2, "Not Working", "No footage available");
        jdbcTemplate.update(sql, 3, "Working", "Footage of open window");
        jdbcTemplate.update(sql, 4, "Working", "Footage of water on floor");
        jdbcTemplate.update(sql, 5, "Not Working", "No footage available");
        jdbcTemplate.update(sql, 6, "Working", "Footage of missing fruits");
        jdbcTemplate.update(sql, 7, "Working", "Footage of footprints");
    }

    private void insertEmployees() {
        String sql = "INSERT IGNORE INTO employees (employee_id, first_name, last_name, department, position, salary, age, joining_date, performance_rating, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, 1, "John", "Doe", "IT", "Developer", 60000, 28, "2019-05-10", 4, "true");
        jdbcTemplate.update(sql, 2, "Jane", "Smith", "HR", "Manager", 75000, 35, "2018-08-21", 5, "true");
        jdbcTemplate.update(sql, 3, "Mike", "Johnson", "IT", "Developer", 58000, 26, "2020-03-15", 3, "true");
        jdbcTemplate.update(sql, 4, "Emily", "Brown", "Finance", "Analyst", 67000, 30, "2017-11-30", 4, "false");
        jdbcTemplate.update(sql, 5, "Chris", "Wilson", "IT", "Tester", 50000, 24, "2021-06-20", 3, "true");
        jdbcTemplate.update(sql, 6, "Sarah", "Miller", "Marketing", "Executive", 62000, 29, "2019-09-10", 4, "true");
        jdbcTemplate.update(sql, 7, "David", "Lee", "Finance", "Manager", 80000, 40, "2016-04-25", 5, "true");
        jdbcTemplate.update(sql, 8, "Anna", "Garcia", "HR", "Assistant", 48000, 23, "2022-01-15", 3, "true");
        jdbcTemplate.update(sql, 9, "James", "Martinez", "Marketing", "Manager", 78000, 38, "2015-12-05", 4, "true");
        jdbcTemplate.update(sql, 10, "Sophia", "Taylor", "IT", "Developer", 62000, 27, "2019-07-30", 4, "false");
    }

    private void insertProjects() {
        String sql = "INSERT IGNORE INTO projects (project_id, project_name, department, start_date, end_date, budget) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, 1, "Project Alpha", "IT", "2021-01-15", "2022-06-30", 150000);
        jdbcTemplate.update(sql, 2, "HR Revamp", "HR", "2020-05-10", "2021-09-20", 80000);
        jdbcTemplate.update(sql, 3, "Finance Tracker", "Finance", "2019-03-01", "2021-12-31", 120000);
        jdbcTemplate.update(sql, 4, "Marketing Blitz", "Marketing", "2022-01-01", "2023-07-15", 95000);
        jdbcTemplate.update(sql, 5, "Cloud Migration", "IT", "2018-09-01", "2020-12-31", 200000);
        jdbcTemplate.update(sql, 6, "Compliance Update", "Finance", "2021-04-10", "2022-10-01", 110000);
    }
}
