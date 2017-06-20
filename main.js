//Main navigation
var accountsBtn = document.querySelector('#accountPage');
var addBtn = document.querySelector('#addPage');
var editBtn = document.querySelector('#editPage');
//Main screens
var accountScreen = document.getElementsByClassName('container accounts')[0];
var addScreen = document.getElementsByClassName('container addAccount')[0];
var editScreen = document.getElementsByClassName('container editAccount')[0];
var editAccounts = document.getElementsByClassName('container editAccounts')[0];
//Add Screen inputs
var inputId = document.querySelector("#id");
var inputName = document.querySelector("#username");
var inputDepo = document.querySelector("#deposit");
var inputCard = document.querySelector("#creditcard");
//Edit Screen inputs
var inputIdEdit = document.querySelector("#idEdit");
var inputNameEdit = document.querySelector("#usernameEdit");
var inputDepoEdit = document.querySelector("#depositEdit");
var inputCardEdit = document.querySelector("#creditcardEdit");

var editAccountBtn = document.querySelector(".editAccount button");
var insertAccount = document.querySelector(".addAccount button");
var timeDiv = document.getElementsByClassName('clock')[0];
var dateDiv = document.getElementsByClassName('date')[0];
var tableBody = document.querySelectorAll("tbody");
var whichUser = "";

var user1Date = new Date('2017-05-22 15:20:00');
var user2Date = new Date('2017-05-23 11:20:00');


//Data
window.addEventListener('beforeunload', function() {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
});

if(localStorage.getItem("userInfo")){
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));
  createTable();
}
else {
  var userInfo = [];
  createTable();
}


//Display Time and Date
function displayTime () {
  var timeAndDate = new Date();
  var hours = timeAndDate.getHours();
  var minutes = timeAndDate.getMinutes();
  var seconds = timeAndDate.getSeconds();
  if(seconds < 10){
    seconds = "0" + seconds;
  }
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  if(hours < 10){
    hours = "0" + hours;
  }
  var day = timeAndDate.getDate();
  var month = timeAndDate.getMonth() + 1;
  var year = timeAndDate.getFullYear();
  timeDiv.innerHTML = "Time: " + hours + ":" + minutes + ":" + seconds;
  dateDiv.innerHTML = "Date: " + day + "." + month + "." + year;
  setTimeout(displayTime,1000);
}

displayTime();

//Change screens functions and listeners
function showScreen (screen) {
  hideAll();
  screen.style.display = "block";
}

function hideAll () {
  accountScreen.style.display = "none";
  addScreen.style.display = "none";
  editScreen.style.display = "none";
  editAccounts.style.display = "none";
}

accountsBtn.addEventListener('click', function() {
  showScreen(accountScreen);
});

addBtn.addEventListener('click', function() {

  function random () {
    var tempId = [];
    for (var i = 0; i < userInfo.length; i++) {
      tempId[i] = parseInt(userInfo[i].id);
    }
    inputId.value = Math.ceil(Math.random()*100);
    var num = parseInt(inputId.value);
    var test = tempId.every(function(x){return x !== num})
    if (test) {
      showScreen(addScreen);
      inputId.disabled = true;
    }
    else {
      random();
    }
  }
  random();
  // function random () {
  //   var counter = 0;
    // inputId.value = Math.ceil(Math.random()*10);
  //   for (var i = 0; i < userInfo.length; i++) {
  //     if (inputId.value !== userInfo[i].id) {
  //       counter++
  //     }
  //   }
  //   if (counter === userInfo.length) {
  //     showScreen(addScreen);
  //     inputId.disabled = true;
  //   }
  //   else {
  //     random()
  //   }
  // }
  // random();
})

editBtn.addEventListener('click', function() {
  showScreen(editAccounts);
});

//Data insert


function createTable () {
  var x;
  var text1 = "";
  var text2 = "";
  for (var i = 0; i < userInfo.length; i++) {
      text1 += '<tr><td>'+ userInfo[i].id +'</td><td>'+ userInfo[i].name +'</td><td>'+ userInfo[i].deposit +'</td><td>'+ userInfo[i].creditCard +'</td><td>' + moment(userInfo[i].createDate).fromNow() +'</td></tr>';
      text2 += '<tr><td>'+ userInfo[i].id +'</td><td>'+ userInfo[i].name +'</td><td>'+ userInfo[i].deposit +'</td><td>'+ userInfo[i].creditCard +'</td><td>' + moment(userInfo[i].createDate).fromNow() + '</td><td><button type="button" id="'+i+'" class="btn btn-warning edit" name="button">Edit</button></td><td><button type="button" id="'+i+'" class="btn btn-danger delete" name="button">Delete</button></td></tr>';
  }

  tableBody[0].innerHTML = text1;
  tableBody[1].innerHTML = text2;

  var deleteBtn = document.getElementsByClassName('delete');
  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', deleteUser);
  }

  var editBtn = document.getElementsByClassName('edit');
  for (var i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", goEdit)
  }
}


function deleteUser () {
  userInfo.splice(this.id,1);
  createTable();
}

function goEdit () {
  hideAll();
  editScreen.style.display = "block";
  inputIdEdit.value = userInfo[this.id].id;
  inputNameEdit.value = userInfo[this.id].name;
  inputDepoEdit.value = userInfo[this.id].deposit;
  inputCardEdit.value = userInfo[this.id].creditCard;
  inputIdEdit.disabled = true;
  whichUser = this.id;
}

//Listener for adding new account
insertAccount.addEventListener('click',addNew);

function addNew() {
  var counter = 0;
  for (var i = 0; i < userInfo.length; i++) {
    if(inputId.value !== userInfo[i].id){
      counter++;
    }
  }
  if (counter === userInfo.length){
    var newUser = {id: inputId.value, name: inputName.value, deposit: inputDepo.value, creditCard: inputCard.value, createDate: new Date()}
    userInfo.push(newUser);
    inputId.value = "";
    inputName.value = "";
    inputDepo.value = "";
    inputCard.value = "";
    createTable();
    showScreen(accountScreen);
  }
  else {
    inputId.value = "User with this ID already exists";
    inputId.style.color = "red";
  }

  inputId.addEventListener('click', function(e) {
    if(inputId.style.color === "red"){
      inputId.style.color = "black";
      inputId.value = "";
    }
  });
};

//Listener for editing account
editAccountBtn.addEventListener('click',addEdited)

function addEdited() {
  userInfo[whichUser].id = inputIdEdit.value;
  userInfo[whichUser].name = inputNameEdit.value;
  userInfo[whichUser].deposit = inputDepoEdit.value;
  userInfo[whichUser].creditCard = inputCardEdit.value;
  createTable();
  showScreen(accountScreen);
}
