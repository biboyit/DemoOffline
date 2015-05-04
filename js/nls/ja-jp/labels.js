
define(["nls/root/labels"], function (labels) {

    function convertObject(a, name) {
        var newObject = a;
        for (var r in a) {
            if (typeof a[r] !== 'object') {
                a[r] = name + '[' + a[r] + ']';
            } else {
                a[r] = convertObject(a[r], name);
            }
        };
        return a;
    }
    return convertObject(labels, 'Japanese');

});