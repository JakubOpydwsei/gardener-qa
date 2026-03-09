# Bug Report – BUG-002 - Backend crashes on POST /users/:userId/favorites/:plantId with invalid plantId format

## Summary

Sending POST /users/:userId/favorites/:plantId with a non-ObjectId plantId value causes an unhandled CastError that crashes the backend server. No HTTP response is returned to the client and the server requires a manual restart.

---

## Environment

| Field | Value |
|---|---|
| Frontend URL | http://localhost:4173 |
| Backend | http://localhost:3001 |
| Database | MongoDB Cloud |
| Browser | Chromium |
| OS | Windows 10 |
| Date found | 2026-03-08 |

---

## Severity

- [x] Critical
- [ ] Major
- [ ] Minor

---

## Status

- [x] New
- [ ] In progress
- [ ] Fixed
- [ ] Closed

---

## Related Test Case

TC ID: `FAV-05`

---

## Steps to Reproduce

1. Log in via POST /auth/login to obtain a valid JWT token
2. Send POST /users/:userId/favorites/invalid-id
   - Replace `:userId` with a valid user ID
   - Set header: `Authorization: Bearer <token>`

---

## Expected Result

HTTP 400 Bad Request, error message in response. Backend continues running normally.

---

## Actual Result

Backend throws an unhandled `CastError: Cast to ObjectId failed for value "invalid-id"`. No HTTP response is returned to the client (Postman shows `Error: read ECONNRESET`). Backend process crashes and requires a manual restart before any further requests can be processed.

---

## Evidence

![BUG-003 – backend crash log with CastError](assets/BUG-003-PLANT-backend-log.png)
![BUG-003 – Postman ECONNRESET error, no response received](assets/BUG-003-PLANT-postman-log.png)
