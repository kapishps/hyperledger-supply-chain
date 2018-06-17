/**
* Setup the demo
* @param {org.sears.SetupDemo} setupDemo - the SetupDemo transaction
* @transaction
*/
function setupDemo() {
    var factory = getFactory();
    var NS = 'org.sears';
    var roles = ['manufacturers', 'distributors', 'retailers', 'customers'];
    var members = {};
    var setupDemo = {
                'manufacturers': [
                    {
                        '$class': 'org.sears.Manufacturer',
                        'tradeId': '0001',
                        'companyName': 'Kenmore',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Delhi',
                            'state': 'Delhi',
                            'country': 'India',
                            'postalCode': '111111'
                        }
                    },
                    {
                        '$class': 'org.sears.Manufacturer',
                        'tradeId': '0002',
                        'companyName': 'DieHard',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Mumbai',
                            'state': 'Maharashtra',
                            'country': 'India',
                            'postalCode': '111111'
                        }
                    },
                    {
                        '$class': 'org.sears.Manufacturer',
                        'tradeId': '0003',
                        'companyName': 'Craftsman',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Pune',
                            'state': 'Maharashtra',
                            'country': 'India',
                            'postalCode': '411014'
                        }
                    }
                ],
                'distributors': [
                    {
                        '$class': 'org.sears.Distributor',
                        'tradeId': '0011',
                        'companyName': 'D1',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Delhi',
                            'state': 'Delhi',
                            'country': 'India',
                            'postalCode': '111111'
                        }
                    },
                    {
                        '$class': 'org.sears.Distributor',
                        'tradeId': '0012',
                        'companyName': 'D2',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Mumbai',
                            'state': 'Maharashtra',
                            'country': 'India',
                            'postalCode': '111111'
                        }
                    },
                    {
                        '$class': 'org.sears.Distributor',
                        'tradeId': '0013',
                        'companyName': 'D3',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Pune',
                            'state': 'Maharashtra',
                            'country': 'India',
                            'postalCode': '411014'
                        }
                    }
                ],
                'retailers': [
                    {
                        '$class': 'org.sears.Retailer',
                        'tradeId': '0021',
                        'companyName': 'R1',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Delhi',
                            'state': 'Delhi',
                            'country': 'India',
                            'postalCode': '111111'
                        }
                    },
                    {
                        '$class': 'org.sears.Retailer',
                        'tradeId': '0022',
                        'companyName': 'R2',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Mumbai',
                            'state': 'Maharashtra',
                            'country': 'India',
                            'postalCode': '111111'
                        }
                    },
                    {
                        '$class': 'org.sears.Retailer',
                        'tradeId': '0023',
                        'companyName': 'R3',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Pune',
                            'state': 'Maharashtra',
                            'country': 'India',
                            'postalCode': '411014'
                        }
                    }
                ],
                'customers': [
                    {
                        '$class': 'org.sears.Customer',
                        'tradeId': '0031',
                        'companyName': 'Ankit',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Kharagpur',
                            'state': 'West Bengal',
                            'country': 'India',
                            'postalCode': '111111'
                        }
                    },
                    {
                        '$class': 'org.sears.Customer',
                        'tradeId': '0032',
                        'companyName': 'Kapish',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Varanasi',
                            'state': 'Uttar Pradesh',
                            'country': 'India',
                            'postalCode': '111111'
                        }
                    },
                    {
                        '$class': 'org.sears.Customer',
                        'tradeId': '0033',
                        'companyName': 'Nikhil',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Kharagpur',
                            'state': 'West Bengal',
                            'country': 'India',
                            'postalCode': '411014'
                        }
                    },
                    {
                        '$class': 'org.sears.Customer',
                        'tradeId': '0034',
                        'companyName': 'Swapnil',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Kanpur',
                            'state': 'Uttar Pradesh',
                            'country': 'India',
                            'postalCode': '411014'
                        }
                    },
                    {
                        '$class': 'org.sears.Customer',
                        'tradeId': '0035',
                        'companyName': 'Jeet',
                        'address': {
                            '$class': 'org.sears.Address',
                            'city': 'Kanpur',
                            'state': 'Uttar Pradesh',
                            'country': 'India',
                            'postalCode': '411014'
                        }
                    }
                ]
            }

    for (var role in setupDemo) {
      var type = (role.charAt(0).toUpperCase() + role.slice(1)).slice(0, -1);
      if (setupDemo[role] && roles.indexOf(role) !== -1) {
          members[role] = [];
          setupDemo[role].forEach(function(participant) {
              console.log(participant);
              var newRole = factory.newResource(NS, type, participant.tradeId);
              newRole.companyName = participant.companyName;
              var newAddress = factory.newConcept(NS, 'Address');
              newAddress.city =  participant.address.city;
              newAddress.state =  participant.address.state;
              newAddress.country =  participant.address.country;
              newAddress.postalCode =  participant.address.postalCode;
              newRole.address = newAddress;
              members[role].push(newRole);
          });
      }
    }

    return getParticipantRegistry(NS + '.Manufacturer')
        .then(function (manufacturerRegistry){
          return manufacturerRegistry.addAll(members.manufacturers);
        })
        .then(function(){
          return getParticipantRegistry(NS + '.Distributor')
        })
        .then(function (distributorRegistry){
          return distributorRegistry.addAll(members.distributors);
        })
        .then(function(){
          return getParticipantRegistry(NS + '.Retailer')
        })
        .then(function (retailersRegistry){
          return retailersRegistry.addAll(members.retailers);
        })
        .then(function(){
          return getParticipantRegistry(NS + '.Customer')
        })
        .then(function (customerRegistry){
          return customerRegistry.addAll(members.customers);
        })
}
