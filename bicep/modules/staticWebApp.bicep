param gitHubUsername string
param gitHubRepositoryName string
param gitHubBranchName string = 'main'

@secure()
param gitHubRepositoryToken string

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
  properties: {
    repositoryUrl: 'https://github.com/${gitHubUsername}/${gitHubRepositoryName}'
    branch: gitHubBranchName
    repositoryToken: gitHubRepositoryToken
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    buildProperties: {
      githubActionSecretNameOverride: 'AZURE_STATIC_WEB_APPS_API_TOKEN'
      skipGithubActionWorkflowGeneration: true
    }
  }
}

output hostname string = staticWebApp.properties.defaultHostname
