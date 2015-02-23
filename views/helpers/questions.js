var Handlebars = require('handlebars');

Handlebars.registerHelper('multiList', function(items, options) {
    var ret = '';

    for (x in items) {
        ret += '<p><input type="checkbox" name="question" value="' + x + '"> '
        + items[x] + '</p>';
    }

    return ret;
});

Handlebars.registerHelper('list', function(items, options) {
    var ret = '';

    for (x in items) {
        ret += '<p><input type="radio" name="question" value="' + x + '"> '
        + items[x] + '</p>';
    }

    return ret;
});
