import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoItem } from "../todoItem"
import { v4 as uuidv4 } from "uuid"

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoItem: TodoItem = {
    id: uuidv4(),
    title: req.body.title,
    priority: req.body.priority,
    done: false,
  }

  context.bindings.outputDocument = todoItem

  context.res = {
    status: 201,
    body: todoItem,
  }
}

export default httpTrigger
