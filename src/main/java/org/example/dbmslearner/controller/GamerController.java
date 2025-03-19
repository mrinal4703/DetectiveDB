package org.example.dbmslearner.controller;

import org.example.dbmslearner.entity.GamerEntity;
import org.example.dbmslearner.repository.GamerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import java.util.Collections;
import java.util.Optional;

@RestController
public class GamerController {
    private GamerRepository gamerRepository;
    @Autowired
    public GamerController(GamerRepository gamerRepository) {this.gamerRepository = gamerRepository;}

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));

            // Convert byte array to hex string
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    @PostMapping("/newgamer")
    public GamerEntity newMessage(@RequestBody GamerEntity newGamerEntity) {
        System.out.println("Received new user request: " + newGamerEntity.toString());

        try {
            newGamerEntity.setPassword(hashPassword(newGamerEntity.getPassword()));

            GamerEntity savedGamerEntity = gamerRepository.save(newGamerEntity);
            System.out.println("Saved user: " + savedGamerEntity.toString());
            return savedGamerEntity;
        } catch (Exception e) {
            System.err.println("Error saving user: " + e.getMessage());
            e.printStackTrace();
            throw e; // Rethrow the exception or handle it appropriately
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody GamerEntity loginUser) {
        GamerEntity user = gamerRepository.findByEmail(loginUser.getEmail());

        String hashedInputPassword = hashPassword(loginUser.getPassword());
        if (user == null || !user.getPassword().equals(hashedInputPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping("/progress/{email}")
    public ResponseEntity<Float> getProgress(@PathVariable String email) {
        GamerEntity user = gamerRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(user.getProgress());
    }

    @PutMapping("/updateLastSaved")
    public ResponseEntity<?> updateLastSaved(@RequestBody GamerEntity updatedGamer) {
        GamerEntity user = gamerRepository.findByEmail(updatedGamer.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.setLastsaved(updatedGamer.getLastsaved());
        gamerRepository.save(user);

        return ResponseEntity.ok("Last saved updated successfully to: " + updatedGamer.getLastsaved());
    }

    @GetMapping("/getLastSaved")
    public ResponseEntity<?> getLastSaved(@RequestParam String email) {
        Optional<GamerEntity> gamer = Optional.ofNullable(gamerRepository.findByEmail(email));

        if (gamer.isPresent()) {
            return ResponseEntity.ok(Collections.singletonMap("lastsaved", gamer.get().getLastsaved()));
        } else {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", "Gamer not found!"));
        }
    }

    @PutMapping("/updateProgress")
    public ResponseEntity<?> updateProgress(@RequestBody GamerEntity updatedGamer) {
        GamerEntity user = gamerRepository.findByEmail(updatedGamer.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.setProgress(updatedGamer.getProgress());
        gamerRepository.save(user);

        return ResponseEntity.ok("Progress updated successfully to: " + updatedGamer.getProgress());
    }

    @PutMapping("/updateBasicTutorial")
    public ResponseEntity<?> updateBasicTutorial(@RequestBody GamerEntity updatedGamer) {
        // Find the user by email
        GamerEntity user = gamerRepository.findByEmail(updatedGamer.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Update the basic_tutorial field to true (1 in MySQL)
        user.setBasicTutorial(updatedGamer.getBasicTutorial()); // Set to true (1 in MySQL)
        gamerRepository.save(user);

        return ResponseEntity.ok("Basic tutorial updated successfully to: true");
    }

    @GetMapping("/getBasicTutorial")
    public ResponseEntity<?> getBasicTutorial(@RequestParam String email) {
        GamerEntity user = gamerRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Return the basic_tutorial value
        return ResponseEntity.ok(Collections.singletonMap("basicTutorial", user.getBasicTutorial()));
    }

    @GetMapping("/getBasicGame1")
    public ResponseEntity<?> getBasicGame1(@RequestParam String email) {
        GamerEntity user = gamerRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Return the basic_tutorial value
        return ResponseEntity.ok(Collections.singletonMap("basicGame1", user.getBasicGame1()));
    }

    @GetMapping("/getBasicGame2")
    public ResponseEntity<?> getBasicGame2(@RequestParam String email) {
        GamerEntity user = gamerRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Return the basic_tutorial value
        return ResponseEntity.ok(Collections.singletonMap("basicGame2", user.getBasicGame2()));
    }

    @GetMapping("/getBasicGame3")
    public ResponseEntity<?> getBasicGame3(@RequestParam String email) {
        GamerEntity user = gamerRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Return the basic_tutorial value
        return ResponseEntity.ok(Collections.singletonMap("basicGame3", user.getBasicGame3()));
    }

}
