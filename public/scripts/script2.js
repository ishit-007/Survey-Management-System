// // import { suggestionText } from "./script";
// // import { f1, suggestionText } from "./script.js";
// import suggestionText from "./script.js";
// import f1 from "./script.js";
// let nameText;
// let emailText;
// let ageVal;
// let currRole;
// let prodRating;
// let featureText;
// let suggestionText;

// export default function getResponse(data_obj) {
//   nameText = data_obj[0];
//   emailText = data_obj[1];
//   ageVal = data_obj[2];
//   currRole = data_obj[3];
//   prodRating = data_obj[4];
//   featureText = data_obj[5];
//   suggestionText = data_obj[6];
// }
document.addEventListener("DOMContentLoaded", function (e) {
  for (let i = 0; i < localStorage.length; i++) {
    let emailText = localStorage.key(i);
    let data_obj = JSON.parse(localStorage.getItem(emailText));
    let nameText = data_obj.Name;
    let ageVal = data_obj.Age;
    let currRole = data_obj.Role;
    let prodRating = data_obj.Rating;
    let featureText = data_obj.Feature;
    let suggestionText = data_obj.Suggestion;
    let outerdiv = document.createElement("div");
    outerdiv.classList.add("entry");
    if (emailText != "Authentication") {
      outerdiv.innerHTML = `
        <div class="rEmail">${emailText}</div>
        <div class="rName">${nameText}</div>
        <div class="rAge">${ageVal}</div>
        <div class="rRole">${currRole}</div>
        <div class="rRating">${prodRating}</div>
        <div class="rFeature">${featureText}</div>
        <div class="rSuggestion">${suggestionText}</div>`;
      let entries = document.querySelector(".entries");
      entries.appendChild(outerdiv);
    }
  }

  let email_del = "";
  let emailBox = document.querySelector(".deleteInput");
  emailBox.addEventListener("input", function (e) {
    email_del = e.currentTarget.value;
  });
  let deleteButton = document.querySelector(".deleteBtn");
  deleteButton.addEventListener("click", function (e) {
    localStorage.removeItem(email_del);
    document.location.reload();
  });
});
