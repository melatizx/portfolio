# Portfolio — Leonardo Melati Ambrosio

<p align="center">

### Back-End Developer & Server Infrastructure

</p>


---

## About

This project was developed to present my professional background and demonstrate my skills in **backend development, software engineering and enterprise infrastructure**.

The portfolio brings together my professional experience, technical skills, education, projects and contact information in a responsive, multi-page web application. All content is persisted in PostgreSQL and managed through a protected admin panel — nothing is hardcoded on the front-end.

The application is continuously evolving as new technologies, improvements and features are implemented.

---

## Tech Stack & Tools

### Backend

<p>
  <img src="https://img.shields.io/badge/Java%2021-0B3A5B?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21">
  <img src="https://img.shields.io/badge/Spring%20Boot%204.1.0-0B3A5B?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot 4.1.0">
  <img src="https://img.shields.io/badge/Spring%20Data%20JPA-0B3A5B?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Data JPA">
  <img src="https://img.shields.io/badge/Spring%20Security-0B3A5B?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security">
  <img src="https://img.shields.io/badge/Spring%20Validation-0B3A5B?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Validation">
</p>

### Frontend

<p>
  <img src="https://img.shields.io/badge/HTML5-0B3A5B?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-0B3A5B?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-0B3A5B?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript">
</p>

### Database

<p>
  <img src="https://img.shields.io/badge/PostgreSQL-0B3A5B?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</p>

### Version Control & Build

<p>
  <img src="https://img.shields.io/badge/Git-0B3A5B?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-0B3A5B?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  <img src="https://img.shields.io/badge/Maven-0B3A5B?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven">
</p>

### Development Environment

<p>
  <img src="https://img.shields.io/badge/VS%20Code-0B3A5B?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code">
</p>

### Deployment

<p>
  <img src="https://img.shields.io/badge/Railway-0B3A5B?style=for-the-badge&logo=railway&logoColor=white" alt="Railway">
</p>

---

## Features

- Multi-page public site — Home, About Me, Skills, Projects, Experience and Contact, each with its own route
- Skills page rendered as a simulated server log / terminal output
- Full REST API backing every section (skills, projects, experience, education, profile)
- Admin panel (`/admin`) with session-based login for full CRUD over all content
- Single configurable admin account (username/password via environment variables, password hashed with BCrypt)
- Responsive layout with a mobile hamburger menu
- Dark, blue-accented visual identity across both the public site and the admin panel

---

## Architecture

The project is a single Spring Boot application that serves three things under one deployable unit — no separate frontend build or hosting needed:

| Layer | Path | Access |
|---|---|---|
| Public site | `/`, `/about.html`, `/skills.html`, `/projects.html`, `/experience.html`, `/contact.html` | Public |
| REST API | `/api/**` | Reads (`GET`) public · Writes (`POST`/`PUT`/`DELETE`) require login |
| Admin panel | `/admin/**` | Requires login (except `/admin/login.html`) |

The backend follows a standard layered structure:

```
model        → JPA entities (Skill, Project, Experience, Education, Profile)
repository   → Spring Data JPA repositories
service      → business logic, request → entity → response mapping
dto          → request/response payloads exposed by the API
controller   → REST endpoints
config       → Spring Security configuration and startup data seeding
exception    → centralized error handling (@RestControllerAdvice)
```

The public front-end and the admin panel are both plain HTML/CSS/JS served as static resources by Spring Boot itself, communicating with the backend exclusively through the REST API (same-origin `fetch` calls).

---

## API Overview

| Resource | Base path | Methods |
|---|---|---|
| Skills | `/api/skills` | `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}` |
| Projects | `/api/projects` | `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}` |
| Experience | `/api/experiences` | `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}` |
| Education | `/api/educations` | `GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}` |
| Profile (Hero / About / Contact) | `/api/profile` | `GET`, `PUT` |

All list/detail (`GET`) endpoints are public and power the site itself; every mutating call requires an authenticated admin session.

---

## Admin Panel

A single administrator manages every piece of content shown on the public site — skills, projects, experience, education and the hero/about/contact profile — through a dedicated panel at `/admin`, protected by Spring Security:

- Session-based form login, with the admin credentials defined via environment variables and stored only as a BCrypt hash in memory (no `users` table)
- One dashboard with record counts per resource
- One CRUD screen per resource, each with a listing table and a create/edit form
- Deleting or unlinking data through the admin panel is reflected immediately on the public site, since both read from the same database through the same API

---

## Data Model

| Entity | Key fields |
|---|---|
| `Skill` | name, category, note, sortOrder |
| `Project` | name, description, githubUrl, liveUrl, related skills (many-to-many) |
| `Experience` | company, position, description, startDate, endDate |
| `Education` | institution, course, startDate, endDate |
| `Profile` | fullName, role, tagline, about, email, linkedin, github, location (single row) |

---

### Contact

<p>
  <a href="mailto:leonardomelati1@gmail.com">
    <img src="https://img.shields.io/badge/-0B3A5B?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
  
  <a href="https://www.linkedin.com/in/leonardomelatiambrosio/">
  <img src="https://img.shields.io/badge/-0B3A5B?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
  
  <a href="https://github.com/melatizx">
    <img src="https://img.shields.io/badge/-0B3A5B?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

---

<p align="center">

© 2026 Leonardo Melati

</p>
