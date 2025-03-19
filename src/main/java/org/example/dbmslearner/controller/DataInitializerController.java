package org.example.dbmslearner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/initialize")
public class DataInitializerController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/data")
    public String initializeData() {
        Map<String, Boolean> tableStatus = getTableStatus();

        if (!tableStatus.containsValue(true)) {
            return "Data is already initialized for all tables!";
        }

        if (tableStatus.get("persons")) insertPersons();
        if (tableStatus.get("personrooms")) insertPersonRooms();
        if (tableStatus.get("witnessstatements")) insertWitnessStatements();
        if (tableStatus.get("locations")) insertLocations();
        if (tableStatus.get("camera")) insertCameras();
        if (tableStatus.get("employees")) insertEmployees();
        if (tableStatus.get("projects")) insertProjects();
        if (tableStatus.get("witness_reports")) insertWitnessReports();
        if (tableStatus.get("vehicle_sightings")) insertVehicleSightings();
        if (tableStatus.get("vehicle_details")) insertVehicleDetails();
        if (tableStatus.get("suspects_murder")) insertSupects();
        if (tableStatus.get("criminal_history")) insertCriminalHistory();
        if (tableStatus.get("incident_info")) insertIncidentInfo();
        if (tableStatus.get("damage_type")) insertDamageType();
        if (tableStatus.get("motive_info")) insertMotiveInfo();
        if (tableStatus.get("car_info")) insertCarInfo();
        if (tableStatus.get("crime_scene")) insertCrimeScene();
        if (tableStatus.get("weapon_analysis")) insertWeaponAnalysis();
        if (tableStatus.get("suspect_alibi")) insertSuspectAlibi();
        if (tableStatus.get("evidence")) insertEvidence();
        if (tableStatus.get("suspects_vandalism")) insertSuspect();
        if (tableStatus.get("suspects_kidnap")) insertSuspects();

        return "Data initialization completed!";
    }

    private Map<String, Boolean> getTableStatus() {
        Map<String, Boolean> tableStatus = new HashMap<>();

        tableStatus.put("persons", checkTableEmpty("persons"));
        tableStatus.put("personrooms", checkTableEmpty("personrooms"));
        tableStatus.put("witnessstatements", checkTableEmpty("witnessstatements"));
        tableStatus.put("locations", checkTableEmpty("locations"));
        tableStatus.put("camera", checkTableEmpty("camera"));
        tableStatus.put("employees", checkTableEmpty("employees"));
        tableStatus.put("projects", checkTableEmpty("projects"));
        tableStatus.put("witness_reports", checkTableEmpty("witness_reports"));
        tableStatus.put("vehicle_sightings", checkTableEmpty("vehicle_sightings"));
        tableStatus.put("vehicle_details", checkTableEmpty("vehicle_details"));
        tableStatus.put("suspects_murder", checkTableEmpty("suspects_murder"));
        tableStatus.put("criminal_history", checkTableEmpty("criminal_history"));
        tableStatus.put("incident_info", checkTableEmpty("incident_info"));
        tableStatus.put("damage_type", checkTableEmpty("damage_type"));
        tableStatus.put("motive_info", checkTableEmpty("motive_info"));
        tableStatus.put("car_info", checkTableEmpty("car_info"));
        tableStatus.put("crime_scene", checkTableEmpty("crime_scene"));
        tableStatus.put("weapon_analysis", checkTableEmpty("weapon_analysis"));
        tableStatus.put("suspect_alibi", checkTableEmpty("suspect_alibi"));
        tableStatus.put("evidence", checkTableEmpty("evidence"));
        tableStatus.put("suspects_vandalism", checkTableEmpty("suspects_vandalism"));
        tableStatus.put("suspects_kidnap", checkTableEmpty("suspects_kidnap"));

        return tableStatus;
    }

//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    @PostMapping("/data")
//    public String initializeData() {
//        // Check if data already exists
//        if (isDataAlreadyInitialized()) {
//            return "Data already initialized!";
//        }
//
//        insertPersons();
//        insertPersonRooms();
//        insertWitnessStatements();
//        insertLocations();
//        insertCameras();
//        insertEmployees();
//        insertProjects();
//
//        insertWitnessStatements();
//        insertVehicleSightings();
//        insertVehicleDetails();
//        insertSuspects();
//        insertCriminalHistory();
//        insertIncidentInfo();
//        insertDamageType();
//        insertMotiveInfo();
//        insertCarInfo();
//        insertCrimeScene();
//        insertWeaponAnalysis();
//        insertSuspectAlibi();
//        insertEvidence();
//        insertSupects();
//        insertSuspect();
//
//        return "Data initialization completed!";
//    }
//
//    private boolean isDataAlreadyInitialized() {
//        String checkPersonsSql = "SELECT COUNT(*) FROM persons";
//        String checkPersonRoomsSql = "SELECT COUNT(*) FROM personrooms";
//        String checkWitnessStatementsSql = "SELECT COUNT(*) FROM witnessstatements";
//        String checkLocationsSql = "SELECT COUNT(*) FROM locations";
//        String checkCamerasSql = "SELECT COUNT(*) FROM camera";
//        String checkEmployeesSql = "SELECT COUNT(*) FROM employees";
//        String checkProjectsSql = "SELECT COUNT(*) FROM projects";
//        String checkWitnessReportsSql = "SELECT COUNT(*) FROM witness_reports";
//        String checkVehicleSightingsSql = "SELECT COUNT(*) FROM vehicle_sightings";
//        String checkVehicleDetailsSql = "SELECT COUNT(*) FROM vehicle_details";
//        String checkSuspectsMurderSql = "SELECT COUNT(*) FROM suspects_murder";
//        String checkCriminalHistorySql = "SELECT COUNT(*) FROM criminal_history";
//        String checkIncidentInfoSql = "SELECT COUNT(*) FROM incident_info";
//        String checkDamageTypeSql = "SELECT COUNT(*) FROM damage_type";
//        String checkMotiveInfoSql = "SELECT COUNT(*) FROM motive_info";
//        String checkCarInfoSql = "SELECT COUNT(*) FROM car_info";
//        String checkCrimeSceneSql = "SELECT COUNT(*) FROM crime_scene";
//        String checkWeaponAnalysisSql = "SELECT COUNT(*) FROM weapon_analysis";
//        String checkSuspectAlibiSql = "SELECT COUNT(*) FROM suspect_alibi";
//        String checkEvidenceSql = "SELECT COUNT(*) FROM evidence";
//        String checkSuspectsVandalismSql = "SELECT COUNT(*) FROM suspects_vandalism";
//        String checkSuspectsKidnapSql = "SELECT COUNT(*) FROM suspects_kidnap";
//
//        int personsCount = jdbcTemplate.queryForObject(checkPersonsSql, Integer.class);
//        int personRoomsCount = jdbcTemplate.queryForObject(checkPersonRoomsSql, Integer.class);
//        int witnessStatementsCount = jdbcTemplate.queryForObject(checkWitnessStatementsSql, Integer.class);
//        int locationsCount = jdbcTemplate.queryForObject(checkLocationsSql, Integer.class);
//        int camerasCount = jdbcTemplate.queryForObject(checkCamerasSql, Integer.class);
//        int employeesCount = jdbcTemplate.queryForObject(checkEmployeesSql, Integer.class);
//        int projectsCount = jdbcTemplate.queryForObject(checkProjectsSql, Integer.class);
//        int witnessReportsCount = jdbcTemplate.queryForObject(checkWitnessReportsSql, Integer.class);
//        int vehicleSightingsCount = jdbcTemplate.queryForObject(checkVehicleSightingsSql, Integer.class);
//        int vehicleDetailsCount = jdbcTemplate.queryForObject(checkVehicleDetailsSql, Integer.class);
//        int suspectsMurderCount = jdbcTemplate.queryForObject(checkSuspectsMurderSql, Integer.class);
//        int criminalHistoryCount = jdbcTemplate.queryForObject(checkCriminalHistorySql, Integer.class);
//        int incidentInfoCount = jdbcTemplate.queryForObject(checkIncidentInfoSql, Integer.class);
//        int damageTypeCount = jdbcTemplate.queryForObject(checkDamageTypeSql, Integer.class);
//        int motiveInfoCount = jdbcTemplate.queryForObject(checkMotiveInfoSql, Integer.class);
//        int carInfoCount = jdbcTemplate.queryForObject(checkCarInfoSql, Integer.class);
//        int crimeSceneCount = jdbcTemplate.queryForObject(checkCrimeSceneSql, Integer.class);
//        int weaponAnalysisCount = jdbcTemplate.queryForObject(checkWeaponAnalysisSql, Integer.class);
//        int suspectAlibiCount = jdbcTemplate.queryForObject(checkSuspectAlibiSql, Integer.class);
//        int evidenceCount = jdbcTemplate.queryForObject(checkEvidenceSql, Integer.class);
//        int suspectsVandalismCount = jdbcTemplate.queryForObject(checkSuspectsVandalismSql, Integer.class);
//        int suspectsKidnapCount = jdbcTemplate.queryForObject(checkSuspectsKidnapSql, Integer.class);
//
//        return personsCount > 0 || personRoomsCount > 0 || witnessStatementsCount > 0 || locationsCount > 0
//                || camerasCount > 0 || employeesCount > 0 || projectsCount > 0 || witnessReportsCount > 0 ||
//                vehicleSightingsCount > 0 || vehicleDetailsCount > 0 || suspectsMurderCount > 0
//                || suspectsVandalismCount > 0 || suspectsKidnapCount > 0
//                || criminalHistoryCount > 0 || incidentInfoCount > 0 || damageTypeCount > 0 || motiveInfoCount > 0
//                || carInfoCount > 0 || crimeSceneCount > 0 || weaponAnalysisCount > 0 || suspectAlibiCount > 0
//                || evidenceCount > 0;
//    }

    private boolean checkTableEmpty(String tableName) {
        String sql = "SELECT COUNT(*) FROM " + tableName;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count == 0;  // True if the table is empty
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

    private void insertWitnessReports() {
        String sql = "INSERT IGNORE INTO witness_reports (last_location, time, witness_statement) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "City Park", "2025-03-15 21:30", "Saw a dark van near the park, someone struggling inside");
        jdbcTemplate.update(sql, "City Park", "2025-03-15 21:30", "Heard muffled screams coming from the van");
        jdbcTemplate.update(sql, "City Park", "2025-03-15 21:30", "A man in a hoodie rushed into the van and drove away");
    }

    private void insertVehicleSightings() {
        String sql = "INSERT IGNORE INTO vehicle_sightings (last_location, vehicle_spotted, license_plate) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "City Park", "Black Van", "AXZ-5124");
    }

    private void insertVehicleDetails() {
        String sql = "INSERT IGNORE INTO vehicle_details (vehicle_spotted, vehicle_owner, vehicle_type) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Black Van", "Daniel", "Van");
    }

    private void insertSuspects() {
        String sql = "INSERT IGNORE INTO suspects_kidnap (time, suspect_name) VALUES (?, ?)";
        jdbcTemplate.update(sql, "2025-03-15 21:30", "Jake");
        jdbcTemplate.update(sql, "2025-03-15 21:30", "Martin");
        jdbcTemplate.update(sql, "2025-03-15 21:30", "Steve");
    }

    private void insertCriminalHistory() {
        String sql = "INSERT IGNORE INTO criminal_history (suspect_name, known_associate, criminal_record) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Jake", "Daniel", "Prior kidnapping charges");
        jdbcTemplate.update(sql, "Martin", "None", "No prior record");
        jdbcTemplate.update(sql, "Steve", "Jake", "Prior assault case");
    }

    private void insertIncidentInfo() {
        String sql = "INSERT IGNORE INTO incident_info (parking_lot, time, damaged_part) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Mall Parking", "2025-03-17 19:00", "Windshield");
    }

    private void insertDamageType() {
        String sql = "INSERT IGNORE INTO damage_type (damaged_part, damage_type) VALUES (?, ?)";
        jdbcTemplate.update(sql, "Windshield", "Shattered");
    }

    private void insertSuspect() {
        String sql = "INSERT IGNORE INTO suspects_vandalism (time, suspect_name) VALUES (?, ?)";
        jdbcTemplate.update(sql, "2025-03-17 19:00", "David");
        jdbcTemplate.update(sql, "2025-03-17 19:00", "Laura");
        jdbcTemplate.update(sql, "2025-03-17 19:00", "Ryan");
        jdbcTemplate.update(sql, "2025-03-17 19:00", "Megan");
    }

    private void insertMotiveInfo() {
        String sql = "INSERT IGNORE INTO motive_info (suspect_name, motive) VALUES (?, ?)";
        jdbcTemplate.update(sql, "David", "Owner had an argument with David");
        jdbcTemplate.update(sql, "Laura", "Suspect was seen in the parking");
        jdbcTemplate.update(sql, "Ryan", "Drunk");
        jdbcTemplate.update(sql, "Megan", "No known motive");
    }

    private void insertCarInfo() {
        String sql = "INSERT IGNORE INTO car_info (parking_lot, car_owner, car_model) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Mall Parking", "Alice", "Toyota Camry");
    }

    private void insertCrimeScene() {
        String sql = "INSERT IGNORE INTO crime_scene (location, time, weapon) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Warehouse", "2025-03-17 22:30", "Knife");
    }

    private void insertWeaponAnalysis() {
        String sql = "INSERT IGNORE INTO weapon_analysis (weapon, cause_of_death) VALUES (?, ?)";
        jdbcTemplate.update(sql, "Knife", "Stab wound to the chest");
    }

    private void insertSupects() {
        String sql = "INSERT IGNORE INTO suspects_murder (time, suspect_name) VALUES (?, ?)";
        jdbcTemplate.update(sql, "2025-03-17 22:30", "John");
        jdbcTemplate.update(sql, "2025-03-17 22:30", "Emily");
        jdbcTemplate.update(sql, "2025-03-17 22:30", "Michael");
        jdbcTemplate.update(sql, "2025-03-17 22:30", "Sarah");
    }

    private void insertSuspectAlibi() {
        String sql = "INSERT IGNORE INTO suspect_alibi (suspect_name, alibi) VALUES (?, ?)";
        jdbcTemplate.update(sql, "John", "Claims to have been at a bar.");
        jdbcTemplate.update(sql, "Emily", "Says she was home alone.");
        jdbcTemplate.update(sql, "Michael", "Was seen near the crime scene.");
        jdbcTemplate.update(sql, "Sarah", "Was working late at the office.");
    }

    private void insertEvidence() {
        String sql = "INSERT IGNORE INTO evidence (location, witness_statement, camera_footage) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, "Warehouse", "Saw a man running away holding a knife.", "Footage of suspicious activity");
    }

}
