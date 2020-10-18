var name;
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
function cancel() {
   window.location = `index.html`
}
var id = getUrlVars()["id"];
const storeID = id;
var db;
var request = window.indexedDB.open("newDatabase", 1);

function deleteRestaurant() {
   var request = db.transaction(["employee"], "readwrite")
   .objectStore("employee")
   .delete(parseInt(id));
   
   request.onsuccess = function(event) {
      alert( name+ "entry has been removed from your database.");
      window.location = `index.html`

   };
}

function get_value() {
   window.location = `edit.html?id=${storeID}`
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

   function conver(str) {
      switch(str) {
         case "1": 
         result = "Need to improve"
         break;
         case "2":
            console.log("das");

            result =" Oke"
            break;
         case "3":
            result = "good"
            break;
         case "4": 
         result ="excellent"
            break;
      }
      return result;
   }

   request1.onsuccess = function (event) {
      // Do something with the request.result!
      if (request1.result) {
         // alert(request1.result.name)
         name = request1.result.name
        $(".rName").text(request1.result.name)
        $(".rType").text(request1.result.type)
        $(".rDate").text(request1.result.date)
        $(".rPrice").text(request1.result.price)
        $(".rFood").text(conver(request1.result.foodQuality))
        $(".rClean").text(conver(request1.result.cleanLiness))
        $(".rService").text(conver(request1.result.service))
        $(".rResult").text(request1.result.result)
        $(".note").text(request1.result.note)
        $(".rReposter").text(request1.result.reporter)
        console.log(conver(request1.result.service));

      } else {
         alert("Kenny couldn't be found in your database!");
      }
   };
};
