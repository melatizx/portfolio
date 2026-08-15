package portfolio.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;
import portfolio.model.Project;

@Service
public class ProjectService {

    private final List<Project> projects = new ArrayList<>();

    public ProjectService() {
        projects.add(
                new Project(
                        1L,
                        "Portfolio",
                        "Portfolio profissional desenvolvido com springboot"));
        projects.add(
                new Project(
                        2L,
                        "Sistema de inventário",
                        "Sistema desenvolvido para gerenciamento de inventário"));
        projects.add(
                new Project(
                        3L,
                        "API de logs",
                        "API para análise de logs de infraestrutura"));
    }

    public List<Project> getProjects() {
        return projects;
    }

    public Project getProjectById(Long id) {
        for (Project project : projects) {
            if (project.getId().equals(id)) {
                return project;
            }
        }

        return null;
    }
}
