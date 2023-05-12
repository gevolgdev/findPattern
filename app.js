const Input = document.querySelector('.input-text');
const AddButton = document.querySelector('.button-add');
const PatternsContainer = document.querySelector('.patterns');
// -----------------------------------------------------------

let variables = [];
let variablesRepeated = [];
let allVariables = [];
let variable;


const handleVariable = (e) => {
  const { value } = e.target;
  variable = value;
};

Input.addEventListener('change', handleVariable);

const renderAnalyze = (arr) => {
  PatternsContainer.innerHTML = '';
  const analyzeDiv = document.createElement('div');

  arr.forEach(obj => {
    Object.keys(obj).forEach(item => {
      analyzeDiv.innerHTML = `<div class="pattern"> <span>${obj[item]}</span> </div>`;
      PatternsContainer.appendChild(analyzeDiv.firstChild);
    })
  });
};


const handleAddVariable = () => {
  if( variables.includes(variable) ) {
    variablesRepeated.push(variable);
  } 
  else {
    variables.push(variable);
  };

  allVariables.push(variable);
  Input.value = '';
  findPattern();
  analyzeData();
};

AddButton.addEventListener('click', handleAddVariable);


const findPattern = () => {
  let pattern = {};
  let prepare = [...allVariables];
  let similarsVariables = [];

  for(let i = 0; i < prepare.length; i++) {
    if (prepare.length > 0 && variablesRepeated.includes(prepare[i])) {
      similarsVariables.push(prepare[i]);
      const amountPattern = similarsVariables.filter(item => item === prepare[i]);
      Object.assign(pattern, {[prepare[i]]: amountPattern.length});
    }
    else Object.assign(pattern, {[prepare[i]]: 1});
  }
  return pattern;
}; 

const analyzeData = () => {
  let groupValues = [];
  let totalValues = 0;
  let percentage;
  let resultPattern = [];
  
  for(let value in findPattern()) {
    groupValues.push(findPattern()[value]);
  };

  groupValues.map(item => totalValues += item);

  for(let value in findPattern()) {
    let message;
    percentage = parseInt((findPattern()[value] / allVariables.length) * 100);
    message = `(${findPattern()[value]}) - ${[value]}: ${percentage}%`;
    resultPattern.push({[value]: message});
  };
  renderAnalyze(resultPattern);
};
