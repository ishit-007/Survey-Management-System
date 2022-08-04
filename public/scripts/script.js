// import getResponse from "./script2.js";
// export default suggestionText;
if (performance.navigation.type == 2) {
  location.reload(true);
}
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("hello1");
  let nameText = "";
  let emailText = "";
  let ageVal = 0;
  let currRole = "";
  let prodRating = 0;
  let featureText = "";
  let suggestionText = "";
  let nameBox = document.querySelector("#nameBox");
  let emailBox = document.querySelector("#emailBox");
  let ageBox = document.querySelector("#ageBox");
  let selectBox1 = document.querySelector("#currentRole");
  let selectBox2 = document.querySelector("#favFeature");
  let radioBtns = document.querySelectorAll("input[class='radiooption']");
  let suggestionBox = document.querySelector("textarea");
  let submitBtn = document.querySelector("#submit");

  let data_obj = [];
  if (nameBox) {
    nameBox.addEventListener("input", function (e) {
      nameText = e.currentTarget.value;
    });
  }
  if (emailBox) {
    emailBox.addEventListener("input", function (e) {
      emailText = e.currentTarget.value;
    });
  }
  if (ageBox) {
    ageBox.addEventListener("input", function (e) {
      ageVal = e.currentTarget.value;
    });
  }
  if (selectBox1) {
    selectBox1.addEventListener("change", function (e) {
      currRole = e.currentTarget.value;
    });
  }
  if (selectBox2) {
    selectBox2.addEventListener("change", function (e) {
      featureText = e.currentTarget.value;
    });
  }

  for (let i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i]) {
      radioBtns[i].addEventListener("click", function (e) {
        prodRating = e.currentTarget.value;
      });
    }
  }
  // let checkList = {};
  // let checkBtns = document.querySelectorAll("input[class='cb1']");
  // for (let i = 0; i < checkBtns.length; i++) {
  //   checkBtns[i].addEventListener("change", function (e) {
  //     // console.log(e.currentTarget.checked);
  //     if (e.currentTarget.checked) {
  //       checkList[e.currentTarget.id] = true;
  //     } else {
  //       checkList[e.currentTarget.id] = false;
  //     }
  //   });
  // }
  if (suggestionBox) {
    suggestionBox.addEventListener("input", function (e) {
      suggestionText = e.currentTarget.value;
    });
  }
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      data_obj = {
        Name: nameText,
        Age: ageVal,
        Role: currRole,
        Rating: prodRating,
        Feature: featureText,
        Suggestion: suggestionText,
      };

      localStorage.setItem(emailText, JSON.stringify(data_obj));
    });
  }
});
// export default function f1() {
//   //console.log("hello", suggestionText);
// }
