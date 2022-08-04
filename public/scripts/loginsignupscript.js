document.addEventListener("DOMContentLoaded", function (e) {
  let loginBtn = document.querySelector(".loginBtn");
  let loginID = "";
  let loginPwd = "";
  let registerBtn = document.querySelector(".registerBtn");
  let newUserID = "";
  let createdPwd = "";
  document.querySelector(".loginID").addEventListener("input", function (e) {
    loginID = e.currentTarget.value;
  });
  document.querySelector(".loginPwd").addEventListener("input", function (e) {
    loginPwd = e.currentTarget.value;
  });
  let auth = JSON.parse(localStorage.getItem("Authentication"));
  if (auth == undefined) {
    // console.log("hello");
    auth = {};
  }
  loginBtn.addEventListener("click", function (e) {
    if (auth[loginID] != undefined) {
      if (auth[loginID] == loginPwd) {
        window.location.href = "surveyform.html";
      } else {
        alert("Wrong Password");
      }
    } else {
      alert("User-ID doesn't exist.");
    }
  });
  document.querySelector(".newuserID").addEventListener("input", function (e) {
    newUserID = e.currentTarget.value;
  });
  document.querySelector(".newPwd").addEventListener("input", function (e) {
    createdPwd = e.currentTarget.value;
  });
  registerBtn.addEventListener("click", function (e) {
    if (auth[newUserID] != undefined) {
      alert("User-ID already exists");
    } else {
      console.log(auth);
      auth[newUserID] = createdPwd; //{id:pwd}
      console.log(auth);
      localStorage.setItem("Authentication", JSON.stringify(auth));
      alert("Regitered Succesfully");
    }
  });
});
