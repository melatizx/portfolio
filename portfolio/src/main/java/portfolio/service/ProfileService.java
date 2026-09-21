package portfolio.service;

import org.springframework.stereotype.Service;
import portfolio.dto.ProfileRequest;
import portfolio.dto.ProfileResponse;
import portfolio.model.Profile;
import portfolio.repository.ProfileRepository;

@Service
public class ProfileService {

    // Tabela de linha única: o perfil do portfólio sempre usa o id fixo 1.
    private static final Long PROFILE_ID = 1L;

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public ProfileResponse getProfile() {

        Profile profile = profileRepository.findById(PROFILE_ID)
                .orElseGet(() -> profileRepository.save(
                        new Profile(PROFILE_ID, "Seu Nome Completo", "Sua função / título profissional",
                                "Escreva aqui uma frase curta sobre você.", "", "", "", "", "")));

        return toResponse(profile);
    }

    public ProfileResponse updateProfile(ProfileRequest request) {

        Profile profile = profileRepository.findById(PROFILE_ID)
                .orElse(new Profile());

        profile.setId(PROFILE_ID);
        profile.setFullName(request.getFullName());
        profile.setRole(request.getRole());
        profile.setTagline(request.getTagline());
        profile.setAbout(request.getAbout());
        profile.setEmail(request.getEmail());
        profile.setLinkedin(request.getLinkedin());
        profile.setGithub(request.getGithub());
        profile.setLocation(request.getLocation());

        Profile savedProfile = profileRepository.save(profile);

        return toResponse(savedProfile);
    }

    private ProfileResponse toResponse(Profile profile) {

        return new ProfileResponse(
                profile.getId(),
                profile.getFullName(),
                profile.getRole(),
                profile.getTagline(),
                profile.getAbout(),
                profile.getEmail(),
                profile.getLinkedin(),
                profile.getGithub(),
                profile.getLocation());
    }
}
