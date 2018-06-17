/**
* Setup the demo
* @param {org.sears.SetupDemo} setupDemo - the SetupDemo transaction
* @transaction
*/
function setupDemo(setupDemo) {
    var factory = getFactory();
    var NS = 'org.sears';
    var roles = ['manufacturers', 'distributors', 'retailers', 'customers'];
    var members = {};

    for (var role in setupDemo) {
      var type = (role.charAt(0).toUpperCase() + role.slice(1)).slice(0, -1);
      if (setupDemo[role] && roles.indexOf(role) !== -1) {
          members[role] = [];
          setupDemo[role].forEach(function(participant) {
              var newRole = factory.newResource(NS, type, participant.tradeId);
              newRole.companyName = participant.companyName;
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
