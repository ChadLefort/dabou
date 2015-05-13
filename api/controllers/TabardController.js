/**
 * TabardController
 *
 * @description :: Server-side logic for managing tabards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res) {
		var item = req.param('item');
		
		sails.bnet.wow.item.item({
	      origin: 'us', 
	      id: item
	    }, function (err, item) {
	        if (item.inventoryType == 19) {
				Tabard.create({
					item: item.id,
					name: item.name
				}, function (err, item) {
					if (err) {
		        		res.send(400);
					} else {
						res.send(200);
					}
				});
			}
	    });
	  }, 
	  
	  find: function(req, res) {
		  Tabard.find(function(err, items) {
			  var itemsId = [];
			  for (var i = 1; i < items.length; i++) {
				  itemsId.push({id: items[i].item, name: items[i].name});
			  }
			  res.send(200, {items: itemsId});
		  });
	  }
};

