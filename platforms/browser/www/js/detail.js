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
var request = window.indexedDB.open("RestaurantDB", 1);

function deleteRestaurant() {
   var request = db.transaction(["restaurant"], "readwrite")
   .objectStore("restaurant")
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
   var transaction = db.transaction(["restaurant"]);
   var objectStore = transaction.objectStore("restaurant");
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
            result =" Oke"
            break;
         case "3":
            result = "Good"
            break;
         case "4": 
         result ="excellent"
            break;
      }
      return result;
   }
   function displayWithColor(id, getResult) {
      switch (getResult) {
         case "1": 
         $(id).text(conver(getResult)).css('color','red')
         break;
         case "2":
            $(id).text(conver(getResult)).css('color','orange')
            break;
         case "3":
            $(id).text(conver(getResult)).css('color','#ebbd34')
            break;
         case "4": 
         $(id).text(conver(getResult)).css('color','green')
            break;
      }
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
        displayWithColor(".rFood",request1.result.foodQuality)
        displayWithColor(".rClean",request1.result.cleanLiness)
        displayWithColor(".rService",request1.result.service)
      //   $(".rFood").text(conver(request1.result.foodQuality))
      //   $(".rClean").text(conver(request1.result.cleanLiness))
      //   $(".rService").text(conver(request1.result.service))
      if(request1.result.result == "Need to improve"){
         $(".rResult").text(request1.result.result).css('color','red')
      } else if(request1.result.result == "Oke") {
         $(".rResult").text(request1.result.result).css('color','orange')
      } else if(request1.result.result == "Good"){
         $(".rResult").text(request1.result.result).css('color','#ebbd34')
      }else{
         $(".rResult").text(request1.result.result).css('color','green')
      }
        $(".note").text(request1.result.note)
        $(".rReposter").text(request1.result.reporter)
      } else {
         alert("Kenny couldn't be found in your database!");
      }
   };
};
