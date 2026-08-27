package portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public class SkillRequest {

    @NotBlank(message = "Nome da skill é obrigatório")
    private String name;

    @NotBlank(message = "Categoria da skill é obrigatória")
    private String category;

    public SkillRequest() {
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}