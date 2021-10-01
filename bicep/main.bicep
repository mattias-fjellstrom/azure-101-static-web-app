targetScope = 'subscription'

@description('Limited number of regions supported for Static Web Apps')
@allowed([
  'centralus'
  'eastus2'
  'eastasia'
  'westeurope'
  'westus2'
])
param location string = 'westeurope'

param deploymentTimestamp string = utcNow()

@description('Name of the resource group where the DNS zone is located')
param dnsZoneResourceGroupName string

@description('Name of the DNS zone')
param dnsZoneName string

@description('Custom domain prefix (XXX.<dns zone>)')
param customDomainName string

var github = json(loadTextContent('../.github_configuration'))

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-static-web-app-${uniqueString(subscription().id, deployment().name)}'
  location: location
}

module staticWebApp 'modules/staticWebApp.bicep' = {
  scope: rg
  name: '${deploymentTimestamp}-static-web-app-module'
  params: {
    gitHubRepositoryName: github.repositoryName
    gitHubUsername: github.username
    gitHubRepositoryToken: github.repositoryToken
  }
}

module cosmos 'modules/cosmos.bicep' = {
  scope: rg
  name: '${deploymentTimestamp}-cosmos-db-module'
}

resource dnsResourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' existing = {
  name: dnsZoneResourceGroupName
}

module dns 'modules/dns.bicep' = {
  scope: dnsResourceGroup
  name: '${deploymentTimestamp}-dns-module'
  params: {
    customDomainName: customDomainName
    dnsZoneName: dnsZoneName
    targetHostname: staticWebApp.outputs.hostname
  }
}

module customDomain 'modules/customDomain.bicep' = {
  scope: rg
  name: '${deploymentTimestamp}-custom-domain-module'
  params: {
    staticWebAppName: staticWebApp.outputs.staticWebAppName
    customDomainName: customDomainName
    dnsZoneName: dnsZoneName
  }
  dependsOn: [
    dns
  ]
}
