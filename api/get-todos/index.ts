import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TodoItem } from "../todoItem"

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  documents: TodoItem[]
): Promise<void> {
  context.res.json({
    status: 200,
    items: documents,
  })
}

export default httpTrigger
