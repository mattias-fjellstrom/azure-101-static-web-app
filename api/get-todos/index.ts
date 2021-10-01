import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { sampleData } from "../todoItem"

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res.json({
    statusCode: 200,
    items: sampleData,
  })
}

export default httpTrigger
