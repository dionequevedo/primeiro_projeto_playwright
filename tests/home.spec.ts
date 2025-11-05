import { test } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { TasksPage } from './suport/pages/tasks/index';

import data from './fixtures/tasks.json'


test('CT01 - Deve poder cadastrar, marcar e excluir uma tarefa', async ({ page, request }) => {
    // Setup
    const task: TaskModel = data.success
    const tasksPage = new TasksPage(page)
    await tasksPage.clearTask(request, task.name)
    // Teste
    await tasksPage.go()
    await tasksPage.create(task)

    await tasksPage.shouldHaveText(task.name)

    await tasksPage.toggleTask(task.name)

    await tasksPage.deleteTask(task.name)
    await tasksPage.doNotShouldHaveText(task.name)
})

test(`CT02 - Não deve permitir tarefa duplicada`, async ({ page, request }) => {
    // Setup
    const task: TaskModel = data.duplicate
    const tasksPage = new TasksPage(page)
    await tasksPage.clearTask(request, task.name)
    await tasksPage.createTaskViaAPI(request, task.name)

    // Test
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')

})

test('CT03 - Deve poder cadastrar uma nova tarefa', async ({ page, request }) => {
    // Setup
    const tasksPage = new TasksPage(page)
    let taskName = await tasksPage.taskNameGenerator()
    const task: TaskModel = {
        "name": `${taskName}`,
        "is_done": false
    }

    // Test
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)

    // Teardown
    await tasksPage.clearTask(request, task.name)
})

test('CT04 - Deve validar o campo obrigatório ao cadastrar uma tarefa', async ({ page }) => {
    // Setup
    const tasksPage = new TasksPage(page)
    const task: TaskModel = data.required
    // Test
    await tasksPage.go()
    await tasksPage.create(task)
    await tasksPage.shouldHaveRequiredFieldError('This is a required field')
})