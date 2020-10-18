function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var id = getUrlVars()["id"];
const storeID = id;
var db;
var request = window.indexedDB.open("newDatabase", 1);

function cancel() {
    window.location = `detail.html?id=${id}` 
}

function save() {
    var objectStore = db.transaction(["employee"], "readwrite").objectStore("employee");
    var request = objectStore.get(parseInt(id));
    request.onerror = function (event) {
        // Handle errors!
    };
    request.onsuccess = function (event) {
        var restaurant = event.target.result;
        restaurant.name =  $(".name").val()
        restaurant.type =$(".type").val()
        restaurant.date =$(".date").val()
        restaurant.price =$(".price").val()
        restaurant.service =$("#foodRating").find(":selected").val()
        restaurant.cleanLiness = $("#cleanlinessRatingRate").find(":selected").val()
        restaurant.foodQuality = $("#serviceRatingRate").find(":selected").val()
        // Put this updated object back into the database.
        var requestUpdate = objectStore.put(restaurant);
        requestUpdate.onerror = function (event) {
            // Do something with the error
        };
        requestUpdate.onsuccess = function (event) {
            alert("Update success")
            window.location = "detail.html?id=" + id

        };
    };
}

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    var transaction = db.transaction(["employee"]);
    var objectStore = transaction.objectStore("employee");
    var request1 = objectStore.get(parseInt(id));

    request1.onerror = function (event) {
        alert("Unable to retrieve daa from database!");
    };

    request1.onsuccess = function (event) {
        // Do something with the request.result!
        if (request1.result) {
            $(".name").val(request1.result.name)
            $(".type").val(request1.result.type)
            $(".date").val(request1.result.date)
            $(".price").val(request1.result.price)
            $("#foodRating").val(request1.result.service).selectmenu('refresh');
            $("#cleanlinessRatingRate").val(request1.result.cleanLiness).selectmenu('refresh');
            $("#serviceRatingRate").val(request1.result.foodQuality).selectmenu('refresh');
            console.log(request1.result.reporter);
            $("#textarea").val(request1.result.note)
            $("#reporter").val(request1.result.reporter)
        } else {
            alert("Kenny couldn't be found in your database!");
        }
    };
};
