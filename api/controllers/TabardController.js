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
					item: item.id
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
};

