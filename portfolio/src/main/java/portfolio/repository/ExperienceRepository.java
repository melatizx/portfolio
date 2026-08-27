package portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import portfolio.model.Experience;

public interface ExperienceRepository
        extends JpaRepository<Experience, Long> {
}