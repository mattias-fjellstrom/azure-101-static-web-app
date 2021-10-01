resource staticWebApp 'Microsoft.Web/staticSites@2021-01-15' = {
  name: 'swa-${uniqueString(resourceGroup().id)}'
  location: resourceGroup().location
  sku: {
    tier: 'Standard'
    name: 'Standard'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {}
}

output hostname string = staticWebApp.properties.defaultHostname
