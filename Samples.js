var UserFavourite = Parse.Object.extend("UserFavourite");
var queryFavourite = new Parse.Query(UserFavourite);

var userArray = [];
var TestItem = Parse.Object.extend("TestItem");
var query = new Parse.Query(TestItem);
query.limit(1000);
query.equalTo('school', 'Union College (NY)');
query.find().then(function (results) {
    return results;
}).then(function (results) {
    var promises = [];
    for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var item = object.get('item');
        var school = object.get('school');
        var meal = object.get('meal');

        var UserFavourite = Parse.Object.extend("UserFavourite");
        var queryFavourite = new Parse.Query(UserFavourite);
        queryFavourite.equalTo("item", item);
        queryFavourite.equalTo("school", school);
        var prom = queryFavourite.find().then(function (users) {
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                var userID = user.get('user').id;
                if (userArray.indexOf(userID) === -1) {
                    userArray.push(userID);
                }
                //                  console.log(userArray);
                return userArray;
            }
            return userArray;
        });
        promises.push(prom);
        console.log('sadf ' + userArray);
    }
    console.log('sadf ' + userArray);
    return Parse.Promise.when.apply(Parse.Promise, promises);
}).then(function () {
    console.log(userArray);
});
