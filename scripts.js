function open() {
  document.querySelector('.result').classList.add('active')
}

function close() {
  document.querySelector('.result').classList.remove('active')
  return close
}

// criando a função toFixedDown para não deixar arredondar
Number.prototype.toFixedDown = function (digits) {
  var re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
    m = this.toString().match(re)
  return m ? parseFloat(m[1]) : this.valueOf()
}

function calcConversion(event) {
  event.preventDefault() // não deixa mandar os conteúdos do form
  let oneBag = document.getElementById('oneBag').value
  let weightBag = document.getElementById('weightBag').value

  // calculo total
  let totalMasterSc = weightBag / oneBag
  totalMasterSc = totalMasterSc.toFixedDown(0)

  let totalMasterKg = totalMasterSc * oneBag - weightBag
  totalMasterKg = totalMasterKg.toFixed(1)
  totalMasterKg = totalMasterKg.replace('-', '')

  document.getElementById(
    'totalMaster'
  ).innerHTML = `${totalMasterSc}sc e ${totalMasterKg}kg`

  // calculo 20% 60 e 40
  // boss
  let sixtyPercent = weightBag * 0.6

  let bossSixtyPercSc = sixtyPercent / oneBag
  bossSixtyPercSc = bossSixtyPercSc.toFixedDown(0)

  let bossSixtyPercKg = bossSixtyPercSc * oneBag - sixtyPercent
  bossSixtyPercKg = bossSixtyPercKg.toFixed(1)
  bossSixtyPercKg = bossSixtyPercKg.replace('-', '')

  document.getElementById(
    'twentyPercBoss'
  ).innerHTML = `${bossSixtyPercSc}sc e ${bossSixtyPercKg}kg`

  //employee
  let fortyPercent = weightBag * 0.4

  let employeeFortyPercSc = fortyPercent / oneBag
  employeeFortyPercSc = employeeFortyPercSc.toFixedDown(0)

  let employeeFortyPercKg = employeeFortyPercSc * oneBag - fortyPercent
  employeeFortyPercKg = employeeFortyPercKg.toFixed(1)
  employeeFortyPercKg = employeeFortyPercKg.replace('-', '')

  document.getElementById(
    'twentyPercEmployee'
  ).innerHTML = `${employeeFortyPercSc}sc e ${employeeFortyPercKg}kg`

  // calculo 10%  55 e 45
  // boss
  let fiftyFivePercent = weightBag * 0.55

  let bossFiftyFivePercSc = fiftyFivePercent / oneBag
  bossFiftyFivePercSc = bossFiftyFivePercSc.toFixedDown(0)

  let bossFiftyFivePercKg = bossFiftyFivePercSc * oneBag - fiftyFivePercent
  bossFiftyFivePercKg = bossFiftyFivePercKg.toFixed(1)
  bossFiftyFivePercKg = bossFiftyFivePercKg.replace('-', '')

  document.getElementById(
    'tenPercBoss'
  ).innerHTML = `${bossFiftyFivePercSc}sc e ${bossFiftyFivePercKg}kg`

  //employee
  let fortyFivePercent = weightBag * 0.45

  let employeeFortyFivePercSc = fortyFivePercent / oneBag
  employeeFortyFivePercSc = employeeFortyFivePercSc.toFixedDown(0)

  let employeeFortyFivePercKg =
    employeeFortyFivePercSc * oneBag - fortyFivePercent
  employeeFortyFivePercKg = employeeFortyFivePercKg.toFixed(1)
  employeeFortyFivePercKg = employeeFortyFivePercKg.replace('-', '')

  document.getElementById(
    'tenPercEmployee'
  ).innerHTML = `${employeeFortyFivePercSc}sc e ${employeeFortyFivePercKg}kg`

  // calculo 50%
  let fiftyPercent = weightBag * 0.5

  let FiftyFivePercSc = fiftyPercent / oneBag
  FiftyFivePercSc = FiftyFivePercSc.toFixedDown(0)

  let FiftyFivePercKg = FiftyFivePercSc * oneBag - fiftyPercent
  FiftyFivePercKg = FiftyFivePercKg.toFixed(1)
  FiftyFivePercKg = FiftyFivePercKg.replace('-', '')

  document.getElementById(
    'fiftyPercentBoss'
  ).innerHTML = `${FiftyFivePercSc}sc e ${FiftyFivePercKg}kg`

  document.getElementById(
    'fiftyPercentEmployee'
  ).innerHTML = `${FiftyFivePercSc}sc e ${FiftyFivePercKg}kg`

  open()
}

document.getElementById('conversion').addEventListener('submit', calcConversion)
document.getElementById('back').addEventListener('click', close())
