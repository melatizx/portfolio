package portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public class SkillRequest {

    @NotBlank(message = "Nome da skill é obrigatório")
    private String name;

    @NotBlank(message = "Categoria da skill é obrigatória")
    private String category;

    private String note;

    private Integer sortOrder;

    public SkillRequest() {
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getNote() {
        return note;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
