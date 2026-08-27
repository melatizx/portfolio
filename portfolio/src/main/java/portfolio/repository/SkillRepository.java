package portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import portfolio.model.Skill;

public interface SkillRepository
        extends JpaRepository<Skill, Long> {
}