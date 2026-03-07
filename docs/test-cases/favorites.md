# Gardener - FAVORITES Test Cases

## Scope

Testing the Favorite Plants functionality for logged-in users.

---

## Endpoints

- POST /users/:userId/favorites/:plantId
- GET /users/:userId/favorites
- DELETE /users/:userId/favorites/:plantId

---

## Test Environment

- Frontend: `npm run build` + `npm run preview`
- Backend: `cd backend` + `npm run dev`
- Database: MongoDB Cloud
- Browser: Chromium

---

## Test Data Reference

### Authorization

| Label | Value |
|---|---|
| Auth header format | `Authorization: Bearer <token>` |
| Token source | Obtained from POST /auth/login response body |
| Unauthenticated request | Request sent without `Authorization` header |

### User Accounts

| Label | Email | Password |
|---|---|---|
| Test User 1 | `testuser1@gardener.test` | `TestPass123!` |
| Test User 2 | `testuser2@gardener.test` | `TestPass123!` |

### Plant IDs

| Label | Value | Notes |
|---|---|---|
| Valid plant ID (Plant A) | `696eb7a86b37e1e5e232a7b0` | Hosta (Funkia) - confirmed in DB |
| Valid plant ID (Plant B) | `696eb7a86b37e1e5e232a7b4` | Piwonia chińska (Paeonia lactiflora) - confirmed in DB |
| Non-existing plant ID | `000000000000000000000000` | Valid ObjectId format, no matching document |
| Invalid plant ID format | `invalid-id` | Not a valid ObjectId - should trigger 400 |
| Invalid user ID format | `invalid-user` | Not a valid ObjectId - should trigger 400 |

---

## Test Cases

| ID | Title | Objective | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Postconditions | Status | Severity | Related Scenario | Automation Ready |
|----|-------|-----------|---------------|-----------|-----------|----------------|---------------|----------------|--------|---------|-----------------|----------------|
| FAV-01 | Add plant to favorites via UI | Verify logged-in user can add a plant via UI | Logged in as `testuser1@gardener.test`, plant is not already in favorites | 1. Navigate to plant encyclopedia 2. Open details of `plantId_A` 3. Click the "Add to favorites" / heart icon | plantId_A | Plant appears in favorites list, heart icon toggles to active state | TBD | Plant added to favorites in DB - remove in teardown | Not executed | Major | SC-FAV-01 | Yes |
| FAV-02 | Add plant to favorites via API | Verify API adds plant to favorites | Logged in as `testuser1@gardener.test`, `plantId_A` not in favorites | 1. Send POST /users/:userId/favorites/:plantId with valid token | userId of testuser1, plantId_A | HTTP 200, plant added to favorites in DB | TBD | Plant added to DB - remove in teardown | Not executed | Major | SC-FAV-01 | Yes |
| FAV-03 | Add duplicate plant via API | Verify system prevents adding the same plant twice | `plantId_A` already in favorites for testuser1 | 1. Send POST /users/:userId/favorites/:plantId for a plant already in favorites | userId of testuser1, plantId_A | HTTP 400 or HTTP 409, error message returned, no duplicate created in DB | TBD | No duplicate in DB | Not executed | Minor | SC-FAV-04 | Yes |
| FAV-04 | Add plant to favorites without login | Verify unauthenticated users cannot add favorites | No active session / no token | 1. Send POST /users/:userId/favorites/:plantId without Authorization header | userId, plantId_A, no token | HTTP 401 Unauthorized, no plant added to DB | TBD | No change in DB | Not executed | Critical | SC-FAV-05 | Yes |
| FAV-05 | Add plant with invalid plant ID format | Verify API rejects malformed plant ID | Logged in as testuser1 | 1. Send POST /users/:userId/favorites/invalid-id | userId of testuser1, `invalid-id` | HTTP 400 Bad Request, error message in response | TBD | No change in DB | Not executed | Minor | SC-FAV-04 | Yes |
| FAV-06 | Add plant with non-existing plant ID | Verify API rejects non-existing plant ID | Logged in as testuser1 | 1. Send POST /users/:userId/favorites/000000000000000000000000 | userId of testuser1, `000000000000000000000000` | HTTP 404 Not Found, error message in response | TBD | No change in DB | Not executed | Minor | SC-FAV-04 | Yes |
| FAV-07 | Add plant with invalid user ID format | Verify API rejects malformed user ID | Logged in as testuser1 | 1. Send POST /users/invalid-user/favorites/:plantId | `invalid-user`, plantId_A | HTTP 400 Bad Request, error message in response | TBD | No change in DB | Not executed | Minor | SC-FAV-04 | Yes |
| FAV-08 | View favorites via UI | Verify favorites are displayed correctly in UI | Logged in as testuser1, `plantId_A` in favorites | 1. Navigate to favorites tab/page | none | Favorites page loads, `plantId_A` plant card displayed correctly | TBD | None | Not executed | Major | SC-FAV-03 | Yes |
| FAV-09 | Retrieve favorites via API | Verify API returns correct favorites list | Logged in as testuser1, `plantId_A` in favorites | 1. Send GET /users/:userId/favorites with valid token | userId of testuser1 | HTTP 200, response body contains array with `plantId_A` data | TBD | None | Not executed | Major | SC-FAV-03 | Yes |
| FAV-10 | Retrieve favorites when list is empty | Verify empty favorites list is handled gracefully | Logged in as testuser1, no favorites saved | 1. Navigate to favorites tab 2. Also send GET /users/:userId/favorites | userId of testuser1 | UI: empty state message displayed (e.g. "No favorites yet"); API: HTTP 200 with empty array `[]` | TBD | None | Not executed | Minor | SC-FAV-03 | Yes |
| FAV-11 | Retrieve favorites without login | Verify unauthenticated users cannot access favorites | No active session / no token | 1. Send GET /users/:userId/favorites without Authorization header | userId, no token | HTTP 401 Unauthorized, no data returned | TBD | None | Not executed | Critical | SC-FAV-05 | Yes |
| FAV-12 | Remove plant from favorites via UI | Verify user can remove a plant via UI | Logged in as testuser1, `plantId_A` in favorites | 1. Navigate to favorites page 2. Click the "Remove" / heart icon on `plantId_A` | none | Plant removed from favorites list in UI, heart icon toggles to inactive state | TBD | Plant removed from DB | Not executed | Major | SC-FAV-02 | Yes |
| FAV-13 | Remove plant from favorites via API | Verify API removes plant from favorites | Logged in as testuser1, `plantId_A` in favorites | 1. Send DELETE /users/:userId/favorites/:plantId with valid token | userId of testuser1, plantId_A | HTTP 200, plant removed from favorites in DB | TBD | Plant removed from DB | Not executed | Major | SC-FAV-02 | Yes |
| FAV-14 | Remove plant not in favorites via API | Verify API handles removal of non-favorited plant | Logged in as testuser1, `plantId_A` NOT in favorites | 1. Send DELETE /users/:userId/favorites/plantId_A | userId of testuser1, plantId_A | HTTP 400 or HTTP 404, error message returned, no DB error | TBD | No change in DB | Not executed | Minor | SC-FAV-02 | Yes |
| FAV-15 | Remove plant from favorites without login | Verify unauthenticated users cannot remove favorites | No active session / no token | 1. Send DELETE /users/:userId/favorites/:plantId without Authorization header | userId, plantId_A, no token | HTTP 401 Unauthorized, no change in DB | TBD | No change in DB | Not executed | Critical | SC-FAV-05 | Yes |
| FAV-16 | Favorites persist after logout and login | Verify favorites are saved between sessions | Logged in as testuser1, `plantId_A` in favorites | 1. Add `plantId_A` to favorites 2. Log out 3. Log in again as testuser1 4. Navigate to favorites | testuser1 credentials | `plantId_A` still appears in favorites list after re-login | TBD | Favorites intact in DB | Not executed | Major | SC-FAV-06 | Yes |
| FAV-17 | Favorites are isolated per user | Verify one user's favorites are not visible to another | testuser1 has `plantId_A` in favorites; testuser2 has no favorites | 1. Log in as testuser2 2. Navigate to favorites page 3. Send GET /users/:userId/favorites for testuser2 | testuser2 userId | testuser2's favorites page is empty; `plantId_A` does not appear | TBD | No cross-user data leak | Not executed | Major | SC-FAV-06 | Yes |
| FAV-18 | Add multiple plants to favorites | Verify multiple plants can be saved | Logged in as testuser1, no favorites | 1. Add `plantId_A` to favorites 2. Add `plantId_B` to favorites 3. Navigate to favorites | plantId_A, plantId_B | Both plants displayed in favorites list, API returns array of 2 items | TBD | Both plants in DB - remove in teardown | Not executed | Major | SC-FAV-06 | Yes |
| FAV-19 | Remove one plant from multiple favorites | Verify removing one plant does not affect others | Logged in as testuser1, both `plantId_A` and `plantId_B` in favorites | 1. Send DELETE /users/:userId/favorites/plantId_A 2. Send GET /users/:userId/favorites | plantId_A, userId of testuser1 | HTTP 200, `plantId_A` removed; `plantId_B` still present in favorites list | TBD | Only plantId_A removed from DB | Not executed | Major | SC-FAV-02 | Yes |