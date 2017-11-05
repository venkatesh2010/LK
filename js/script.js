// branch1
var filmArray = [];
var parseJson = function (obj) {
    try {
        return JSON.parse(obj);
    } catch (error) {
        return obj;
    }
}

var ajax = function(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
        let response = parseJson(xhr.responseText);
           handleResponse(response);
        }
    };
    xhr.open("GET","https://ghibliapi.herokuapp.com/films/", true);
    xhr.send();
}

function handleResponse(response){
    var list = document.getElementById("film-list");
    var x = document.createElement("li");
    var responseArray = Array.prototype.slice.call(response);
    responseArray.forEach((a,i)=>{
        var temp = x.cloneNode();
        temp.innerHTML = a.title;
        list.appendChild(temp);
        temp.addEventListener('click',function(){
            openModal(i);
        })
    });
    filmArray = responseArray;


}

var openModal = function(i){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState==4 && xhr.status==200){
            modal.open(parseJson(xhr.responseText));
        }
    }
    xhr.open("GET","https://ghibliapi.herokuapp.com/films/"+filmArray[i].id, true);
    xhr.send();
   

}

var modal;    
window.onload  = function(){
    console.log("window onload called");
   var confirm = document.querySelector( "#confirm" );
   //  var output = document.querySelector( "#output" );
      modal = new ConfirmBox( confirm, {
         ok: function() {
           //  console.log("closed");
         }
     });
} 