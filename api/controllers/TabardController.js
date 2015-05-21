/**
 * TabardController
 *
 * @description :: Server-side logic for managing tabards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
	generate: function (req, res) {

		sails.fs.readFileAsync('console/tabardsIds.json', 'utf8').then(function (data) {
			var items = JSON.parse(data);
			return items;
		}).map(function (item, index) {
			sails.promiseThrottle.add(function () {
				return create(item.id);
			});
		}).then(function () {
			res.send(200, 'All tabards have been imported!');
		}).catch(function (error) {
			res.send(400, { error: error });
		});

		function create (id) {
			return new sails.Promise(function (resolve, reject) {
				sails.getItem({
					origin: 'us',
					id: id
				}).then(function (item) {
					if (item.inventoryType == 19) {
						Tabard.create({
							item: item.id,
							name: item.name
						}).then(function (item) {
							resolve(item.id)
						}).catch(function (error) {
							console.log(error);
						});
					}
				}).catch(function (error) {
					console.log(error);
				});
			});
		}

	}
};

