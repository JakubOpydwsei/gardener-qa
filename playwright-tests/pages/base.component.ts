import { Page } from "@playwright/test";

export class BaseComponent {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}