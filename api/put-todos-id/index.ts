import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoItem } from "../todoItem"

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  inputDocument: TodoItem
): Promise<void> {
  const todoItem: TodoItem = {
    id: inputDocument.id,
    priority: inputDocument.priority,
    title: inputDocument.title,
    done: req.body.done,
  }

  context.bindings.outputDocument = todoItem

  context.res = {
    status: 200,
    body: todoItem,
  }
}

export default httpTrigger
