import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, createNewTask } from './suport/helpers';

const taskName = faker.lorem.words(3);

test('CT01 - Deve poder cadastrar, marcar e excluir uma tarefa - busca por aproximação', async ({ page, request }) => {

    const task: TaskModel = {
        name: 'Ler um livro sobre TypeScript',
        is_done: false
    }
    const inputTaskName = page.locator(`input[class*=InputNewTask]`)
    const buttonAddName = page.locator(`button[class*=listButtonNewTask]`)
    const target = page.locator(`//div[@data-testid="task-item"]/p[text()="${task.name}"]`)
    const buttonSelect = page.locator(`//p[text()="${task.name}"]/preceding::button[contains(@class, "listItemToggle")][1]`)
    const exclusionButton = page.locator(`//p[text()="${task.name}"]/following::button[contains(@class, "listItemDeleteButton")]`)


    await deleteTaskByHelper(request, task.name)

    await page.goto('http://localhost:8080');
    await expect(page).toHaveTitle(`Gerencie suas tarefas com Mark L`);

    await inputTaskName.fill(task.name)
    await buttonAddName.click()

    await expect(target).toBeVisible()

    await buttonSelect.click()

    await exclusionButton.click()
    await expect(target).not.toBeVisible()
})

test(`CT02 - Não deve permitir tarefa duplicada`, async ({ page, request }) => {
    /* constantes */

    const inputTaskName = page.locator(`input[class*=InputNewTask]`)

    const task: TaskModel = {
        "name": "Teste de duplicidade",
        "is_done": false
    }

    await deleteTaskByHelper(request, task.name)
    await createNewTask(request, task.name)

    const buttonAddName = page.locator(`button[class*=listButtonNewTask]`)
    const newTarget = page.locator('//div[contains(@class,"html-container") and text()="Task already exists!"]')

    await page.goto('http://localhost:8080');
    await expect(page).toHaveTitle(`Gerencie suas tarefas com Mark L`);

    await inputTaskName.fill(task.name)
    await buttonAddName.click()
    await expect(newTarget).toBeVisible()

    await deleteTaskByHelper(request, task.name)

})

test('CT03 - Deve poder cadastrar uma nova tarefa - busca por xpath', async ({ page, request }) => {
    await deleteTaskByHelper(request, taskName)
    await page.goto('http://localhost:8080');

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    const buttonAddName = page.locator('//button[contains(text(),("Create"))]')


    await inputTaskName.fill(`${taskName}`)
    await buttonAddName.click()
    await deleteTaskByHelper(request, taskName)
})

test('CT04 - Deve poder cadastrar uma nova tarefa - busca por css', async ({ page, request }) => {
    await deleteTaskByHelper(request, taskName)
    await page.goto('http://localhost:8080');

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    const buttonAddName = page.locator('css=button >> text=Create')


    await inputTaskName.fill(`${taskName}`)
    await buttonAddName.click()
    await deleteTaskByHelper(request, taskName)
})

test('CT05 - Deve poder cadastrar uma nova tarefa - usando press', async ({ page, request }) => {
    await deleteTaskByHelper(request, taskName)
    await page.goto('http://localhost:8080');

    const inputTaskName = page.locator('input[class*=InputNewTask]')

    await inputTaskName.fill(`${taskName}`)
    await inputTaskName.press('Enter')

    await deleteTaskByHelper(request, taskName)
})