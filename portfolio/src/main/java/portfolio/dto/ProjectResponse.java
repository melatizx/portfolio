package portfolio.dto;

import java.util.List;

public class ProjectResponse {

    private Long id;
    private String name;
    private String description;
    private String githubUrl;
    private String liveUrl;
    private List<SkillSummaryResponse> skills;

    public ProjectResponse() {
    }

    public ProjectResponse(
            Long id,
            String name,
            String description,
            String githubUrl,
            String liveUrl,
            List<SkillSummaryResponse> skills) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.githubUrl = githubUrl;
        this.liveUrl = liveUrl;
        this.skills = skills;

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public List<SkillSummaryResponse> getSkills() {
        return skills;
    }
}