package portfolio.dto;

public class SkillSummaryResponse {

    private Long id;
    private String name;
    private String category;
    private String note;

    public SkillSummaryResponse() {
    }

    public SkillSummaryResponse(
            Long id,
            String name,
            String category,
            String note) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.note = note;
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
}
