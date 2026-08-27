package portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class EducationRequest {

    @NotBlank(message = "Instituição é obrigatória")
    private String institution;

    @NotBlank(message = "Curso é obrigatório")
    private String course;

    @NotNull(message = "Data de início é obrigatória")
    private LocalDate startDate;

    private LocalDate endDate;

    public EducationRequest() {
    }

    public String getInstitution() {
        return institution;
    }

    public String getCourse() {
        return course;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}