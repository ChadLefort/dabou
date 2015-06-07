/**
 * AdminController
 *
 * @description :: Server-side logic for managing admin end points
 */
module.exports = {

  /**
   * Scrapes WoWDB tabard pages and grabs the rest of the tabard
   * information from the battle.net api and insert that data
   * into our database to create an tabard item cache
   *
   * @param {Object} req
   * @param {Object} res
   */
  generateTabards: function (req, res) {

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
      res.send(400, {msg: error});
    });

    function create(id) {
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
              resolve(item.id);
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
