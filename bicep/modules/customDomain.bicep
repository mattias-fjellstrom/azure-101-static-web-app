param customDomainName string
param dnsZoneName string

resource staticWebApp 'Microsoft.Web/staticSites@2021-01-15' existing = {
  name: 'swa-${uniqueString(resourceGroup().id)}'

  resource prodCustomDomain 'customDomains' = {
    name: '${customDomainName}.${dnsZoneName}'
  }
}
