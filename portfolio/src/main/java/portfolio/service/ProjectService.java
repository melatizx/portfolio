package portfolio.service;

import org.springframework.stereotype.Service;
import portfolio.dto.ProjectRequest;
import portfolio.dto.ProjectResponse;
import portfolio.model.Project;
import portfolio.model.Skill;
import portfolio.repository.ProjectRepository;
import portfolio.repository.SkillRepository;
import portfolio.repository.SkillRepository;
import portfolio.dto.SkillSummaryResponse;
import portfolio.exception.ResourceNotFoundException;
import portfolio.exception.ResourceNotFoundException;

import java.util.List;
import java.util.ArrayList;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    public ProjectService(ProjectRepository projectRepository, SkillRepository skillRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }

    public List<ProjectResponse> getProjects() {

        return projectRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Projeto não encontrado: " + id));

        return toResponse(project);
    }

    public ProjectResponse createProject(ProjectRequest request) {

        Project project = new Project(
                request.getName(),
                request.getDescription(),
                request.getGithubUrl(),
                request.getLiveUrl());
        List<Skill> skills = findSkills(request.getSkillIds());

        project.setSkills(skills);

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

        List<SkillSummaryResponse> skills = project.getSkills().stream()
                .map(skill -> new SkillSummaryResponse(skill.getId(), skill.getName(), skill.getCategory())).toList();

        return new ProjectResponse(project.getId(), project.getName(), project.getDescription(), project.getGithubUrl(),
                project.getLiveUrl(), skills);
    }

    private List<Skill> findSkills(List<Long> skillIds) {
        if (skillIds == null || skillIds.isEmpty()) {
            return new ArrayList();
        }

        return skillIds.stream().map(
                id -> skillRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Skill não encontrada" + id)))
                .toList();

    }
}