const Input = document.querySelector('.input-text');
const AddButton = document.querySelector('.button-add');
const AnalyzeButton = document.querySelector('.analyze-button');
const PatternsContainer = document.querySelector('.patterns');
const AnaliticsContainer = document.querySelector('.datas');
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


const renderVariables = () => {
  PatternsContainer.innerHTML = '';
  const patternsDiv = document.createElement('div');

  variables.forEach(item => {
    patternsDiv.innerHTML = `<div class="pattern"> <span>${item}</span> </div>`;
    PatternsContainer.appendChild(patternsDiv.firstChild);
  });
};

const renderAnalyze = (arr) => {
  AnaliticsContainer.innerHTML = '';
  const analyzeDiv = document.createElement('div');

  arr.forEach(obj => {
    Object.keys(obj).forEach(item => {
      analyzeDiv.innerHTML = `<div class=""> <span>${obj[item]}</span> </div>`;
      AnaliticsContainer.appendChild(analyzeDiv.firstChild);
    })
  });
};


const handleAddVariable = () => {
  if( variables.includes(variable) ) {
    variablesRepeated.push(variable);
  } 
  else {
    variables.push(variable);
    renderVariables();
  };

  allVariables.push(variable);
  Input.value = '';
  findPattern();
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
    message = `Valor do ${[value]} - (${findPattern()[value]}): ${percentage}%`;
    resultPattern.push({[value]: message});
  };
  renderAnalyze(resultPattern);
};
AnalyzeButton.addEventListener('click', analyzeData);


