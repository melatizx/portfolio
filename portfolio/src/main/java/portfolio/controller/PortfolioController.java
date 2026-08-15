package portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import portfolio.model.Project;
import portfolio.service.ProjectService;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class PortfolioController {

    private final ProjectService projectService;

    public PortfolioController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/")
    public List<Project> getProject() {
        return projectService.getProjects();
    }
}