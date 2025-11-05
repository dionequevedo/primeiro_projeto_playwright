import { Page, Locator, expect, APIRequestContext } from '@playwright/test';
import { TaskModel } from '../../../fixtures/task.model';
import { deleteTaskByHelper, createNewTask } from '../../helpers';
import { faker } from '@faker-js/faker';

export class TasksPage {
    readonly page: Page
    readonly inputTaskName: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator(`input[class*=InputNewTask]`)
    }

    async taskNameGenerator() {
        return faker.lorem.words(3);
    }

    async go() {
        await this.page.goto('http://localhost:8080')
        await expect(this.page).toHaveTitle(`Gerencie suas tarefas com Mark L`)
    }

    async create(task: TaskModel) {
        const buttonAddName = this.page.locator(`button[class*=listButtonNewTask]`)

        await this.inputTaskName.fill(task.name)
        await buttonAddName.click()

    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`//div[@data-testid="task-item"]/p[text()="${taskName}"]`)
        await expect(target).toBeVisible()
    }

    async doNotShouldHaveText(taskName: string) {
        const target = this.page.locator(`//div[@data-testid="task-item"]/p[text()="${taskName}"]`)
        await expect(target).not.toBeVisible()
    }

    async deleteTask(taskName: string) {
        const exclusionButton = this.page.locator(`//p[text()="${taskName}"]/following::button[contains(@class, "listItemDeleteButton")]`)
        await exclusionButton.click()
    }

    async toggleTask(taskName: string) {
        const buttonSelect = this.page.locator(`//p[text()="${taskName}"]/preceding::button[contains(@class, "listItemToggle")][1]`)
        await buttonSelect.click()
    }

    async clearTask(request: APIRequestContext, taskName: string) {
        await deleteTaskByHelper(request, taskName)
    }

    async createTaskViaAPI(request: APIRequestContext, taskName: string) {
        await createNewTask(request, taskName)
    }

    async alertHaveText(taskName: string) {
        const newTarget = this.page.locator(`//div[contains(@class,"html-container") and text()="${taskName}"]`)
        await expect(newTarget).toBeVisible()
    }

    async shouldHaveRequiredFieldError(errorMessage: string) {
        const validateMessage = await this.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage);
        expect(validateMessage).toEqual(errorMessage);
    }
    
}