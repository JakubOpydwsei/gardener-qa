# Gardener - Test Strategy

## 1. Overview

This document defines the overall testing strategy for the **Gardener** web application.  
It describes the testing approach, testing levels, test types, tools, and environments used to ensure the quality of the system.

Gardener is a web application that allows users to:

- browse plant information
- manage favorite plants
- create a garden using a garden creator tool
- manage their user account

---

## 2. Testing Objectives

The objective of testing is to ensure that:

- the application behaves according to functional requirements
- communication between the frontend and backend works correctly
- user data is properly stored and retrieved
- critical user flows work reliably and without major defects
- API endpoints return correct HTTP status codes and response structures
- unauthorized access to protected resources is consistently blocked

---

## 3. Test Levels

The following testing levels are used in the project.

### API Testing

Testing of backend REST API endpoints using **Postman** (manual) and **Newman** (automated/CI).

Scope includes:

- request and response validation (status codes, JSON schema)
- error handling (4xx, 5xx responses)
- data correctness (response body matches database state)
- authentication and authorization behavior (JWT token validation)

### UI Testing

Testing of the frontend user interface built with React.

Scope includes:

- form validation (required fields, input formats, error messages)
- user interactions (clicks, drag and drop, navigation)
- UI rendering (correct data displayed, empty states handled)
- frontend behavior on invalid input

### End-to-End Testing

Testing of complete user workflows across the entire system (frontend > API > database).

Examples include:

- user registration followed by immediate login
- browsing plant encyclopedia and opening plant details
- adding and removing plants from favorites
- uploading garden image, placing plants, and exporting layout

---

## 4. Test Types

The following test types are applied in the project.

### Smoke Tests

Basic tests verifying that the core functionality of the system works after deployment or application startup. Executed first on every environment setup.

Covered flows:
- application loads without errors
- user can register and log in
- plant list is accessible
- favorites endpoint responds correctly

### Sanity Tests

Quick checks performed after small changes or bug fixes to verify that the main functionality still works. Subset of regression tests focused on the changed area.

### Functional Tests

Tests verifying that application features work according to requirements, including both positive paths (valid inputs) and negative paths (invalid inputs, missing authorization, edge cases).

### Regression Tests

Full suite of tests executed after any significant change to ensure that previously working functionality has not been broken.

---

## 5. Test Approach

### Manual Testing

Manual testing is performed using predefined test cases documented in `/test-cases/`.

It includes:

- validation of all functional scenarios
- UI verification (visual correctness, error messages)
- exploratory testing of edge cases not covered by test cases

### Automated Testing

Selected scenarios are automated using **Playwright with TypeScript**.

Automation priority:
1. Smoke tests (run on every deployment)
2. Critical E2E paths (registration > login > favorites > garden creator)
3. API contract tests via Postman + Newman

Automation **not** applied to:
- tests marked `Automation Ready: No` in test case files
- purely visual/layout verification
- tests requiring manual file system interaction (e.g. large file upload performance)

---

## 6. Test Environment

Testing is performed on a local development environment.

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

---

## 7. Test Data

| Category | Details |
|---|---|
| Test user accounts | `testuser1@gardener.test` / `testuser2@gardener.test` |
| Passwords | `TestPass123!` |
| Plant IDs | Valid plant IDs sourced from GET /plants response |
| Invalid IDs | `000000000000000000000000` (valid ObjectId format, non-existing), `invalid-id` (invalid format) |
| Garden images | Valid: `.png`/`.jpg` under 5MB; Invalid: `.txt`, `.pdf` files |

Test data created during test execution (favorites, garden layouts) should be cleaned up in test teardown steps where applicable.

---

## 8. Defect Management

Defects discovered during testing should be reported with the following information:

- **Title** - short, descriptive summary
- **Description** - what the issue is
- **Steps to reproduce** - numbered, precise steps
- **Expected result** - what should happen
- **Actual result** - what actually happens
- **Environment** - OS, browser, frontend/backend version
- **Severity** - Critical / Major / Minor
- **Evidence** - screenshot or video recording where applicable