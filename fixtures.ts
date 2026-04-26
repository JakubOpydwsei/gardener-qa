import { APIRequestContext, test as base, Page, request } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";
import { PlantPage } from "./pages/plant.page";
import { PlantInfoPage } from "./pages/plant-info.page";
import { FavoritePage } from "./pages/favorite.page";
import { HomePage } from "./pages/home.page";
import validInputs from "./test-data/valid-inputs.json";
import { AuthService } from "./api/auth.service";
import { FavoritesService } from "./api/favorites.service";
import { PlantsService } from "./api/plants.service";

const generateUserData = () => {
    return {
        email: `user_${Date.now()}@gardener.playwright.test`,
        password: validInputs.validPassword
    };
};

async function loginViaApi(page: Page) {
    const response = await page.request.post(process.env.API_URL + "/auth/login", {
        data: {
            email: process.env.TEST_USER1_EMAIL,
            password: process.env.TEST_USER1_PASSWORD
        }
    });

    const { userId, email, token } = await response.json();

    await page.goto("/");
    await page.evaluate(({ userId, email, token }) => {
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("token", token);
    }, { userId, email, token });

    await page.goto("/");
}


type Fixtures = {
    authenticatedUser: Page;
    dynamicUser: Page;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    plantPage: PlantPage;
    plantInfoPage: PlantInfoPage;
    favoritePage: FavoritePage;
    homePage: HomePage;
    apiUser: {
        request: APIRequestContext;
        userId: string;
        token: string;
        email: string;
    };
    authApi: AuthService;
    favoritesApi: FavoritesService;
    plantsApi: PlantsService;
};

export const test = base.extend<Fixtures>({
    dynamicUser: async ({ page }, use) => {
        const user = generateUserData();
        const response = await page.request.post(process.env.API_URL + "/auth/register", {
            data: {
                email: user.email,
                password: user.password
            }
        });

        const { userId, email, token } = await response.json();

        await page.goto("/");
        await page.evaluate(({ userId, email, token }) => {
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("token", token);
        }, { userId, email, token });

        await page.goto("/");
        await use(page);
    },
    authenticatedUser: async ({ page }, use) => {
        await loginViaApi(page);
        const userId = 2;
        await use(page);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    plantPage: async ({ page }, use) => {
        await use(new PlantPage(page));
    },
    plantInfoPage: async ({ page }, use) => {
        await use(new PlantInfoPage(page));
    },
    favoritePage: async ({ page }, use) => {
        await use(new FavoritePage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    apiUser: async ({ authApi }, use) => {
        const user = generateUserData();

        const registerResponse = await authApi.register(user)

        const { userId, email, token } = await registerResponse.json();
        use({ request: (authApi as any), userId, email, token });
    },
    authApi: async ({ playwright }, use) => {
        const request = await playwright.request.newContext({
            baseURL: process.env.API_URL
        });

        await use(new AuthService(request));

        request.dispose();
    },
    favoritesApi: async ({ playwright }, use) => {
        const request = await playwright.request.newContext({
            baseURL: process.env.API_URL
        });

        await use(new FavoritesService(request));

        request.dispose();
    },
    plantsApi: async ({ playwright }, use) => {
        const request = await playwright.request.newContext({
            baseURL: process.env.API_URL
        });

        await use(new PlantsService(request));

        request.dispose();
    },
});

export { expect } from "@playwright/test";