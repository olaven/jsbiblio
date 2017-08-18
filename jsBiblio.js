
/*Dette er et lite bibloitek med en del kjekke
funksjoner o.l. -> eksamen i IT2, 29.05.2017*/

//Lister/arrayer
var morkeFarger = ["rgb(23, 142, 168)","rgb(132, 16, 144)","rgb(66, 142, 19)",
"rgb(223, 185, 22)","rgb(182, 12, 181)","rgb(73, 218, 7)","rgb(59, 18, 161)",
"rgb(207, 43, 247)","rgb(215, 22, 22)"];
var lyseFarger = ["rgb(174, 127, 209)","rgb(187, 113, 175)","rgb(160, 231, 80)",
"rgb(201, 138, 92)","rgb(104, 151, 187)","rgb(207, 203, 113)","rgb(107, 219, 235)",
"rgb(92, 93, 124)","rgb(216, 230, 104)"];
//opprette elementer i html

function lagListe(arr, selectId) {//forventer et array med data og id til select-tag
  for(i in arr){
    var nyOp = createTag("option");
    nyOp.innerHTML = arr[i];
    nyOp.value = arr[i];
    getId(selectId).appendChild(nyOp);
  }
}
function lagTabell(arr, tableId) {//forventer et array med objekter
  /*Vil lage en enkel tabell (styles i etterkant) som har
  rader for hver indeks i arrayet og kolonner for hvert av
  punktene i objektet. Skal fungere uavhengig av hva objektene
  inneholder*/
  //tømme feltet for eventuelt gammelt innhold
  getId(tableId).innerHTML = "";
  createTag(tableId).innerHTML = "";
  for(i in arr){ //løkke gjennom alle objekter
    var nyTr = createTag("tr");
    for(x in arr[i]){ //løkke gjennom hvert enkelt objekt
      var nyTd = createTag("td");
      nyTd.innerHTML = arr[i][x];
      nyTr.appendChild(nyTd);
    }
    getId(tableId).appendChild(nyTr);
  }
}
function lagGraf(arr, feltId) {
  //canvas-tag kan styles i stilark og vil holde proposjoner
  /*Skal lage en graf i en canvas-tag i HTML.
  Grafen skal basere seg på et array med grafpunkter.
  Arrayet forventes å ha en struktur der hver indeks
  er et objekt med .num og .text, eks.
  arr[0] = {num: 10, text:"descriptive text"}*/
  var newCanvas = createTag("canvas"); //definering av canvas
  var ctx = newCanvas.getContext("2d");

  var antallStolper = arr.length;
  var xPos = 0; //starte å tegne, økes for hver loop
  for(i in arr){
    //farger
    ctx.fillStyle = lyseFarger[Math.floor(Math.random() * lyseFarger.length)];//henter fra arr i jsBiblio
    //stolper
    ctx.fillRect(xPos,150,300/antallStolper,-arr[i].num);
    //tekst
    ctx.font = "20px monospace";
    ctx.fillText(arr[i].text, xPos, 30);
    ctx.fill();
    ctx.stroke();

    xPos += 300 / antallStolper;
  }
  getId(feltId).appendChild(newCanvas);
}
function lagSlideshow(slideWidth, slideHeight, divId, imagesArr, textArr, timeoutCounter) { //IKKE FERDIG
  /*
//høyde og bredde i piksler (endre om en oppgave spesifiserer noe annet)
//animasjoner:

  for(i in imagesArr){
    var cssAnimation = document.createElement("style");
    cssAnimation.type = "text/css";
    var rules = document.createTextNode(
      "@keyframes slideshowAni{"+
        "from{transform: translateX(-"+slideWidth+"px);visibility:hidden; animation-delay:"+timeoutCounter+"s};"+
        "to{transform: translateX("+0+"px);visibility:visible}; animation-delay:"+timeoutCounter+"s"+
      "}");
    cssAnimation.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssAnimation);
    var nySlide = document.createElement("div");
    nySlide.width = slideWidth;
    nySlide.heigth = slideHeight;
    nySlide.style.display = "inline-block";
    nySlide.style.position = "absolute";
    nySlide.id = "slide" + i;
    nySlide.style.animationDirection = "alternate-reverse";
    var nyImageField = document.createElement("img");
    nyImageField.src = imagesArr[i];
    nyImageField.style.width = (slideWidth) + "px";
    nyImageField.style.height = (slideHeight / 2) + "px";
    var nyTextField = document.createElement("div");
    nyTextField.innerHTML = textArr[i];
    nyTextField.style.width = (slideWidth) + "px";
    nyTextField.style.height = (slideHeight / 2) + "px";

    nySlide.appendChild(nyImageField);
    nySlide.appendChild(nyTextField);
    document.getElementById(divId).appendChild(nySlide);

    document.getElementById("slide" + i).style.animation = "slideshowAni 5s infinite";

    timeoutCounter += 200;
    console.log(document.getElementById("slide" + i).style.animationDelay);
  }
  */
}
//hente fra html
function getId(x) {
  return document.getElementById(x);
}
function getClass(x) {
  return document.getElementsByClassName(x);
}
function getTag(x) {
  return document.getElementsByTagName(x);
}
function createTag(x) {
  return document.createElement(x);
}
//manipulsjon av arrayer
//finne duplikater i et array
function sjekkDuplikater(arr) {
  //returnerer et objekt med elementer i som index og
  //hvor mange ganger de forekommer
  var funnet = [];

  //gjør alle posisjoner i fremtidig objekt "klare" og som int
  for(i in arr){
    var index = arr[i];
    funnet[index] = 0;
  }
  for(i in arr){
    var index = arr[i];
    funnet[index] += 1;
  }
  return funnet;
}
/*Ønsket egentlig å gjøre denne som en Array.prototype (slik
som er kommentert under), men
da støtte jeg på problemer med at "this" for Array-objektet
var et array som også inneholdt funksjonsteksten.*/
/*Array.prototype.sjekkDuplikater = function(){
  //returnerer et objekt med elementer i som index og
  //hvor mange ganger de forekommer
  var funnet = [];

  //gjør alle posisjoner i fremtidig objekt "klare" og som int
  for(i in this){
    var index = this[i];
    funnet[index] = 0;
  }
  for(i in this){
    var index = this[i];
    funnet[index] += 1;
  }
  return funnet;
} */
//sjekke om en localStorage-nøkkel er der. Derso mdet ikke er der,
//legges det til. Nøkkelen som skal sjekkes sendes med som argument
function checkLocalStorage(x) {
  if(localStorage.getItem(x) === null){
    localStorage.setItem(x, "");
  }
}
//stokke et array tilfeldig
function stokkArr(array) { //kilde: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
//finne inneværende uke i et Date-objekt
Date.prototype.getWeek = function() { //source: https://weeknumber.net/how-to/javascript
  var date = new Date(this.getTime()); //MAY BE USED TO COMPARE REGDATES
   date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}
Array.prototype.flatten = function(){
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
  }
  /*
  lag en Array.flat som gjør todimensjonale arrayer til endimensjonale

  var todim = [[1,2,3,4], [11,22,33,44]];
  var endim = todim.flatten();

  //endim = [1,2,3,4,11,22,33,44];

  /*Bruk løkker for å gjøre dette. Ta også med indekser i originalliste som ikke
  er lister. f.eks [1,2,3,[1,2,3],4].flatten = [1,2,3,1,2,3,4]
  */
