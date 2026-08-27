package portfolio.dto;

import java.time.LocalDate;

public class ExperienceResponse {

    private Long id;
    private String company;
    private String position;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;

    public ExperienceResponse() {
    }

    public ExperienceResponse(
            Long id,
            String company,
            String position,
            String description,
            LocalDate startDate,
            LocalDate endDate) {
        this.id = id;
        this.company = company;
        this.position = position;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public String getCompany() {
        return company;
    }

    public String getPosition() {
        return position;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }
}