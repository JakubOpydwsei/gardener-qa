# gardener-qa

**Gardener** is a web application designed to help users plan and manage their garden by browsing plants, creating personalized plant collections, and organizing favorite plants.

This repository presents a **QA testing project** conducted on the Gardener application. The goal was to design and execute a structured testing process covering manual functional testing, defect reporting, and traceability between test artifacts.

The repository demonstrates a structured QA workflow similar to those used in real software development projects.

---

## LIVE Test Report
The latest automated test execution results are available online:
[**View Interactive Playwright Report**](https://Jakub-Opyd.github.io/gardener-qa/)

*Note: This report is generated from the local test environment to showcase automation capabilities and defect detection (including identified 500/201 errors).*

---

## Application Under Test

| Layer | Technology |
|---|---|
| Frontend | React (Vite), served via `npm run preview` on `localhost:4173` |
| Backend | Express.js, running on `localhost:3001` |
| Database | MongoDB Cloud |
| Auth | Session token (custom Bearer token) |

---

## Application Scope

The tested application includes the following functional modules:

- **Authentication** – user registration, login, session persistence, access control
- **Plant Encyclopedia** – browsing plant list, viewing plant details, search and filtering
- **Favorites** – adding, removing, and retrieving favorite plants
- **Garden Creator** – visual garden planning, plant placement, removing plants from layout

---

## Testing Scope

The QA process included:

- manual functional testing
- negative testing
- input validation testing
- API behaviour verification
- documentation of defects and execution results

Testing covered both **frontend functionality** and **backend API behaviour**.

---

## Tools Used

- Manual test documentation – Markdown
- API testing – Postman
- Network inspection – Chrome DevTools
- Database verification – MongoDB Compass
- Version control – Git / GitHub
- API Testing & Automation – **Playwright (TypeScript)**, Postman

---

## Test Documentation

```
📂docs
┣ 📂test-cases
┃ ┣ 📜auth.md
┃ ┣ 📜favorites.md
┃ ┣ 📜garden-creator.md
┃ ┗ 📜plants.md
┣ 📜bug-report-template.md
┣ 📜test-plan.md
┣ 📜test-scenarios.md
┣ 📜test-strategy.md
┗ 📜traceability-matrix.md

```

- **Test Strategy** – overall testing approach and scope
- **Test Plan** – test environment and execution assumptions
- **Test Scenarios** – high-level functional scenarios
- **Test Cases** – detailed manual test cases with actual results
- **Traceability Matrix** – mapping between requirements, scenarios, test cases, and defects

---

## Test Coverage

All 30 defined test scenarios are covered by test cases — **100% scenario coverage**.

| Module | Total | Pass | Fail | Not Executed |
|---|---|---|---|---|
| AUTH | 20 | 14 | 6 | 0 |
| PLANTS | 22 | 21 | 1 | 0 |
| FAVORITES | 19 | 18 | 1 | 0 |
| GARDEN CREATOR | 17 | 0 | 0 | 17 |
| **Total** | **78** | **53** | **8** | **17** |

---

## Bug Reports

6 key defects found during testing:

| ID | Title | Severity | Module |
|---|---|---|---|
| [BUG-001](bug-reports/BUG-001-AUTH-missing-max-length-validation.md) | Missing maximum length validation on email and password fields | Minor | AUTH |
| [BUG-002](bug-reports/BUG-002-FAV-backend-crash-invalid-plantid.md) | Backend crashes on POST /users/:userId/favorites/:plantId with invalid plantId format | Critical | FAV |
| [BUG-003](bug-reports/BUG-003-PLANT-backend-crash-invalid-id.md) | Backend crashes on GET /plants/id/:id with invalid ID format | Critical | PLANT |
| [BUG-004](bug-reports/BUG-004-AUTH-Validation-Crash.md) | Backend crashes (500) on invalid email formats | Major | AUTH-03, AUTH |
| [BUG-005](bug-reports/BUG-005-AUTH-Injection-Crash.md) | Security: Backend crashes on injection payloads | Major | AUTH-09, AUTH |
| [BUG-006](bug-reports/BUG-006-AUTH-Short-Password.md) | Password length requirement not enforced (201 instead of 400) | Major | AUTH |

Each bug report follows a structured format including summary, environment, steps to reproduce, expected result, actual result, severity, status, and evidence (screenshots).

---

## Test Accounts

| Email | Password | Role |
|---|---|---|
| `testuser1@gardener.test` | `TestPass123!` | Primary test user |
| `testuser2@gardener.test` | `TestPass123!` | Secondary test user (isolation tests) |

---

## Test Automation

API tests are implemented using **Playwright**.

```typescript
test("AUTH-01: Register new user", async ({ authApi }) => {
        const email = `user_${Date.now()}@gardener.playwright.test`;
        const response = await authApi.register({ email, password: valid.validPassword });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.userId).toBeTruthy();
        expect(body.email).toBe(email);
        expect(body.token.length).toBeGreaterThan(50);
        expect(body).not.toHaveProperty('password');
    });
```