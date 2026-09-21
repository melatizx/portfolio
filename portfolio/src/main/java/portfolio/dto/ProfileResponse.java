package portfolio.dto;

public class ProfileResponse {

    private Long id;
    private String fullName;
    private String role;
    private String tagline;
    private String about;
    private String email;
    private String linkedin;
    private String github;
    private String location;

    public ProfileResponse() {
    }

    public ProfileResponse(
            Long id,
            String fullName,
            String role,
            String tagline,
            String about,
            String email,
            String linkedin,
            String github,
            String location) {
        this.id = id;
        this.fullName = fullName;
        this.role = role;
        this.tagline = tagline;
        this.about = about;
        this.email = email;
        this.linkedin = linkedin;
        this.github = github;
        this.location = location;
    }

    public Long getId() {
        return id;
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
}
