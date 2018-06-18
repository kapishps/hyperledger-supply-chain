/**
 * Track the trade of a commodity from one trader to another
 * @param {org.sears.TransferCommodity} trade - the trade to be processed
 * @transaction
 */
function transferCommodity (trade) {
    console.log(trade);

    var NS = 'org.sears';
    var factory = getFactory();

    var me = getCurrentParticipant();
    // if (trade.issuer && me.getFullyQualifiedIdentifier() !== trade.issuer.getFullyQualifiedIdentifier()) {
    //     throw new Error('The issuer that you signed does not match your identity!');
    // }

    trade.commodity.issuer = me;
    trade.commodity.owner = trade.newOwner;
    trade.commodity.purchaseOrder = trade.purchaseOrder;

    var newTrace = factory.newConcept(NS, 'Trace');
    newTrace.timestamp = new Date();
    newTrace.location = trade.shipperLocation;
    newTrace.company = me;
    trade.commodity.trace.push(newTrace);


   	return getAssetRegistry('org.sears.Commodity')
   		.then(function (assetRegistry) {
       		return assetRegistry.update(trade.commodity);
     	});
 }

/**
 * Initiate PO from one trader to another
 * @param {org.sears.InitiatePO} InitiatePO - the InitiatePO to be processed
 * @transaction
*/
function initiatePurchaseOrder (InitiatePO) {
    console.log('InitiatePO');

    var factory = getFactory();
    var NS = 'org.sears';

    var me = getCurrentParticipant();
    // if ( InitiatePO.orderer && me.getFullyQualifiedIdentifier() !== InitiatePO.orderer.getFullyQualifiedIdentifier()) {
    //     throw new Error('The orderer that you signed does not match your identity!');
    // }

    var order = factory.newResource(NS, 'PO', InitiatePO.orderId);
    order.itemList = InitiatePO.itemList;
    if (InitiatePO.orderTotalPrice) {
        order.orderTotalPrice = InitiatePO.orderTotalPrice;
    }
    order.orderStatus = 'INITIATED';
    order.orderer = me;
    order.vender = InitiatePO.vender;

   	return getAssetRegistry(order.getFullyQualifiedType())
   		.then(function (assetRegistry) {
       		return assetRegistry.add(order);
     	});
 }


/**
* Track the trade of a commodity from one trader to another
* @param {org.sears.MakeBox} boxDetails - the trade to be processed
* @transaction
*/
function makeBox (boxDetails) {
    console.log(boxDetails);

    var NS = 'org.sears';
    var factory = getFactory();

    var me = getCurrentParticipant();

    var newBox = factory.newResource(NS, 'Box', boxDetails.boxId);
    newBox.name = boxDetails.name;
    newBox.description = boxDetails.description;
    newBox.issuer = me;
    newBox.owner = boxDetails.owner;
    newBox.itemList = boxDetails.itemList;

    var traces = []
    var newTrace = factory.newConcept(NS, 'Trace');
    newTrace.timestamp = new Date();
    newTrace.company = me;
    newTrace.location = factory.newConcept(NS, 'Address');
    traces.push(newTrace);
    newBox.trace = traces;

    newBox.itemList.forEach(function(item) {
        item.boxId = boxDetails.boxId;
    });

    return getAssetRegistry('org.sears.Commodity')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll(newBox.itemList);
         })
        .then(function(){
            return getAssetRegistry('org.sears.Box')
        })
        .then(function (assetRegistry) {
            return assetRegistry.add(newBox);
         });

}


/**
* Track the trade of a commodity from one trader to another
* @param {org.sears.UnBox} boxDetails - the trade to be processed
* @transaction
*/
  function unBox (boxDetails) {
      console.log(boxDetails);

      var NS = 'org.sears';
      var factory = getFactory();

      var me = getCurrentParticipant();


      return getAssetRegistry('org.sears.Box')
          .then(function (assetRegistry) {
              return assetRegistry.get(boxDetails.boxId);
          })
          .then(function (box) {
          		console.log(box);
                box.itemList.forEach(function(item) {
                    item.boxId = null;
                    box.trace.forEach(function(t){
                        item.trace.push(t);
                    });
                });

                return getAssetRegistry('org.sears.Commodity')
                .then(function (assetRegistry) {
                    return assetRegistry.updateAll(box.itemList);
                 })
                .then(function(){
                    return getAssetRegistry('org.sears.Box')
                 })
                .then(function (assetRegistry) {
                    box.itemList = [];
                    return assetRegistry.update(box);
                 });
          })
   }
