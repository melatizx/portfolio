package portfolio.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class ProjectRequest {

    @NotBlank(message = "Nome do projeto é obrigatório")
    private String name;

    @NotBlank(message = "Descrição do projeto é obrigatória")
    private String description;

    private String githubUrl;

    private String liveUrl;

    private List<Long> skillIds;

    public ProjectRequest() {
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

    public List<Long> getSkillIds() {
        return skillIds;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public void setLiveUrl(String liveUrl) {
        this.liveUrl = liveUrl;
    }

    public void setSkillIds(List<Long> skillIds) {
        this.skillIds = skillIds;
    }
}