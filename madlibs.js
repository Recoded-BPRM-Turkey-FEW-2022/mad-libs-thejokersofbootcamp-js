/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb" },
 *  { word: "to" },
 *  { word: "the" },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
//  */


/** 
 * This Funtion does not Work so we need to ask for help from Salah to fix it.
 * Bascially, whenever I try to solve it, it says 'ReferenceError: fetch is not defined' 
 */ 
//  const getRawStory = () => {
//  return fetch('story.txt')
//  .then(response => response.text())
//  .then(data => console.log(data));
  


// I used a dummy text until we figure out a solution for getRawStory()
let story = `Hi Amjad[n], I am writing to you, the super hero inside me. I want to know why are you hiding?
Do not underestimate yourself. You already can speak Japanese[n] fluently. You also can code[v] without asking help from anyone.
You are smart[a]. You can be a/an great[a] engineer[n] with a little effort. Get out and shine out there!.`


// The story is being separated into chunks including special characters such as Commas, Periods, etc.
const parseStory = (story) => {
let words = /[a-z\[a-z\]]+|[?,/\.!]+/ig   // It was really a tough task just to figure out how to write this simple line of code but I did it at the end.....Horaaay 😅.


// The result of applying the Regexp on the story can be shown by logging this line of code  story.match(words). However, I need to return the Regexp.
return story.match(words)
}


let editSection = document.getElementById("madLibsEdit")     // Targeting the First editable section
let review = document.getElementById('ssmadLibsPreview')    //  Targeting the Second review section


// This function will display a list of objects as stated above in the instructions.
const processedStory = () => {
  const parsedStory = parseStory(story)
ObjsList = []
for (let i = 0; i < parsedStory.length; i++) {
  if (parsedStory[i].includes("[")) { // Handling the words that will be edited
    checkType = parsedStory[i].split('[')
    switch( checkType[1][0]) {
      case ('n'):
        ObjsList.push({word: checkType[0], pos: `[noun] `})
        break;
      case ('v'):
        ObjsList.push({word: checkType[0], pos: `[verb] `})
        break;
      case ('a'):
        ObjsList.push({word: checkType[0], pos: `[adjective] `})
    }
    if (parsedStory[i+1] === "," || parsedStory[i+1] === ".") {   // This is  to handle the spaces before the special characters like commas and periods when coming with "pos"
      ObjsList[ObjsList.length-1].pos = ObjsList[ObjsList.length-1].pos.trimEnd()
    }
  }
  else {
    ObjsList.push({word: parsedStory[i]+" "})
    if (parsedStory[i+1] === "," || parsedStory[i+1] === ".") { // This is to handle the spaces before the special characters like commas and periods when coming with "word"
      ObjsList[ObjsList.length-1].word = ObjsList[ObjsList.length-1].word.trimEnd()
    }
  }
}

// A loop to dispaly the list of objects in the editSection......As simple as it should be.
let index = 0
for (el of ObjsList) {
  
  if (el.pos) {
    editSection.innerHTML += `<input type="text" class="editableFields" id=${index} name="editPane" size= '5' style= "padding:5px;margin:5px;" placeholder="${el.pos}" </input>`
    review.innerHTML += `<span id=${index} class="review">${el.pos}</span>`

    index++}
  else {editSection.innerHTML += `${el.word}`;
  review.innerHTML += `${el.word} `
}
}
const editable = document.querySelectorAll(".editableFields");   //Targeting the editable fields
const reviewPane = document.querySelectorAll(".review");        //Targeting the review fields

editable.forEach((field) => {       // Iterating through the editable fields and updating the review fields.
    const placeholder = field.getAttribute("placeholder");
                               
  field.addEventListener("keyup", (e) => {
    if (field.value.length > 0) {
      reviewPane[`${field.getAttribute("id")}`].innerText = `${field.value} ` 
    }
    else{
    reviewPane[`${field.getAttribute("id")}`].innerText = placeholder  // Handling the empty field. 
  }

  })
  field.addEventListener('click', (e) => {           // Handling the focus on the editable fields.
    field.placeholder = ''
    // Here, we can add some css styles to the editable fields.
    document.addEventListener('click', (e) => {
      if (e.target !== field) {
        field.placeholder = placeholder
      }
    })
    
  })
  })
}



/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
// getRawStory().then(parseStory).then((processedStory) => {
//   console.log(processedStory);
// });
processedStory()