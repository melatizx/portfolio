package portfolio.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import portfolio.dto.SkillRequest;
import portfolio.dto.SkillResponse;
import portfolio.service.SkillService;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(
            SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public List<SkillResponse> getSkills() {
        return skillService.getSkills();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillResponse> getSkillById(
            @PathVariable Long id) {

        SkillResponse skill = skillService.getSkillById(id);

        if (skill == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(skill);
    }

    @PostMapping
    public ResponseEntity<SkillResponse> createSkill(
            @Valid @RequestBody SkillRequest request) {

        SkillResponse skill = skillService.createSkill(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(skill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse> updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillRequest request) {

        SkillResponse skill = skillService.updateSkill(id, request);

        if (skill == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(skill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(
            @PathVariable Long id) {

        skillService.deleteSkill(id);

        return ResponseEntity.noContent().build();
    }
}