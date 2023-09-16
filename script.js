// --------- Global Variables --------- //
let bill = 0;
let tip = 0;
let numPeople = 0;

// --------- Event Listeners  --------- //
// Add event listener to all tip Buttons
let tipBtns = document.querySelectorAll(".tip-body .tips button.tip");
tipBtns.forEach((btn) => {
  btn.addEventListener("click", checkTip);
});

// Add event listener to the form body
let formBody = document.querySelector(".form-body");
formBody.addEventListener("click", calculate);
formBody.addEventListener("keyup", calculate);

// ---------     Functions    --------- //
// A function to handle clicking on tip button
function checkTip(event) {
  clickedBtn = event.target;

  // If the current button is already clicked. Remove the click and break the function
  if (clickedBtn.classList.contains("checked")) {
    clickedBtn.classList.remove("checked");
    return;
  }

  // Remove 'checked' class from all btns
  tipBtns.forEach((btn) => {
    btn.classList.remove("checked");
  });

  // Add 'checked' class to the clicked btn
  clickedBtn.classList.add("checked");

  // Empty the Custom input if the clicked button is the Custom one
  if (clickedBtn.classList.contains("custom")) {
    customInput = document.querySelector(".tip-body .tips input.tip.custom");
    customInput.value = "";
  }
}

// A function to fetch inputs, calculate and update Tip Amount and Total Amount
// This function will be triggered when recording any keydown or click
// in the form-body area
function calculate(event) {
  // Get input elements
  let billInput = document.querySelector(".form-body .bill-input input");
  let customTipInput = document.querySelector(
    ".form-body .tip-body .tips input.tip.custom"
  );
  let numPeopleInput = document.querySelector(
    ".form-body .num-ppl-input input"
  );
  let checkedTip = document.querySelector(
    ".tip-body .tips button.tip.checked:not(.custom)"
  );

  bill = billInput.value;

  // Get the tip value
  if (checkedTip != null && checkedTip.value > customTipInput.value) {
    tip = checkedTip.value;
  } else {
    tip = customTipInput.value;
  }

  numPeople = numPeopleInput.value;

  // Check input value and handle errors
  if (bill == 0) {
    document
      .querySelector(".form-body .bill-input-body")
      .classList.add("input-error");
  } else {
    document
      .querySelector(".form-body .bill-input-body")
      .classList.remove("input-error");
  }

  if (numPeople == 0) {
    document
      .querySelector(".form-body .num-ppl-body")
      .classList.add("input-error");
  } else {
    document
      .querySelector(".form-body .num-ppl-body")
      .classList.remove("input-error");
  }

  if (numPeople != 0 && bill != 0) {
    let tipAmountEl = document.querySelector(".result-body .tip-body .amount");
    let totalEl = document.querySelector(".result-body .total-body .amount");
    let tipAmount = (bill / numPeople) * (tip / 100);
    let total = bill / numPeople + tipAmount;

    tipAmountEl.innerHTML = `$${tipAmount.toFixed(2)}`;
    totalEl.innerHTML = `$${total.toFixed(2)}`;
  }
}
