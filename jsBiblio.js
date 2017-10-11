/*
This is a small library I am making as a learning exercise and for personal use.
Feel free to contribute and/or use this library :-)
*/
/*

*/
(function() {
  love = function() {
    return '<3';
  };

  //getting html elements:
  get = {
    id: function(x) {
      return document.getElementById(x);
    },
    class: function(x) {
      return document.getElementsByClassName(x);
    },
    tag: function(x) {
      return document.getElementsByTagName(x);
    }
  };
  //creating html elements.
  create = {
    element: function(x) {
      return document.createElement(x);
    },
    table: function(data, tableId) {
      get.id(tableId).innerHTML = '';

      for (i in data) {
        tr = create.element('tr');
        for (x in data[i]) {
          let td = create.element('td');
          td.innerHTML = data[i][x];
          tr.appendChild(td);
        }
        get.id(tableId).appendChild(tr);
      }
    },
    input: function() {
      // NOTE: Test this
      return create.element('input');
    },
    options: function(options, selectId) {
      for (i in options) {
        let op = create.element('option');
        op.value = options[i];
        op.innerHTML = options[i];
        get.id(selectId).appendChild(op);
      }
    },
    graph: function(data, fieldId) {
      /*"data" need to be an array of ojbects, with info about each
         datapoint.
         i.e. data[0] = {num: 10, text: "descriptive text"}*/
      let canvas = create.element('canvas');
      let ctx = canvas.getContext('2d');

      let pilars_amount = data.length;
      let xPos = 0; //before loops, where they are incremented

      for (i in data) {
        //fill colors
        ctx.fillStyle =
          colors.bright[Math.floor(Math.random() * colors.bright.length)]; // NOTE: replace with "random" method, in the same ways as "get" and "create"
        //pilars
        ctx.fillRect(xPos, 150, 300 / pilars_amount, -arr[i].num);
        //tekst
        ctx.font = '20px monospace';
        ctx.fillText(arr[i].text, xPos, 30);
        ctx.fill();
        ctx.stroke();

        xPos += 300 / antallStolper;
      }
      get.id(fieldId).appendChild(canvas);
    }
  };
  //calculations
  random = {
    // NOTE: not done
    between: function(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    },
    //returns a random number below 0 and specified
    below: function(to) {
      Math.random() * to;
    },
    array: function(amount) {
      var arr = [];
      for (i = 0; i < amount; i++) {
        arr.push(Math.random());
      }
      return arr;
    }
  };
  geometry = {
    // NOTE: proof of concept, not done -> add more
    //circumference, areal etc as subobject with shape as method
    circumference: {
      circle: function(radius) {
        return radius * 2 * Math.PI;
      }
    },
    areal: {
      circle: function(radius) {
        return radius * radius * Math.PI;
      },
      triangle: function(bottom, height) {
        return bottom * height / 2;
      },
      square: function(side) {
        return side * side;
      },
      rectangle: function(sideX, sideY) {
        return sideX * sideY;
      }
    },
    volume: {
      cube: function(x, y, z) {
        return x * y * z;
      },
      sphere: function(radius) {
        return 4 / 3 * Math.PI * Math.pow(radius, 3);
      },
      pyramid: function(Bottomareal, height) {
        /*comcluded not to use sides of bottom because that can be
          by using a combination of this method and the
          "geometry.areal.triangle"-method.
          Subject to change*/
        return Bottomareal * height / 3;
      },
      cone: function(radius, height) {
        return geometry.areal.circle(radius) * height;
      }
    }
  };
  parse = {
    bit: function(bitword) {
      //parsing bitword (1010) to decimal (10)
      //first: converting to string so that it can be iterated through
      if (is.binary(bitword)) {
        var decimal = 0;
        bitword = typeof bitword != String ? bitword.toString() : bitword;
        for (i in bitword) {
          if (bitword[i] === '1') {
            console.log(typeof bitword);
            decimal += Math.pow(2, i);
          }
        }
        return decimal;
      } else {
        throw "argument must consist of 1's and 0's";
      }
    },
    decimal: function(num) {
      //parsing decimal number to string of bits
      // NOTE: NOT DONE
    },
    int: function(string) {
      return parseInt(string);
    }
  };
  /*shoud containt methods that return either "true" or "false"*/
  is = {
    //checks if the number is odd
    odd: function(num) {
      if (num % 2 === 0) {
        return false;
      }
      return true;
    },
    //checks if the number is even
    even: function(num) {
      if (num % 2 === 0) {
        return true;
      }
      return false;
    },
    //checks if number is prime
    prime: function(num) {
      /*
          A prime number (or a prime) is a natural number
          greater than 1 that has no positive divisors other t
          han 1 and itself -> https://en.wikipedia.org/wiki/List_of_prime_numbers
        */
      if (num <= 1) {
        // https://gist.github.com/earlonrails/3c623e14c6014529809309b3cb34bc00
        return false;
      }
      let sqrtN = parseInt(Math.sqrt(num));
      for (let i = sqrtN; i > 1; i--) {
        if (num % i == 0) {
          return false;
        }
      }
      return true;
    },
    //checks if the number looks like a binary number
    binary: function(binaryInput) {
      if (typeof binaryInput != String) {
        binaryInput = binaryInput.toString();
      }
      for (i in binaryInput) {
        if (binaryInput[i] != '0' && binaryInput[i] != '1') {
          return false;
        }
      }
      return true;
    },
    //expects number. checks if positive
    positive: function(num) {
      if (num >= 0) {
        return true;
      }
      return false;
    },
    //expects number. checks if negative
    //--> somewhat redundant, but it makes sense from a readable perspective
    negative: function(num) {
      if (num < 0) {
        return true;
      }
      return false;
    },
    //checks if an argument is in a array -> string may be added later
    contains: function(findThis, inThis) {
      if (typeof inThis == 'object') {
        //is an array
        for (i in inThis) {
          if (inThis[i] === findThis) {
            return true;
          }
        }
      } else {
        throw 'is.contans() is not supported yet';
      }
      return false;
    }
  };
  binary = {
    /*
        NOTE DOUBLE NOTE NOT DONE
        add sånn at man kan bruke and or på binærtall

        binary.and(1001, 1000) = 1000 f.eks.
        binary.nor(1010, 0010) = 0100
      */
    and: function(bin1, bin2) {
      if (is.binary(bin1) && is.binary(bin2)) {
        //arrays to check similar positions
        let arr1 = bin1.split('');
        let arr2 = bin2.split('');
        //need to add 0s so that positions are actually the same
        let shortest = arr1 < arr2 ? arr1 : arr2;
        let longest = arr1 > arr2 ? arr1 : arr2;
        while (shortest.length < longest.length) {
          shortest.unshift('0');
        }
        //declaring the string that will be returned as result
        let returnString = '';
        for (i in shortest) {
          //could be "in longest" as well, they are the same length
          if (shortest[i] == '1' && longest[i] == '1') {
            returnString += '1';
          } else {
            returnString += '0';
          }
        }

        return returnString;
      } else {
        throw 'both numbers must be written as binary';
      }
    },
    or: function(bin1, bin2) {},
    xor: function(bin1, bin2) {},
    not: function() {},
    equals: function() {}
  };
  //practical data/arrays/related
  colors = {
    dark: [
      'rgb(23, 142, 168)',
      'rgb(132, 16, 144)',
      'rgb(66, 142, 19)',
      'rgb(223, 185, 22)',
      'rgb(182, 12, 181)',
      'rgb(73, 218, 7)',
      'rgb(59, 18, 161)',
      'rgb(207, 43, 247)',
      'rgb(215, 22, 22)'
    ],
    bright: [
      'rgb(174, 127, 209)',
      'rgb(187, 113, 175)',
      'rgb(160, 231, 80)',
      'rgb(201, 138, 92)',
      'rgb(104, 151, 187)',
      'rgb(207, 203, 113)',
      'rgb(107, 219, 235)',
      'rgb(92, 93, 124)',
      'rgb(216, 230, 104)'
    ]
  };
  //NOT CATEGORIZED YET
  checkDuplicates = function(array) {
    //returns an object with results
    var found = [];
    for (i in array) {
      var index = array[i];
      found[index] = 0;
    }
    for (i in array) {
      var index = array[i];
      found[index] += 1;
    }
    return found;
  };
  shuffle = function(array) {
    //source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
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
  };
  log = function(msg) {
    console.log(msg);
  };
  powerSequence = function(num, amount) {
    var arr = [];
    for (i = 0; i < amount; i++) {
      arr.push(Math.pow(num, i));
    }
    return arr;
  };
  flatten = function() {
    /*
        make an array.flatten. This method should transform twodimensional
        arrays to onedimensjonal arrays:
          var twodim = [[1,2,3,4], [11,22,33,44]];
          var onedim = todim.flatten();
          //onedim = [1,2,3,4,11,22,33,44];
      */
  };
})();
