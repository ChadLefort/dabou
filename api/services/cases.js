/**
 * Cases
 *
 * @description :: Helper functions for cases
 */
module.exports = {
    toTitleCase: function(str) {
        var output,
            lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
                'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'
            ];

        output = str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

        _.each(lowers, function(value, key) {
            output = output.replace(new RegExp('\\s' + lowers[key] + '\\s', 'g'),
                function(txt) {
                    return txt.toLowerCase();
                });
        });

        return output;
    }
};
