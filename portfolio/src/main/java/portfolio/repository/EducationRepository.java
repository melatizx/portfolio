package portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import portfolio.model.Education;

public interface EducationRepository
        extends JpaRepository<Education, Long> {
}