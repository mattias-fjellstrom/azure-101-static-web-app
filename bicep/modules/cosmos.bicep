var databaseName = 'db-${uniqueString(resourceGroup().id)}'
var containerName = 'container-${uniqueString(resourceGroup().id)}'

resource account 'Microsoft.DocumentDB/databaseAccounts@2021-06-15' = {
  name: 'cosmos-${uniqueString(resourceGroup().id)}'
  location: resourceGroup().location
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: resourceGroup().location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    capabilities: [
      {
        name: 'EnableServerless'
      }
    ]
  }

  resource database 'sqlDatabases' = {
    name: databaseName
    properties: {
      resource: {
        id: databaseName
      }
    }

    resource container 'containers' = {
      name: containerName
      properties: {
        resource: {
          id: containerName
          partitionKey: {
            kind: 'Hash'
            paths: [
              '/id'
            ]
          }
        }
      }
    }
  }
}

output databaseName string = databaseName
output containerName string = containerName
output connectionString string = account.listConnectionStrings().connectionStrings[0].connectionString
