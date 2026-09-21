package portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

/**
 * Dados de perfil (Hero / About / Contact) do portfólio.
 * Tabela de linha única: sempre existe (no máximo) um registro com id = 1.
 */
@Entity
public class Profile {

    @Id
    private Long id;

    private String fullName;

    private String role;

    @Column(length = 300)
    private String tagline;

    // Parágrafos do "About me" separados por linha em branco (\n\n).
    @Lob
    private String about;

    private String email;

    private String linkedin;

    private String github;

    private String location;

    public Profile() {
    }

    public Profile(
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

    public void setId(Long id) {
        this.id = id;
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
