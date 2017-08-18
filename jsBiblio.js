/*
This is a small library I am making as a learning exercise and for personal use.
Feel free to contribute and/or use this library :-)
*/

(function() {
  //getting html elements:
  getId = function(x) {
    return document.getElementById(x);
  }
  getClass = function(x) {
    return document.getElementsByClassName(x);
  }
  getTag = function(x) {
    return document.getElementsByTagName(x);
  }
  createTag = function(x) {
    return document.createElement(x);
  }
   createOptions = function(options, selectId){
     for(i in options){
       let op = createTag("option");
       op.value = options[i];
       op.innerHTML = options[i];
       getId(selectId).appendChild(op);
     }
   }
   print = function(msg){
     console.log(msg);
   }
})();
