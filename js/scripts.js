// Business

//for keeping track of what question we're on
let questionNumber = 1;

// 1 = C#; 2 = ECMA/JavaScript; 3 = C++ (or maybe Rust?); 4 = Python
// 5 = Java
let branchNumber = 0;

//for the showing of the results in #results-show
function selectSuggestedLang(branchNumber) {
  //because GetAttribute returns a string
  let branchFloat = parseFloat(branchNumber)
  switch(branchFloat) {
    case 1.0:
      return "C#";
    case 2.0:
      return "JavaScript";
    case 3.0:
      return "C++";
    case 4.0:
      return "Python";
    case 5.0:
      return "Java";
    default:
      return "???";
  }
};

function hideAllFieldsetExcept(targetQuestion) {
  //hide every FieldSet in the form except the one we want
  let fieldSets = document.querySelectorAll("[id|=question]");
  fieldSets.forEach(element => {
    element.style.display = "none";
  });
  let targetElement = document.querySelector("[id*=question-".concat(targetQuestion,"]"));
  //check if it exists first then make visible
  if(targetElement) {
    targetElement.style.display = "revert";
  }
}

function nextQuestionStuff(question) {
  // find the active question
  let fieldSet = document.querySelector("[id*=question-".concat(question,"]"));
  if(fieldSet) {
    //find the radios
    //we need an array copy because forEach() can't be stopped by break;
    let childrenCopy = Array.from(fieldSet.children);
    for (const element of childrenCopy) {
      let dataNext = element.getAttribute("data-next");
      let dataPreference = element.getAttribute("data-preference");
      if(element.nodeName === "INPUT" && element.checked) {
        //once we find the radio that is checked,
        //we go to the next question
        if(dataNext && dataNext != "0") {
          questionNumber = dataNext;
          hideAllFieldsetExcept(questionNumber);
          break;
        }
        //or stop the survey and show the results
        else if(dataPreference) {
          hideAllFieldsetExcept(0);
          let resultsDiv = document.getElementById("results-show");
          let resultsSpan = document.querySelector("#results-show span");
          resultsSpan.textContent = selectSuggestedLang(dataPreference);
          resultsDiv.style.display = "block";
          break;
        }
      }
    }
  }
}

// UI

function windowLoadListener(event) {
  let nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", function(event) {
    event.preventDefault();
    nextQuestionStuff(questionNumber);
  });
}

window.addEventListener("load",windowLoadListener);
