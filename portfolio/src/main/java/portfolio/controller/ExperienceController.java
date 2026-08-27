package portfolio.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import portfolio.dto.ExperienceRequest;
import portfolio.dto.ExperienceResponse;
import portfolio.service.ExperienceService;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(
            ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public List<ExperienceResponse> getExperiences() {
        return experienceService.getExperiences();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceResponse> getExperienceById(
            @PathVariable Long id) {

        ExperienceResponse experience = experienceService.getExperienceById(id);

        if (experience == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(experience);
    }

    @PostMapping
    public ResponseEntity<ExperienceResponse> createExperience(
            @Valid @RequestBody ExperienceRequest request) {

        ExperienceResponse experience = experienceService.createExperience(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(experience);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceResponse> updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody ExperienceRequest request) {

        ExperienceResponse experience = experienceService.updateExperience(id, request);

        if (experience == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(experience);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(
            @PathVariable Long id) {

        boolean deleted = experienceService.deleteExperience(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}