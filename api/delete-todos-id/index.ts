import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos"
import { CONNECTION_STRING, DATABASE, CONTAINER } from "./env"

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const documentId = context.bindingData.id
  context.log("Document ID", documentId)
  const client = new CosmosClient(CONNECTION_STRING)

  try {
    await client
      .database(DATABASE)
      .container(CONTAINER)
      .item(documentId, documentId)
      .delete()
    context.res = {
      status: 200,
    }
  } catch (err) {
    context.res = {
      status: 404,
    }
  }
}

export default httpTrigger
