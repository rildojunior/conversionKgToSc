function showResult() {
  document.querySelector('.result').classList.add('active');
}

function hideResult() {
  document.querySelector('.result').classList.remove('active');
}

function calculate(idName, percentage) {
  let oneBag = document.getElementById('oneBag').value;
  let weightBag = document.getElementById('weightBag').value;

  let namePercentage = weightBag * percentage;

  let percSc = namePercentage / oneBag;
  percSc = parseInt(percSc);

  let percKg = percSc * oneBag - namePercentage;
  percKg = parseInt(percKg * -1);

  document.getElementById(`${idName}`).innerHTML = `${percSc}sc e ${percKg}kg`;
}

function calculateTotalMaster(idName) {
  let oneBag = document.getElementById('oneBag').value;
  let weightBag = document.getElementById('weightBag').value;

  let totalMasterSc = weightBag / oneBag;
  totalMasterSc = parseInt(totalMasterSc);

  let totalMasterKg = totalMasterSc * oneBag - weightBag;
  totalMasterKg = parseInt(totalMasterKg * -1);

  document.getElementById(
    `${idName}`
  ).innerHTML = `${totalMasterSc}sc e ${totalMasterKg}kg`;
}

function calcConversion(event) {
  event.preventDefault();
  calculateTotalMaster('totalMaster');
  calculate('twentyPercBoss', 0.6);
  calculate('twentyPercEmployee', 0.4);
  calculate('tenPercBoss', 0.55);
  calculate('tenPercEmployee', 0.45);
  calculate('fiftyPercentBoss', 0.5);
  calculate('fiftyPercentEmployee', 0.5);
  showResult();
}

document.querySelector('form').addEventListener('submit', calcConversion);
document.getElementById('back').addEventListener('click', hideResult);
