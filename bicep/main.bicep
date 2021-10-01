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

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-static-web-app-${uniqueString(deploymentTimestamp)}'
  location: location
}

module staticWebApp 'modules/staticWebApp.bicep' = {
  scope: rg
  name: '${deploymentTimestamp}-static-web-app-module'
  dependsOn: [
    dns
  ]
  params: {
    customDomainName: customDomainName
    dnsZoneName: dnsZoneName
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
  }
}
