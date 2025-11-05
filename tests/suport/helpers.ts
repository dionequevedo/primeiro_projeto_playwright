import { expect, APIRequestContext } from "@playwright/test";
import { TaskModel } from "../fixtures/task.model";
import { log } from "console";

export async function createNewTask(request: APIRequestContext, taskName: string) {
    const task: TaskModel ={
        name: taskName,
        is_done: false
    }
    let result = await request.post('http://localhost:3333/tasks/', {data: task})
    //log(result)
    expect(result.ok()).toBeTruthy()
}

export async function deleteTaskByHelper(request: APIRequestContext, task: string) {
    let result = await request.delete(`http://localhost:3333/helper/tasks/${task}`)
    expect(result.ok()).toBeTruthy()
}