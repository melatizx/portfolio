package portfolio.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import portfolio.model.Profile;
import portfolio.model.Skill;
import portfolio.repository.ProfileRepository;
import portfolio.repository.SkillRepository;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SkillRepository skillRepository;
    private final ProfileRepository profileRepository;

    public DataSeeder(SkillRepository skillRepository, ProfileRepository profileRepository) {
        this.skillRepository = skillRepository;
        this.profileRepository = profileRepository;
    }

    @Override
    public void run(String... args) {
        seedSkills();
        seedProfile();
    }

    private void seedSkills() {

        if (skillRepository.count() > 0) {
            return;
        }

        List<Skill> skills = new ArrayList<>();
        int order = 0;

        // Languages
        for (String name : List.of("Java", "Python", "JavaScript", "C")) {
            skills.add(new Skill(name, "Languages", null, order++));
        }

        // Databases
        for (String name : List.of("SQL", "PostgreSQL", "Oracle")) {
            skills.add(new Skill(name, "Databases", null, order++));
        }

        // Server Infrastructure (label + note)
        String[][] serverInfra = {
                { "Dell", "Servers; Storages; Networkings; Appliences; Lybrarys" },
                { "HPE", "Servers; Storages; Networkings; Lybrarys" },
                { "IBM", "Servers; Storages; Networkings; Lybrarys" },
                { "Lenovo", "Servers; Storages; Networkings" },
                { "Huawei", "Servers; Storages; Networkings" },
                { "Cisco", "Servers; Networkings" },
                { "SUN", "Servers" },
                { "Asustor", "NAS" },
                { "Synology", "NAS" },
                { "Symantec", "Servers" },
                { "NetApp", "Servers" },
                { "Arista", "Networkings" },
                { "Brocade", "Networkings" }
        };
        for (String[] item : serverInfra) {
            skills.add(new Skill(item[0], "Server Infrastructure", item[1], order++));
        }

        // Operating Systems
        for (String name : List.of("Linux", "Windows Server")) {
            skills.add(new Skill(name, "Operating Systems", null, order++));
        }

        // Management (label + note)
        String[][] management = {
                { "iDRAC", "Dell" },
                { "XClarity", "Lenovo" },
                { "iLO", "HPE" },
                { "iBMC", "Huawei" }
        };
        for (String[] item : management) {
            skills.add(new Skill(item[0], "Management", item[1], order++));
        }

        // Tools
        for (String name : List.of("Docker", "Git", "GitHub", "HTML5", "CSS3", "JSON")) {
            skills.add(new Skill(name, "Tools", null, order++));
        }

        // Frameworks
        for (String name : List.of("Spring Boot", "Django", "GetBootStrap")) {
            skills.add(new Skill(name, "Frameworks", null, order++));
        }

        // AI & Cloud
        for (String name : List.of("Anthropic Claude", "Microsoft Azure", "Google Cloud")) {
            skills.add(new Skill(name, "AI & Cloud", null, order++));
        }

        // Soft Skills
        for (String name : List.of("Problem Solving", "Analytical Thinking", "Technical Documentation", "Teamwork",
                "Communication")) {
            skills.add(new Skill(name, "Soft Skills", null, order++));
        }

        skillRepository.saveAll(skills);
    }

    private void seedProfile() {

        if (profileRepository.count() > 0) {
            return;
        }

        Profile profile = new Profile(
                1L,
                "Leonardo Melati Ambrosio",
                "Back-End Developer & Server Infrastructure",
                "Escreva aqui uma frase curta sobre o que você faz e o valor que você entrega.",
                "Primeiro parágrafo: fale sobre sua trajetória e formação.\n\n" +
                        "Segundo parágrafo: fale sobre sua atuação com desenvolvimento backend e infraestrutura de servidores.\n\n"
                        +
                        "Terceiro parágrafo: fale sobre seus interesses e objetivos profissionais.",
                "leonardomelati1@gmail.com",
                "https://www.linkedin.com/in/leonardomelatiambrosio/",
                "https://github.com/melatizx",
                "");

        profileRepository.save(profile);
    }
}
