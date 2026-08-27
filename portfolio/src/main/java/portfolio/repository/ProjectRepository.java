package portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import portfolio.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}