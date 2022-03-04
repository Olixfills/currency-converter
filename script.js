const currencyElOne = document.getElementById('currency-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElOne = document.getElementById('amount-one');
const amountElTwo = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');




//Fetch data

function calculate(){
  const currency_one = currencyElOne.value;
  const currency_two = currencyElTwo.value;

  fetch(`https://v6.exchangerate-api.com/v6/c03a2fd9e557fe67c4dfe5d4/latest/${currency_one}`)
  .then(res => res.json())
  .then(data => {
    // console.log(data);
      const rate = data.conversion_rates[currency_two];
      // console.log(rate)
    rateEl.innerText = `1${currency_one} = ${rate}${currency_two}`;

    amountElTwo.value = (amountElOne.value * rate).toFixed(2)

  })
  .catch(err => {
    console.error(err);
  });
  
}



//Even listeners

currencyElOne.addEventListener('change', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
amountElTwo.addEventListener('input', calculate);
swapBtn.addEventListener('click', () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;

  calculate()
})

calculate();