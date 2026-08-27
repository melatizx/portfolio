package portfolio.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import portfolio.dto.EducationRequest;
import portfolio.dto.EducationResponse;
import portfolio.service.EducationService;

import java.util.List;

@RestController
@RequestMapping("/api/educations")
public class EducationController {

    private final EducationService educationService;

    public EducationController(
            EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public List<EducationResponse> getEducations() {
        return educationService.getEducations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationResponse> getEducationById(
            @PathVariable Long id) {

        EducationResponse education = educationService.getEducationById(id);

        if (education == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(education);
    }

    @PostMapping
    public ResponseEntity<EducationResponse> createEducation(
            @Valid @RequestBody EducationRequest request) {

        EducationResponse education = educationService.createEducation(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(education);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationResponse> updateEducation(
            @PathVariable Long id,
            @Valid @RequestBody EducationRequest request) {

        EducationResponse education = educationService.updateEducation(id, request);

        if (education == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(education);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable Long id) {

        boolean deleted = educationService.deleteEducation(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}