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
      between: function(from, to){
        return Math.floor(Math.random()*(to-from+1)+from);
      },
      //returns a random number below 0 and specified
      below: function(to){
        Math.random()*to;
      },
      array: function(amount){
        var arr = [];
        for(i = 0; i < amount; i++){
          arr.push(Math.random());
        }
        return arr;
      }
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
      },
      volume: {
        cube: function(x, y, z){
          return x * y * z;
        }
      }
    }
    parse = {
      bit: function(bitword) {//parsing bitword (1010) to decimal (10)
        //first: converting to string so that it can be iterated through
        if (isBinary(bitword)) {
          var decimal = 0;
          bitword = (typeof bitword != String ? bitword.toString() : bitword);
          for(i in bitword){
            if (bitword[i] === "1") {
              console.log(typeof bitword);
              decimal += Math.pow(2, i);
            }
          }

          return decimal;

        } else {
          throw "argument must consist of 1's and 0's"
        }
      },
      decimal: function(num) {//parsing decimal number to string of bits
        // NOTE: NOT DONE 
      },
      int: function(string) {
        return parseInt(string);
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
   //NOT CATEGORIZED YET
   checkDuplicates = function(array){
    //returns an object with results
    var found = [];
    for(i in array){
      var index = array[i];
      found[index] = 0;
    }
    for(i in array){
      var index = array[i];
      found[index] += 1;
    }
    return found;
   }
   shuffleArray = function(array){ //source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;

   }
   print = function(msg){
     console.log(msg);
    }
    Array.prototype.flatten = function(){ // NOTE: needs more work, not done
    let returning_arr = [];
    console.log(this);
    for(i in this){
      switch (typeof this[i]) {
        case 'function':
            //do nothing
          break;
        case 'array':
            //be clever
            for(x in this[i]){
              returning_arr.push(this[i][x]);
            }
          break;
        default:
          returning_arr.push(this[i]);
      }
    }
    return returning_arr;
    /*
      make an array.flatten. This method should transform twodimensional
      arrays to onedimensjonal arrays:
        var twodim = [[1,2,3,4], [11,22,33,44]];
        var onedim = todim.flatten();
        //onedim = [1,2,3,4,11,22,33,44];
    */
  }
  isBinary = function(binary){
    if (typeof binary != String) {
      binary = binary.toString();
    }
    for(i in binary){
      if (binary[i] != "0" && binary[i] != "1") {
        return false;
      }
    }
    return true;
  }
})();
