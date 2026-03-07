# Gardener - QA Test Plan

## 1. Document Information

**Project:** Gardener  
**Application Type:** Web Application  
**Frontend:** React  
**Backend:** Express.js (Node.js)  
**Database:** MongoDB Cloud  
**Architecture:** REST API

---

## 2. Test Objectives

The objective of testing is to verify that the Gardener application:

- correctly implements business functionality across all four modules
- communicates reliably between frontend and backend via REST API
- properly processes, stores, and retrieves user data in MongoDB
- rejects unauthorized access to protected resources
- allows users to complete all core application workflows end-to-end

---

## 3. Test Scope

### In Scope

The following application modules are covered by testing.

| Module | Description |
|------|------|
| AUTH | User registration, login, and session management |
| PLANTS | Plant encyclopedia, search, filters, plant details |
| FAVORITES | Adding, viewing, and removing user's favorite plants |
| GARDEN CREATOR | Uploading garden image, placing plants on canvas, exporting layout |
| END-TO-END | Cross-module user flows spanning AUTH, PLANTS, FAVORITES, and GARDEN CREATOR |

### Out of Scope

The following test types are not included in this test plan:

- performance / load testing
- penetration testing
- mobile application testing
- cross-browser compatibility testing (tests executed in Chromium only)

---

## 4. Test Levels

The following test levels will be executed.

| Level | Description | Tools |
|------|------|------|
| API | Testing REST API endpoints (requests, responses, error handling, auth) | Postman, Newman |
| UI | Testing frontend user interface (forms, interactions, rendering) | Playwright |
| E2E | Testing full user workflows across frontend, API and database | Playwright |

---

## 5. Test Environment

### Configuration

Frontend:

```
npm run build
npm run preview
```

Backend:

```
cd backend
npm run dev
```

Database:

- MongoDB Cloud

### Test Accounts

| Account | Email | Password |
|---|---|---|
| Test User 1 | testuser1@gardener.test | TestPass123! |
| Test User 2 | testuser2@gardener.test | TestPass123! |

---

## 6. Test Tools

| Test Type | Tool |
|------|------|
| API manual testing | Postman |
| API automation / CI | Postman + Newman |
| E2E automation | Playwright (TypeScript) |
| Smoke testing | Playwright |
| Sanity testing | Playwright |

---

## 7. Entry Criteria

Testing can begin when:

- backend service is running and responding to requests
- MongoDB database is connected and seeded with plant data
- frontend application is built and accessible via browser
- test user accounts are created in the database
- test environment is confirmed stable (smoke tests pass)

---

## 8. Exit Criteria

Testing is considered complete when:

- no **Critical** severity defects remain open
- no **Major** severity defects remain open without an accepted workaround
- all smoke tests pass
- at least 80% of planned test cases have been executed
- test execution report has been generated

---

## 9. Test Artifacts

Detailed test cases are stored in the following directory:

```
/test-cases/
```

Structure:

```
auth.md
plants.md
favorites.md
garden-creator.md
```

Each file contains detailed test cases for a specific system module.

Additional artifacts:

```
test-strategy.md
test-scenarios.md
traceability-matrix.md
```

---

## 10. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Backend environment instability | Tests cannot be executed | Verify environment before each test session |
| API changes breaking automated tests | False failures in CI | Review and update Postman collections after each API change |
| Incomplete or unclear requirements | Missing test coverage | Clarify with developer before writing test cases |
| MongoDB test data contamination | Unreliable test results | Clean up test data in teardown steps |

---

## 11. Deliverables

The following QA artifacts are produced during testing:

- Test Strategy (`test-strategy.md`)
- Test Plan (`gardener-test-plan.md`)
- Test Scenarios (`test-scenarios.md`)
- Test Cases (`/test-cases/*.md`)
- Traceability Matrix (`traceability-matrix.md`)
- Test execution reports (`/test-reports/*`, Playwright HTML report, Newman report)
- Defect reports (`/bug-report/*`)