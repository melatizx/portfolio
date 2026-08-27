package portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public class ProjectRequest {

    @NotBlank(message = "Nome do projeto é obrigatório")
    private String name;

    @NotBlank(message = "Descrição do projeto é obrigatória")
    private String description;

    public ProjectRequest() {
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}