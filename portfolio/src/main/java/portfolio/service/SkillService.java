package portfolio.service;

import org.springframework.stereotype.Service;
import portfolio.dto.SkillRequest;
import portfolio.dto.SkillResponse;
import portfolio.model.Skill;
import portfolio.repository.SkillRepository;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(
            SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillResponse> getSkills() {

        return skillRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public SkillResponse getSkillById(Long id) {

        Skill skill = skillRepository.findById(id)
                .orElse(null);

        if (skill == null) {
            return null;
        }

        return toResponse(skill);
    }

    public SkillResponse createSkill(
            SkillRequest request) {

        Skill skill = new Skill(
                request.getName(),
                request.getCategory());

        Skill savedSkill = skillRepository.save(skill);

        return toResponse(savedSkill);
    }

    public SkillResponse updateSkill(
            Long id,
            SkillRequest request) {

        Skill skill = skillRepository.findById(id)
                .orElse(null);

        if (skill == null) {
            return null;
        }

        skill.setName(request.getName());
        skill.setCategory(request.getCategory());

        Skill updatedSkill = skillRepository.save(skill);

        return toResponse(updatedSkill);
    }

    public boolean deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            return false;
        }

        skillRepository.deleteById(id);

        return true;
    }

    private SkillResponse toResponse(Skill skill) {

        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory());
    }
}