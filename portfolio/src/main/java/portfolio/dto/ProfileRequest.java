package portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public class ProfileRequest {

    @NotBlank(message = "Nome é obrigatório")
    private String fullName;

    @NotBlank(message = "Função/cargo é obrigatório")
    private String role;

    private String tagline;

    private String about;

    private String email;

    private String linkedin;

    private String github;

    private String location;

    public ProfileRequest() {
    }

    public String getFullName() {
        return fullName;
    }

    public String getRole() {
        return role;
    }

    public String getTagline() {
        return tagline;
    }

    public String getAbout() {
        return about;
    }

    public String getEmail() {
        return email;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public String getGithub() {
        return github;
    }

    public String getLocation() {
        return location;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
