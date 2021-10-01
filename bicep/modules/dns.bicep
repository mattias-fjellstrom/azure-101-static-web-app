param dnsZoneName string
param customDomainName string
param targetHostname string

resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' existing = {
  name: dnsZoneName

  resource cname 'CNAME' = {
    name: customDomainName
    properties: {
      CNAMERecord: {
        cname: targetHostname
      }
    }
  }
}
