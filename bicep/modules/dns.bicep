param dnsZoneName string
param customDomainName string

resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' existing = {
  name: dnsZoneName

  resource cname 'CNAME' = {
    name: customDomainName
  }
}
