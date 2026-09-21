package portfolio.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String category;

    // Observação opcional (ex.: "Servers; Storages; Networkings" para um item
    // como "Dell" dentro da categoria "Server Infrastructure").
    @Column(length = 500)
    private String note;

    // Define a ordem de exibição (categorias e itens dentro da categoria),
    // já que o findAll() do JPA não garante ordem sem essa coluna.
    @Column(nullable = false)
    private Integer sortOrder = 0;

    @ManyToMany(mappedBy = "skills")
    private List<Project> projects = new ArrayList<>();

    public Skill() {
    }

    public Skill(String name, String category) {
        this.name = name;
        this.category = category;
    }

    public Skill(String name, String category, String note, Integer sortOrder) {
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

    public List<Project> getProjects() {
        return projects;
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