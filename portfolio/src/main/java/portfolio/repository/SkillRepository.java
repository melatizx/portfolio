package portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import portfolio.model.Skill;

import java.util.List;

public interface SkillRepository
        extends JpaRepository<Skill, Long> {

    List<Skill> findAllByOrderBySortOrderAscIdAsc();
}
