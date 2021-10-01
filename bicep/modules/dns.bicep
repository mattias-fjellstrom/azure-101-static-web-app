param dnsZoneName string
param customDomainName string
param targetHostname string

resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' existing = {
  name: dnsZoneName

  resource cname 'CNAME' = {
    name: customDomainName
    properties: {
      TTL: 3600
      CNAMERecord: {
        cname: targetHostname
      }
    }
  }
}
