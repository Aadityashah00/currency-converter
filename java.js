const BASE_URL =
"https://latest.currency-api.pages.dev/v1/currencies";


  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromcurr = document.querySelector('select[name="from"]');
  const tocurr = document.querySelector('select[name="to"]');
  const msg = document.querySelector(".msg");



  for (let select of dropdowns) {
    for(currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
  }
// Preload all flags at page load
for (let code in countryList) {
  let img = new Image();
  img.src = `https://flagcdn.com/64x48/${countryList[code].toLowerCase()}.png`;
}
const updateExchangeRate = async () => {
  let amount = document.querySelector("form input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
  let finalAmount = amtval * rate;
  msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
};

const updateFlag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagcdn.com/64x48/${countrycode.toLowerCase()}.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click",(evt) => {
  evt.preventDefault();  
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});



 