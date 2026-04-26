import { test, expect } from "../../fixtures";
import invalid from "../../test-data/invalid-inputs.json";
import valid from "../../test-data/valid-inputs.json";
import users from "../../test-data/users.json";

test.describe("AUTH - UI Full Coverage (AUTH-01 to AUTH-20)", () => {

    test.describe('Registration', () => {

        test.beforeEach(async ({ registerPage }) => {
            await registerPage.open();
        });

        test('AUTH-01: Registration - success flow @smoke', async ({ registerPage, page }) => {
            await registerPage.register(`user_${Date.now()}@gardener.playwright.test`, valid.validPassword, valid.validPassword);
            await expect(page).toHaveURL("/");
        });

        test('AUTH-02: Registration - existing email', async ({ registerPage }) => {
            await registerPage.register(users.testUser1.email, valid.validPassword, valid.validPassword);
            await expect(registerPage.emailConflictError).toBeVisible();
        });

        test('AUTH-03: Registration - invalid email format', async ({ registerPage }) => {
            await registerPage.register(invalid.invalidEmail, valid.validPassword, valid.validPassword);
            await expect(registerPage.emailError).toBeVisible();
        });

        test('AUTH-04: Registration - empty email', async ({ registerPage }) => {
            await registerPage.register("", valid.validPassword, valid.validPassword);
            await expect(registerPage.emailError).toBeVisible();
        });

        test('AUTH-05: Registration - empty password', async ({ registerPage }) => {
            await registerPage.register(`user_${Date.now()}@gardener.playwright.test`, "", "");
            await expect(registerPage.lengthPasswordError).toHaveCount(2)
        });

        test('AUTH-06: Registration - short password', async ({ registerPage }) => {
            await registerPage.register(`user_${Date.now()}@gardener.playwright.test`, invalid.shortPassword, invalid.shortPassword);
            await expect(registerPage.lengthPasswordError).toHaveCount(2);
        });

        test('AUTH-07: Registration - long password (BUG-001)', async ({ registerPage }) => {
            await registerPage.register(`user_${Date.now()}@gardener.playwright.test`, invalid.longPassword, invalid.longPassword);
            await expect(registerPage.lengthPasswordError).toBeVisible();
        });

        test('AUTH-08: Registration - spaces only email', async ({ registerPage }) => {
            await registerPage.register(invalid.spacesOnlyEmail, valid.validPassword, valid.validPassword);
            await expect(registerPage.emailError).toBeVisible();
        });

        test('AUTH-9: Registration - passwords mismatch', async ({ registerPage }) => {
            await registerPage.register(`user_${Date.now()}@gardener.playwright.test`, valid.validPassword, "OtherPass123!");
            await expect(registerPage.repeatPasswordError).toBeVisible();
        });

        test('AUTH-10: Registration - script injection in email field', async ({ registerPage }) => {
            const scriptTag = "<script>alert('xss')</script>@test.pl";
            await registerPage.register(scriptTag, valid.validPassword, valid.validPassword);
            await expect(registerPage.emailError).toBeVisible();
        });

        test('AUTH-20: Login flow - immediate login after account creation', async ({ registerPage, page }) => {
            await registerPage.register(`user_${Date.now()}@gardener.playwright.test`, valid.validPassword, valid.validPassword);
            await expect(page).toHaveURL("/");
            await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible();
        });
    });

    test.describe("Login & Session", () => {

        test.beforeEach(async ({ loginPage }) => {
            await loginPage.open();
        });

        test('AUTH-11: Login - success flow @smoke', async ({ loginPage, page }) => {
            await loginPage.login(process.env.TEST_USER1_EMAIL!, process.env.TEST_USER1_PASSWORD!);
            await expect(page).toHaveURL("/");
        });

        test('AUTH-12: Login - wrong password', async ({ loginPage }) => {
            await loginPage.login(users.testUser1.email, invalid.invalidPassword);
            await expect(loginPage.loginError).toBeVisible();
        });

        test('AUTH-13: Login - non-existing user', async ({ loginPage }) => {
            await loginPage.login(invalid.notExistingEmail, valid.validPassword);
            await expect(loginPage.loginError).toBeVisible();
        });

        test('AUTH-14: Login - empty email', async ({ loginPage }) => {
            await loginPage.login("", valid.validPassword);
            await expect(loginPage.emailError).toBeVisible();
        });

        test('AUTH-15: Login - empty password', async ({ loginPage }) => {
            await loginPage.login(users.testUser1.email, "");
            await expect(loginPage.passwordError).toBeVisible();
        });

        test('AUTH-16: Login - empty form', async ({ loginPage }) => {
            await loginPage.login("", "");
            await expect(loginPage.emailError).toBeVisible();
            await expect(loginPage.passwordError).toBeVisible();
        });

        test('AUTH-17: Session persistence - stays logged in after refresh', async ({ loginPage, page }) => {
            await loginPage.login(process.env.TEST_USER1_EMAIL!, process.env.TEST_USER1_PASSWORD!);
            await expect(page).toHaveURL("/");
            await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible();
            await page.reload();
            await expect(page).toHaveURL("/");
            await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible();
            await page.goto("/my-plants");
            await expect(page).toHaveURL("/my-plants");
            await expect(page.getByRole("heading", { name: "Ulubione rośliny" })).toBeVisible();
        });

        test('AUTH-19: Multiple failed login attempts (UX test)', async ({ loginPage }) => {
            for (let i = 0; i < 3; i++) {
                await loginPage.login(users.testUser1.email, invalid.invalidPassword);
                await expect(loginPage.loginError).toBeVisible();
            }
        });
    });

    test('AUTH-18: Access protection - direct link to /my-plants without login', async ({ page }) => {
        await page.goto("/my-plants");
        await expect(page.getByText("Aby korzystać z zakładki moje rośliny musisz być zalogowany")).toBeVisible();
    });

});