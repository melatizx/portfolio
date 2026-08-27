package portfolio.dto;

import java.time.LocalDate;

public class EducationResponse {

    private Long id;
    private String institution;
    private String course;
    private LocalDate startDate;
    private LocalDate endDate;

    public EducationResponse() {
    }

    public EducationResponse(
            Long id,
            String institution,
            String course,
            LocalDate startDate,
            LocalDate endDate) {
        this.id = id;
        this.institution = institution;
        this.course = course;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
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
}