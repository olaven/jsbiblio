/*
This is a small library I am making as a learning exercise and for personal use.
Feel free to contribute and/or use this library :-)
*/

(function() {
    //getting html elements:
    get = {
      id: function(x){
        return document.getElementById(x);
      },
      class: function(x){
        return document.getElementsByClassName(x);
      },
      tag: function(x){
        return document.getElementsByTagName(x);
      },
    }
    //creating html elements.
    create = {
      element: function(x){
        return document.createElement(x);
      },
      table: function(data, tableId){
        get.id(tableId).innerHTML = "";
        for(i in data){
          let tr = create.element("tr");
          for(x in data[i]){
            let td = create.element("td");
            td.innerHTML = data[i][x];
            tr.appendChild(td);
          }
          get.id(tableId).appendChild(tr)
        }
      },
      options: function(options, selectId){
        for(i in options){
          let op = create.element("option");
          op.value = options[i];
          op.innerHTML = options[i];
          get.id(selectId).appendChild(op);
         }
       },
       graph: function(data, fieldId){
         /*"data" need to be an array of ojbects, with info about each
         datapoint.
         i.e. data[0] = {num: 10, text: "descriptive text"}*/
         let canvas = create.element("canvas");
         let ctx = canvas.getContext("2d");

         let pilars_amount = data.length;
         let xPos = 0; //before loops, where they are incremented

         for(i in data){
           //fill colors
           ctx.fillStyle = colors.bright[Math.floor(Math.random()*colors.bright.length)]; // NOTE: replace with "random" method, in the same ways as "get" and "create"
           //pilars
           ctx.fillRect(xPos,150,300/pilars_amount,-arr[i].num);
           //tekst
           ctx.font = "20px monospace";
           ctx.fillText(arr[i].text, xPos, 30);
           ctx.fill();
           ctx.stroke();

           xPos += 300 / antallStolper;
         }
         get.id(fieldId).appendChild(canvas);
       }
    }
    //calculations
    random = { // NOTE: not done 
      //randombetween, random, severalrandom(return arr, amount as argument)
    }
    geometry = { // NOTE: proof of concept, not done -> add more
      //circumference, areal etc as subobject with shape as method
      circumference: {
        circle: function(radius){
          return radius * 2 * Math.PI;
        },
      },
      areal: {
        circle: function(radius){
          return radius * radius * Math.PI;
        }
      }
    }
    //practical data/arrays/related
    colors = {
      dark: ["rgb(23, 142, 168)","rgb(132, 16, 144)","rgb(66, 142, 19)",
      "rgb(223, 185, 22)","rgb(182, 12, 181)","rgb(73, 218, 7)","rgb(59, 18, 161)",
      "rgb(207, 43, 247)","rgb(215, 22, 22)"],
      bright: ["rgb(174, 127, 209)","rgb(187, 113, 175)","rgb(160, 231, 80)",
      "rgb(201, 138, 92)","rgb(104, 151, 187)","rgb(207, 203, 113)","rgb(107, 219, 235)",
      "rgb(92, 93, 124)","rgb(216, 230, 104)"],
    };
   print = function(msg){
     console.log(msg);
    }
})();
