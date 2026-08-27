package portfolio.service;

import org.springframework.stereotype.Service;
import portfolio.dto.EducationRequest;
import portfolio.dto.EducationResponse;
import portfolio.model.Education;
import portfolio.repository.EducationRepository;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(
            EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public List<EducationResponse> getEducations() {

        return educationRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EducationResponse getEducationById(Long id) {

        Education education = educationRepository.findById(id)
                .orElse(null);

        if (education == null) {
            return null;
        }

        return toResponse(education);
    }

    public EducationResponse createEducation(
            EducationRequest request) {

        Education education = new Education(
                request.getInstitution(),
                request.getCourse(),
                request.getStartDate(),
                request.getEndDate());

        Education savedEducation = educationRepository.save(education);

        return toResponse(savedEducation);
    }

    public EducationResponse updateEducation(
            Long id,
            EducationRequest request) {

        Education education = educationRepository.findById(id)
                .orElse(null);

        if (education == null) {
            return null;
        }

        education.setInstitution(
                request.getInstitution());

        education.setCourse(
                request.getCourse());

        education.setStartDate(
                request.getStartDate());

        education.setEndDate(
                request.getEndDate());

        Education updatedEducation = educationRepository.save(education);

        return toResponse(updatedEducation);
    }

    public boolean deleteEducation(Long id) {

        if (!educationRepository.existsById(id)) {
            return false;
        }

        educationRepository.deleteById(id);

        return true;
    }

    private EducationResponse toResponse(
            Education education) {

        return new EducationResponse(
                education.getId(),
                education.getInstitution(),
                education.getCourse(),
                education.getStartDate(),
                education.getEndDate());
    }
}