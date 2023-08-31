// Business

// 1 = C#; 2 = JavaScript; 3 = C++ (or maybe Rust?); 4 = ??
let branchNumber =  0n;

function hideAllFieldsetExcept(targetQuestion) {
  //hide every FieldSet in the form except the one we want
  let fieldSets = document.querySelectorAll("[id|=question]");
  fieldSets.forEach(element => {
    console.log(element);
    element.style.display = "none";
  });
  let targetElement = document.querySelector("[id*=question-".concat(targetQuestion,"]"));
  //check if it exists first
  if(targetElement)
  {
    targetElement.style.display = "block";
  }
}
// UI 