import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { PlantCardComponent } from "./plant-card.component";

export class FavoritePage extends BasePage {
    readonly title: Locator;
    readonly plantCards: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.getByRole("heading", { name: "Ulubione rośliny" });
        this.plantCards = page.getByTestId("plant-card");
    }

    async open() {
        await super.open("/my-plants");
    }

    async getCardsCount() {
        return this.plantCards.count();
    }

    getPlantCardByName(plantName: string): PlantCardComponent {
        const plantCard = this.plantCards.filter({ has: this.page.getByTestId("card-title").filter({ hasText: plantName }) }).first();

        return new PlantCardComponent(plantCard);
    }

}