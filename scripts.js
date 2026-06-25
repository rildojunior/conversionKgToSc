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

const oneBagInput = document.getElementById('oneBag');
const savedOneBag = localStorage.getItem('oneBag');
if (savedOneBag !== null) {
  oneBagInput.value = savedOneBag;
}

oneBagInput.addEventListener('change', () => {
  localStorage.setItem('oneBag', oneBagInput.value);
});

function flashCopied(btn) {
  btn.classList.add('copied');
  setTimeout(() => btn.classList.remove('copied'), 1500);
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => flashCopied(btn));
}

document.getElementById('copyTotal').addEventListener('click', function () {
  const total = document.getElementById('totalMaster').textContent;
  copyText(`Peso total: ${total}`, this);
});

document.getElementById('copyTwenty').addEventListener('click', function () {
  const total = document.getElementById('totalMaster').textContent;
  const boss = document.getElementById('twentyPercBoss').textContent;
  const employee = document.getElementById('twentyPercEmployee').textContent;
  copyText(`Peso total: ${total}\n\nCálculo 20%\n\nPatrão: ${boss}\n\nMeeiro: ${employee}`, this);
});

document.getElementById('copyTen').addEventListener('click', function () {
  const total = document.getElementById('totalMaster').textContent;
  const boss = document.getElementById('tenPercBoss').textContent;
  const employee = document.getElementById('tenPercEmployee').textContent;
  copyText(`Peso total: ${total}\n\nCálculo 10%\n\nPatrão: ${boss}\n\nMeeiro: ${employee}`, this);
});

document.getElementById('copyMeia').addEventListener('click', function () {
  const total = document.getElementById('totalMaster').textContent;
  const each = document.getElementById('fiftyPercentBoss').textContent;
  copyText(`Peso total: ${total}\n\nCálculo a Meia: ${each} para cada`, this);
});

document.querySelector('form').addEventListener('submit', calcConversion);
document.getElementById('back').addEventListener('click', hideResult);
