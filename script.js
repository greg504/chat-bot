//Gregory code
  readSheet();
  document.getElementById("button").addEventListener("click", write());
  var mode = "0";
  var modeQuery = false;
  writeBot("Hello, are you an Augsburg student (or family of one), a faculty member, or someone just passing by?");//Ask the initial mode setting question
  function readSheet(){
    const fs = require('fs');
    var text = [];
    fs.readFile('./bot.csv', 'utf8', (err, dat) => {
  if(err){
    console.error("Error while opening file");
  }
    text = String(dat);
    });
    const lines = text.split("\n"); //makes a string array of each line of the spreadsheet
    var table = [];
    for(var i = 0; i < lines.length; i++){
      table.concat(lines[i].split(",")); //finaly, makes a 2d array of each value in the file, we have a table
    }
  }
  function write(){
    var input = document.getElementById("chat-input").value;
    input = input.toLowerCase().replace(/[^\w\s\d]/gi, "").replace(/ a /g, " ").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "");//Input sanitizing provided by Amina
    queryBot(input);
    document.getElementById("chat-input").value = "";
  }
  function queryBot(input){
    var wrote = false;
    if (modeQuery){
      for(var j = 1; j < table.length; j++){
        if(input.search(table[j][1]) != -1){//if the key phrase is found in the sanitized (also to all lower case) input
          if(table[j][3] == "0" || table[j][3].search(mode) != -1){//If they are in a valid mode
            writeBot(table[j][2]); //write the designated response
            wrote = true; //tell the function we wrote something
            break; //leave the loop since we found the thing to print
          } else {
            wrongMode(table[j][3]);
          }}}} else { //If they are answering the first question
        if(input.search("student") || input.search("auggie")){//If they indicate themselves as an Auggie
          writeBot("Placeholder");
          mode = "1";
        } else if(input.search("staff") || input.search("faculty")){//If they indicate they are faculty
          writeBot("Placeholder");
          mode = "2";
        } else {
          writeBot("Placeholder");
          mode = "3";
        }
      modeQuery = true;//We no longer consider this part past the first answer
      }
          
        
      if(!wrote){output(input);} //if we didn't find something to print, we print our "not found" message
      
    }
  function wrongMode(mode){
    if (mode == "1"){
      writeBot("Placeholder");
    }
    if (mode == "2"){
      writeBot("Placeholder");
    }
    if (mode == "12"){
      writeBot("Placeholder");
    }
  }
  function writeBot(input) {
    const messagesContainer = document.getElementById("chat-body hide");
    var canvas = document.createElement("canvas");
    canvas.id = "CursorLayer";
    canvas.width = 350;
    canvas.height = 75;
    var ctx = canvas.getContext("2d");
    ctx.fillText(input, 10, 25);
    messagesContainer.appendChild(canvas);
 }
//Amina code
  document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("chat-input").addEventListener("keydown", function(e) {
            if (e.code === "Enter") {
            console.log("You pressed the enter button!")
            }
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        const inputField = document.getElementById("chat-input")
        inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
    }
  });

    const utterances = [ 
    ["how are you", "how is life", "how are things"],        //0
    ["hi", "hey", "hello", "good morning", "good afternoon"],      //1
    ["what are you doing", "what is going on", "what is up"],      //2
    ["how old are you"],                    //3
    ["who are you", "are you human", "are you bot", "are you human or bot"],   //4

  ];
 
    // Possible responses corresponding to triggers
 
const answers = [
   [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],                                                                                    //0
  [
    "Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"
  ],                        //1
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],                        //2
  ["I am infinite"],                    //3
  ["I am just a bot", "I am a bot. What are you?"], //4
  
];
 
// For any other user input
 
const alternatives = [
  "Go on...",
  "Try again",
];



function compare(utterancesArray, answersArray, string) {
  let item;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let items = answersArray[x];
        item = items[Math.floor(Math.random() * items.length)];
        }
      }
   }
  return item;
}




function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");
 
  if (compare(utterances, answers, text)) {
    product = compare(utterances, answers, text);
  }
  else {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }
 
  //update  DOM
  addChatEntry (input, product);
}


function addChatEntry(input, product) {
  const messagesContainer = document.getElementById("chat-body hide");
  
  const node = document.createElement("li");
  const textnode = document.createTextNode("Hello");
  node.id = "user";
  node.className = "user response";
  node.innerHTML = `${input}`;
  messagesContainer.appendChild(textnode);
 
  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  messagesContainer.appendChild(botText);
 }