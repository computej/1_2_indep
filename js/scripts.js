// Business

let questionNumberTracker = 1;

let branchNumber = 0;

function selectSuggestedLang(branchNumber) {
  let branchFloat = parseFloat(branchNumber)
  switch (branchFloat) {
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
  let fieldSets = document.querySelectorAll("[id|=question]");
  fieldSets.forEach(element => {
    element.style.display = "none";
  });
  let targetElement = document.querySelector("[id*=question-".concat(targetQuestion,"]"));
  //check if it exists first then make visible
  if (targetElement) {
    targetElement.style.display = "revert";
  }
}

function nextQuestionStuff(question) {
  let activeQuestionFieldset = document.querySelector("[id*=question-".concat(question,"]"));
  if (activeQuestionFieldset) {
    let radioButtonArray = Array.from(activeQuestionFieldset.children);
    for (const element of radioButtonArray) {
      let nextQuestionNumber = element.getAttribute("data-next");
      let langPreferenceNumber = element.getAttribute("data-preference");
      if (element.nodeName === "INPUT" && element.checked) {
        if (nextQuestionNumber && nextQuestionNumber != "0") {
          questionNumberTracker = nextQuestionNumber;
          hideAllFieldsetExcept(questionNumberTracker);
          break;
        } else if (langPreferenceNumber) { //stop the survey and show the results
          hideAllFieldsetExcept(0);
          let resultsDiv = document.getElementById("results-show");
          let resultsSpan = document.querySelector("#results-show span");
          resultsSpan.textContent = selectSuggestedLang(langPreferenceNumber);
          resultsDiv.style.display = "block";
          let nextButton = document.getElementById("next-button");
          nextButton.textContent = "Reset";
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
    let resultsDiv = document.getElementById("results-show");
    if (resultsDiv && resultsDiv.style.display == "block") {
      resultsDiv.style.display = "none";
      questionNumberTracker = 1;
      hideAllFieldsetExcept(1);
      nextButton.textContent = "Next";
    }
    else{
      nextQuestionStuff(questionNumberTracker);
    }
  });
}

window.addEventListener("load",windowLoadListener);
