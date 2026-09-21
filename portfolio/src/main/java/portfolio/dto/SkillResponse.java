package portfolio.dto;

public class SkillResponse {

    private Long id;
    private String name;
    private String category;
    private String note;
    private Integer sortOrder;

    public SkillResponse() {
    }

    public SkillResponse(
            Long id,
            String name,
            String category,
            String note,
            Integer sortOrder) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.note = note;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
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
}
