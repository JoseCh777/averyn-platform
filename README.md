# Averyn

Plataforma institucional de identidad, biometría, inteligencia artificial y gestión de
procesos institucionales seguros — construida como un **monolito modular** (monorepo).

## Repositorio

```
averyn-platform/
├── averyn-frontend/          # Frontend — Sprint 1 (HTML + CSS + JS + Bootstrap, datos mock)
│   ├── index.html            # Landing (Bloque A — José)
│   ├── login.html            # Login (Bloque A — José)
│   ├── assets/
│   │   ├── css/design-system.css   # Design System (tokens + componentes base)
│   │   ├── js/                     # home.js, login.js, common/
│   │   └── img/                    # Logotipos y recursos gráficos
│   └── docs/style-guide.html       # Catálogo visual del Design System
├── averyn-backend/           # (reservado)
└── docs/                     # Documentación del proyecto
```

## Cómo ver la aplicación

Los archivos son estáticos: abre `averyn-frontend/index.html` y
`averyn-frontend/login.html` directamente en el navegador. No requiere build.

- Credenciales mock del login: `admin@averyn.test` / `Averyn2026`
- El login simula la redirección a `dashboard/index.html` (módulo del Bloque B, pendiente).

## Convenciones

- Todas las clases personalizadas usan el prefijo `av-` (nomenclatura BEM simplificada).
- El Design System vive en `assets/css/design-system.css` (Guía de Diseño v1).
- Ramas: `dev` → integración; `feature/<bloque>-<tarea>` por actividad.
- Commits: Conventional Commits (`feat()`, `fix()`, `chore()`, `docs()`).

## Estado del Sprint 1

- [x] Bloque A (Landing + Login) — José
- [ ] Bloque B (Dashboard shell, Identity, Documents) — Jorge
- [ ] Bloque C (Biometría + IA/OCR) — Daniel
- [ ] Bloque D (Electoral, Access, Admin) — Mateo