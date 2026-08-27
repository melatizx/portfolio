package portfolio.service;

import org.springframework.stereotype.Service;
import portfolio.dto.ExperienceRequest;
import portfolio.dto.ExperienceResponse;
import portfolio.model.Experience;
import portfolio.repository.ExperienceRepository;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(
            ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public List<ExperienceResponse> getExperiences() {

        return experienceRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ExperienceResponse getExperienceById(Long id) {

        Experience experience = experienceRepository.findById(id)
                .orElse(null);

        if (experience == null) {
            return null;
        }

        return toResponse(experience);
    }

    public ExperienceResponse createExperience(
            ExperienceRequest request) {

        Experience experience = toEntity(request);

        Experience savedExperience = experienceRepository.save(experience);

        return toResponse(savedExperience);
    }

    public ExperienceResponse updateExperience(
            Long id,
            ExperienceRequest request) {

        Experience experience = experienceRepository.findById(id)
                .orElse(null);

        if (experience == null) {
            return null;
        }

        experience.setCompany(request.getCompany());
        experience.setPosition(request.getPosition());
        experience.setDescription(request.getDescription());
        experience.setStartDate(request.getStartDate());
        experience.setEndDate(request.getEndDate());

        Experience updatedExperience = experienceRepository.save(experience);

        return toResponse(updatedExperience);
    }

    public boolean deleteExperience(Long id) {

        if (!experienceRepository.existsById(id)) {
            return false;
        }

        experienceRepository.deleteById(id);

        return true;
    }

    private Experience toEntity(
            ExperienceRequest request) {

        return new Experience(
                request.getCompany(),
                request.getPosition(),
                request.getDescription(),
                request.getStartDate(),
                request.getEndDate());
    }

    private ExperienceResponse toResponse(
            Experience experience) {

        return new ExperienceResponse(
                experience.getId(),
                experience.getCompany(),
                experience.getPosition(),
                experience.getDescription(),
                experience.getStartDate(),
                experience.getEndDate());
    }
}