/**
 * TabardController
 *
 * @description :: Server-side logic for managing tabards
 */
module.exports = {
	
	/**
     * Counts the number of tabard records
     *
     * @param {Object} req
     * @param {Object} res
     */
    count: function(req, res) {
    	Tabard.count().then(function (data) {
    		res.send({count: data});
    	}).catch(function (error) {
    		console.log(error);
    	})
    }
};

