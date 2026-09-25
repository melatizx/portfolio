package portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Segurança do painel /admin.
 *
 * - As páginas públicas do portfólio e as leituras (GET) da API continuam
 * abertas, para o site continuar funcionando normalmente.
 * - Tudo em /admin/** (exceto a tela de login) e qualquer escrita na API
 * (POST/PUT/DELETE) exigem login.
 * - Existe um único usuário administrador, guardado em memória (não numa
 * tabela do banco) e definido pelas variáveis de ambiente ADMIN_USERNAME
 * e ADMIN_PASSWORD (ver application.properties). A senha é criptografada
 * com BCrypt antes de ficar em memória.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {

        var admin = User.withUsername(adminUsername)
                .password(passwordEncoder.encode(adminPassword))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Site pessoal, um único admin, sessão same-origin: por simplicidade
                // desativamos o CSRF aqui. Para reativar (recomendado em apps com
                // mais usuários/forms de terceiros), use CookieCsrfTokenRepository
                // e envie o token via header X-XSRF-TOKEN nas chamadas fetch.
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        // Site público (loadpage única + leitura da API)
                        .requestMatchers(HttpMethod.GET,
                                "/", "/index.html",
                                "/css/**", "/js/**", "/img/**", "/favicon.ico")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()

                        // Tela de login do admin (tem que ser publica, senao ninguem
                        // consegue chegar nela para se autenticar)
                        .requestMatchers("/admin/login.html", "/login").permitAll()

                        // Qualquer escrita na API exige login
                        .requestMatchers("/api/**").authenticated()

                        // Resto do painel admin exige login
                        .requestMatchers("/admin/**").authenticated()

                        .anyRequest().authenticated())

                .formLogin(form -> form
                        .loginPage("/admin/login.html")
                        .loginProcessingUrl("/login")
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/admin/index.html", true)
                        .failureUrl("/admin/login.html?error")
                        .permitAll())

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/admin/login.html?logout")
                        .permitAll());

        return http.build();
    }
}
