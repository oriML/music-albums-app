# Gemini Architecture Guidelines

This document outlines the architecture, coding style, and conventions to be followed in this Angular project.

## 1. Project Structure (Feature-First)

The project follows a feature-first or "feature-based" module organization.

-   **`src/app/core`**: Contains core, application-wide services, models, and guards that are singletons. Examples include `AuthService`, `LocalStorageService`, and authentication guards. This module is imported only once in `app.module.ts`.
-   **`src/app/shared`**: Contains shared, reusable components, directives, and pipes that are used across multiple feature modules. It should also export common Angular Material modules. It is imported by feature modules that need it.
-   **`src/app/features`**: Contains the different feature modules of the application (e.g., `auth`, `albums-panel`, `album`). Each feature is a self-contained unit with its own routing, components, and services.
-   **`src/assets`**: Contains static assets like images, fonts, and mock data.

## 2. Component Structure (Three-File Convention)

Each component, page, or UI element should be organized into three separate files:

-   **`*.component.ts`**: The component's logic and TypeScript code.
-   **`*.component.html`**: The component's template.
-   **`*.component.scss`**: The component's styles.

This separation improves readability and maintainability.

## 3. Clean Code & SOLID Principles

-   **Single Responsibility Principle (SRP)**: Each component, service, or class should have one, and only one, reason to change. Keep components lean and focused. Delegate business logic to services.
-   **Open/Closed Principle (OCP)**: Software entities should be open for extension but closed for modification. Use inheritance, polymorphism, and dependency injection to extend functionality without altering existing code.
-   **Liskov Substitution Principle (LSP)**: Subtypes must be substitutable for their base types.
-   **Interface Segregation Principle (ISP)**: Clients should not be forced to depend on interfaces they do not use. Create small, specific interfaces.
-   **Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules. Both should depend on abstractions. Use Dependency Injection (DI) to provide dependencies.

## 4. Coding Style and Conventions

-   **Strict Typing**: Use TypeScript's strict mode. Avoid using `any`. Define clear interfaces and types for data models.
-   **OnPush Change Detection**: Use `changeDetection: ChangeDetectionStrategy.OnPush` in all components to improve performance. This requires using immutable data structures.
-   **Lazy Loading**: All feature modules must be lazy-loaded to improve initial load time.
-   **RxJS**: Use RxJS for handling asynchronous operations. Unsubscribe from observables to prevent memory leaks, preferably using a take-until-destroyed pattern.
-   **Naming Conventions**:
    -   Components: `PascalCase` with the `.component` suffix (e.g., `AlbumCardComponent`).
    -   Services: `PascalCase` with the `.service` suffix (e.g., `MusicApiService`).
    -   Interfaces: `PascalCase` with no prefix/suffix (e.g., `Album`).
    -   Files: `kebab-case` (e.g., `album-card.component.ts`).
-   **Environment Variables**: Use Angular's environment files (`environment.ts`) for configuration that changes between environments (e.g., API URLs).
