package portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ExperienceRequest {

    @NotBlank(message = "Empresa é obrigatória")
    private String company;

    @NotBlank(message = "Cargo é obrigatório")
    private String position;

    @NotBlank(message = "Descrição é obrigatória")
    private String description;

    @NotNull(message = "Data de início é obrigatória")
    private LocalDate startDate;

    private LocalDate endDate;

    public ExperienceRequest() {
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

    public void setCompany(String company) {
        this.company = company;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}