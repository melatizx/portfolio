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

    public Project createProject(Project project) {
        Long newId = projects.stream().mapToLong(Project::getId).max().orElse(0L) + 1;

        Project newProject = new Project(
                newId,
                project.getName(),
                project.getDescription());

        projects.add(newProject);

        return newProject;
    }

    public Project updateProject(Long id, Project projectData) {
        Project project = getProjectById(id);

        if (project == null) {
            return null;
        }

        project.setName(projectData.getName());
        project.setDescription(projectData.getDescription());

        return project;
    }

    public boolean deleteProject(Long id) {
        Project project = getProjectById(id);

        if (project == null) {
            return false;
        }

        projects.remove(project);

        return true;
    }
}
