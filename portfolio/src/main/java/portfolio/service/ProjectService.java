package portfolio.service;

import org.springframework.stereotype.Service;
import portfolio.dto.ProjectRequest;
import portfolio.dto.ProjectResponse;
import portfolio.model.Project;
import portfolio.repository.ProjectRepository;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> getProjects() {

        return projectRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id).orElse(null);

        if (project == null) {
            return null;
        }

        return toResponse(project);
    }

    public ProjectResponse createProject(ProjectRequest request) {

        Project project = toEntity(request);

        Project savedProject = projectRepository.save(project);

        return toResponse(savedProject);
    }

    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request) {

        Project project = projectRepository.findById(id).orElse(null);

        if (project == null) {
            return null;
        }

        project.setName(request.getName());
        project.setDescription(request.getDescription());

        Project updatedProject = projectRepository.save(project);

        return toResponse(updatedProject);
    }

    public boolean deleteProject(Long id) {

        if (!projectRepository.existsById(id)) {
            return false;
        }

        projectRepository.deleteById(id);

        return true;
    }

    private Project toEntity(ProjectRequest request) {

        return new Project(
                request.getName(),
                request.getDescription());
    }

    private ProjectResponse toResponse(Project project) {

        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription());
    }
}