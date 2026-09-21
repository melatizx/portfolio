package portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import portfolio.model.Profile;

public interface ProfileRepository
        extends JpaRepository<Profile, Long> {
}
