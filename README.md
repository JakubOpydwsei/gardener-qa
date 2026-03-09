# gardener-qa

**Gardener** is a web application designed to help users plan and manage their garden by browsing plants, creating personalized plant collections, and organizing favorite plants.

This repository presents a **QA testing project** conducted on the Gardener application. The goal was to design and execute a structured testing process covering manual functional testing, defect reporting, and traceability between test artifacts.

The repository demonstrates a structured QA workflow similar to those used in real software development projects.

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

**Planned:**
- API test execution – Newman
- UI test automation – Playwright

---

## Test Documentation

```
docs/
├── test-strategy.md
├── test-plan.md
├── test-scenarios.md
├── traceability-matrix.md
├── bug-report-template.md
└── test-cases/
    ├── auth.md
    ├── plants.md
    ├── favorites.md
    └── garden-creator.md
```

- **Test Strategy** – overall testing approach and scope
- **Test Plan** – test environment and execution assumptions
- **Test Scenarios** – high-level functional scenarios
- **Test Cases** – detailed manual test cases with actual results
- **Traceability Matrix** – mapping between requirements, scenarios, test cases, and defects

---

## Test Coverage

All 30 defined test scenarios are covered by test cases — **100% scenario coverage**.

| Module | Test Cases | Pass | Fail | Not Executed |
|---|---|---|---|---|
| AUTH | 20 | 18 | 1 | 2 |
| PLANTS | 22 | 20 | 1 | 0 |
| FAVORITES | 19 | 18 | 1 | 0 |
| GARDEN CREATOR | 17 | 0 | 0 | 17 |
| **Total** | **78** | **56** | **3** | **19** |

Garden Creator test cases are defined and ready to execute. AUTH-09 and AUTH-10 (injection tests) are pending execution.

---

## Bug Reports

3 defects found during testing:

| ID | Title | Severity | Module |
|---|---|---|---|
| [BUG-001](bug-reports/BUG-001-AUTH-missing-max-length-validation.md) | Missing maximum length validation on email and password fields | Minor | AUTH |
| [BUG-002](bug-reports/BUG-002-FAV-backend-crash-invalid-plantid.md) | Backend crashes on POST /favorites/:plantId with invalid plantId format | Critical | FAVORITES |
| [BUG-003](bug-reports/BUG-003-PLANT-backend-crash-invalid-id.md) | Backend crashes on GET /plants/id/:id with invalid ID format | Critical | PLANTS |

BUG-002 and BUG-003 share the same root cause — unhandled `CastError` thrown by Mongoose when a non-ObjectId value is passed to a DB query. The issue is present in both `UserRoutes.ts` and `PlantRoutes.ts`, indicating a systemic lack of input validation across route handlers.

Each bug report follows a structured format including summary, environment, steps to reproduce, expected result, actual result, severity, status, and evidence (screenshots).

---

## Planned Extensions

### API Tests

```
api-tests/
├── postman-collection.json
├── environment.json
└── newman-report.html
```

Planned scope: authentication endpoints, plant data endpoints, favorites management API, negative API scenarios.

### UI Automation

End-to-end tests implemented using Playwright:

```
playwright-tests/
├── tests/
├── page-objects/
└── playwright.config.ts
```

Planned automated flows: user login, plant browsing, adding plants to favorites, garden creator interactions.

---

## Test Accounts

| Email | Password | Role |
|---|---|---|
| `testuser1@gardener.test` | `TestPass123!` | Primary test user |
| `testuser2@gardener.test` | `TestPass123!` | Secondary test user (isolation tests) |

---

## Repository Structure

```
gardener-qa/
├── README.md
├── docs/
│   ├── test-strategy.md
│   ├── test-plan.md
│   ├── test-scenarios.md
│   ├── traceability-matrix.md
│   ├── bug-report-template.md
│   └── test-cases/
│       ├── auth.md
│       ├── plants.md
│       ├── favorites.md
│       └── garden-creator.md
├── bug-reports/
│   ├── assets/
│   ├── BUG-001-AUTH-missing-max-length-validation.md
│   ├── BUG-002-FAV-invalid-plantid-crashes-backend.md
│   └── BUG-003-PLANT-invalid-id-crashes-backend.md
├── api-tests/                          ← planned
├── playwright-tests/                   ← planned
└── test-data/
    ├── users.json
    └── plants.json
```

---

## Status

Work in progress. Manual testing of AUTH, PLANTS, and FAVORITES modules is complete. Garden Creator execution and automation phase are next.