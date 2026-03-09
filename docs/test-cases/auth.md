# Gardener - AUTH Test Cases

## Scope

Testing user registration, login, and session handling.

## Endpoints

- POST /auth/register
- POST /auth/login

---

## Test Environment

- Frontend: `npm run build` + `npm run preview`
- Backend: `cd backend` + `npm run dev`
- Database: MongoDB Cloud
- Browser: Chromium

---

## Test Data Reference

| Label | Value |
|---|---|
| Valid email | testuser1@gardener.test |
| Valid password | TestPass123! |
| Existing email | testuser1@gardener.test (pre-created account) |
| Invalid email format | not-an-email |
| Short password | 123 |
| Long password | 200-character string: `Aa1!` repeated 50 times |
| Spaces-only email | `   ` (3 spaces) |
| SQL injection payload | `' OR 1=1 --` |
| Script injection payload | `<script>alert('xss')</script>` |

---

## Test Cases

| ID | Title | Objective | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Postconditions | Status | Severity | Related Scenario | Automation Ready |
|----|-------|-----------|---------------|------------|-----------|----------------|---------------|----------------|--------|---------|-----------------|-----------------|
| AUTH-01 | Register new user | Verify new user can register | User with email `newuser@gardener.test` does not exist in DB | 1. Navigate to `/register` 2. Enter email: `newuser@gardener.test` 3. Enter password: `TestPass123!` 4. Click "Register" button | email: `newuser@gardener.test`, password: `TestPass123!` | HTTP 201, account created, success message displayed, user logged in and redirected to home page | Visible success message, after register user already logged in, redirected to home page | Created user is removed from DB (teardown) | Pass | Major | SC-AUTH-01 | Yes |
| AUTH-02 | Register with existing email | Verify duplicate email is rejected | Account with `testuser1@gardener.test` exists in DB | 1. Navigate to `/register` 2. Enter email: `testuser1@gardener.test` 3. Enter password: `TestPass123!` 4. Click "Register" button | email: `testuser1@gardener.test`, password: `TestPass123!` | HTTP 409 or HTTP 400, error message "User with this email already exists." displayed, no new account created | Error message "User with this email already exists.", HTTP 409, no account created, user not logged in | No change in DB | Fail | Major | SC-AUTH-04 | Yes |
| AUTH-03 | Register with invalid email format | Verify email format validation | None | 1. Navigate to `/register` 2. Enter email: `not-an-email` 3. Enter password: `TestPass123!` 4. Click "Register" button | email: `not-an-email`, password: `TestPass123!` | Validation error displayed below email field, form not submitted | Validation error displayed below email field, form not submitted | None | Pass | Major | SC-AUTH-04 | Yes |
| AUTH-04 | Register with empty email | Verify empty email is rejected | None | 1. Navigate to `/register` 2. Leave email field empty 3. Enter password: `TestPass123!` 4. Click "Register" button | email: `""`, password: `TestPass123!` | Validation error "Email is required" displayed, form not submitted | Validation error displayed, form not submitted | None | Pass | Minor | SC-AUTH-04 | Yes |
| AUTH-05 | Register with empty password | Verify empty password is rejected | None | 1. Navigate to `/register` 2. Enter email: `newuser@gardener.test` 3. Leave password field empty 4. Click "Register" button | email: `newuser@gardener.test`, password: `""` | Validation error "Password is required" displayed, form not submitted | Validation message displayed, form not submitted  | None | Pass | Minor | SC-AUTH-04 | Yes |
| AUTH-06 | Register with short password | Verify minimum password length is enforced | None | 1. Navigate to `/register` 2. Enter email: `newuser@gardener.test` 3. Enter password: `123` 4. Click "Register" button | email: `newuser@gardener.test`, password: `123` | Validation error indicating minimum password length, form not submitted | Validation message displayed, form not submitted | None | Pass | Minor | SC-AUTH-04 | Yes |
| AUTH-07 | Register with long password | Verify long passwords are accepted or rejected with clear message | None | 1. Navigate to `/register` 2. Enter email: `newuser@gardener.test` 3. Enter 200-character password 4. Click "Register" button | email: `newuser@gardener.test`, password: 200-char string | Validation error with maximum length message displayed | Account created without error, no maximum length validation on email or password fields. Same behavior on login form. **See BUG-001** | Created user removed from DB. | Fail | Minor | SC-AUTH-04 | Yes |
| AUTH-08 | Register with spaces-only email | Verify whitespace-only email is rejected | None | 1. Navigate to `/register` 2. Enter `   ` (spaces) in email field 3. Enter password: `TestPass123!` 4. Click "Register" button | email: `   `, password: `TestPass123!` | Validation error displayed, form not submitted | Validation error displayed, form not submitted | None | Pass | Minor | SC-AUTH-04 | Yes |
| AUTH-09 | Register with SQL injection in email | Verify input is sanitized against SQL injection | None | 1. Navigate to `/register` 2. Enter `' OR 1=1 --` in email field 3. Enter password: `TestPass123!` 4. Click "Register" button | email: `' OR 1=1 --`, password: `TestPass123!` | Validation error displayed, no account created, no server error (HTTP 500) | TBD | None | Not executed | Major | SC-AUTH-04 | Yes |
| AUTH-10 | Register with script injection in email | Verify input is sanitized against XSS | None | 1. Navigate to `/register` 2. Enter `<script>alert('xss')</script>` in email field 3. Enter password: `TestPass123!` 4. Click "Register" button | email: `<script>alert('xss')</script>`, password: `TestPass123!` | Validation error displayed, script not executed, no account created | TBD | None | Not executed | Major | SC-AUTH-04 | Yes |
| AUTH-11 | Successful login | Verify valid credentials allow login | Account `testuser1@gardener.test` / `TestPass123!` exists in DB | 1. Navigate to `/login` 2. Enter email: `testuser1@gardener.test` 3. Enter password: `TestPass123!` 4. Click "Login" button | email: `testuser1@gardener.test`, password: `TestPass123!` | HTTP 200, user redirected to home page, session token set | user logged in and redirected to home page, session token is set | Session active | Pass | Major | SC-AUTH-02 | Yes |
| AUTH-12 | Login with wrong password | Verify incorrect password is rejected | Account `testuser1@gardener.test` exists in DB | 1. Navigate to `/login` 2. Enter email: `testuser1@gardener.test` 3. Enter password: `WrongPass999!` 4. Click "Login" button | email: `testuser1@gardener.test`, password: `WrongPass999!` | HTTP 401, error message "Invalid credentials" displayed, user not logged in | Validation message displayed, user not logged in | None | Pass | Major | SC-AUTH-03 | Yes |
| AUTH-13 | Login with non-existing email | Verify unknown email is rejected | None | 1. Navigate to `/login` 2. Enter email: `ghost@gardener.test` 3. Enter password: `TestPass123!` 4. Click "Login" button | email: `ghost@gardener.test`, password: `TestPass123!` | HTTP 401, error message "Invalid credentials" displayed | Validation message displayed, user not logged in | None | Pass | Major | SC-AUTH-03 | Yes |
| AUTH-14 | Login with empty email | Verify empty email field is rejected | None | 1. Navigate to `/login` 2. Leave email field empty 3. Enter password: `TestPass123!` 4. Click "Login" button | email: `""`, password: `TestPass123!` | Validation error "Email is required" displayed, form not submitted | Validation message displayed, form not send | None | Pass | Minor | SC-AUTH-03 | Yes |
| AUTH-15 | Login with empty password | Verify empty password field is rejected | None | 1. Navigate to `/login` 2. Enter email: `testuser1@gardener.test` 3. Leave password field empty 4. Click "Login" button | email: `testuser1@gardener.test`, password: `""` | Validation error "Password is required" displayed, form not submitted | Validation message displayed, form not send | None | Pass | Minor | SC-AUTH-03 | Yes |
| AUTH-16 | Login with empty form | Verify completely empty form is rejected | None | 1. Navigate to `/login` 2. Leave all fields empty 3. Click "Login" button | email: `""`, password: `""` | Validation errors displayed for both fields, form not submitted | Validation message displayed, form not send | None | Pass | Minor | SC-AUTH-03 | Yes |
| AUTH-17 | Session persists after authenticated request | Verify session token remains valid after use | User logged in as `testuser1@gardener.test`, session token obtained from login response | 1. Log in 2. Copy session token from login response 3. Send GET /users/:userId/favorites with header `Authorization: Bearer <token>` 4. Check response | valid session token in Authorization header | HTTP 200, data returned, token still valid | HTTP 200, data returned, valid token | Session remains active | Pass | Major | SC-AUTH-05 | Yes |
| AUTH-18 | Access protected endpoint without login | Verify unauthenticated users are blocked | User not logged in, no session token | 1. Send GET /users/:userId/favorites without Authorization header | no token | HTTP 401 Unauthorized, no data returned | HTTP 401, no data returned | None | Pass | Critical | SC-AUTH-06 | Yes |
| AUTH-19 | Multiple failed login attempts | Verify repeated wrong logins are handled consistently | Account `testuser1@gardener.test` exists in DB | 1. Navigate to `/login` 2. Enter correct email, wrong password 3. Click "Login" 4. Repeat steps 2-3 five times | email: `testuser1@gardener.test`, password: `WrongPass999!` | Each attempt returns HTTP 401 and "Invalid credentials" message without server errors | Message displayed, user not logged in | None | Pass | Minor | SC-AUTH-03 | Yes |
| AUTH-20 | Login immediately after registration | Verify user can log in right after registration | No existing account for `newuser2@gardener.test` | 1. Navigate to `/register` 2. Register with email `newuser2@gardener.test`, password `TestPass123!` 3. Navigate to `/login` 4. Enter same credentials 5. Click "Login" | email: `newuser2@gardener.test`, password: `TestPass123!` | HTTP 201, login successful, user redirected to dashboard | HTTP 201, account created, success message displayed, user logged in and redirected to home page | Created user removed from DB (teardown) | Pass | Minor | SC-AUTH-07 | Yes |