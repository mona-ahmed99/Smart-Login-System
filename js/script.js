var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var incorrect = document.getElementById("incorrect");
var infoContainer;




// Sign Up


if (localStorage.getItem("userInfoList") == null) {
    infoContainer = [];
}
else {
    infoContainer = JSON.parse(localStorage.getItem("userInfoList"));
}

function signUp() {

    if (checkSignupInputs() == false) {
        incorrect.innerHTML = `<span class="text-danger m-3">All inputs is required</span>`;

    }
    else if (checkUserEmail() == true) {
        incorrect.innerHTML = `<span class="text-danger m-3">email already exists</span>`;
    }
    else if (validateEmail() == false) {
        incorrect.innerHTML = `<span class="text-danger m-3"> It is not an Email</span>`;
    }
    else {
        var userInformation = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }
        infoContainer.push(userInformation);
        localStorage.setItem("userInfoList", JSON.stringify(infoContainer));
        incorrect.innerHTML = `<span class="text-success m-3 ">Success</span>`;
    }

}

function checkSignupInputs() {
    if (signupName.value == "" || signupPassword.value == "" || signupEmail == "") {
        return false;
    }
    else {
        return true;
    }
}

function checkUserEmail() {
    var x = false;
    for (var i = 0; i < infoContainer.length; i++) {
        if (infoContainer[i].email == signupEmail.value) {
            x = true;
            break;
        }
    }
    return x;
}

function validateEmail() {
    var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (regex.test(signupEmail.value) == true) {
        return true;
    }
    else {
        return false;
    }
}

// login

function login() {

    for (var i = 0; i < infoContainer.length; i++) {
        if (checkInputs() == false) {
            incorrect.innerHTML = `<span class="text-danger m-3">All inputs is required</span>`;
        }
        else if(signinEmail.value == infoContainer[i].email && signinPassword.value == infoContainer[i].password) {
            localStorage.setItem("userNameList", infoContainer[i].name);
            location.replace('home.html');
            break;
        }
        else {
            incorrect.innerHTML = `<span class="text-danger m-3">incorrect email or password</span>`;
        }
    }

}


function checkInputs() {
    if (signinEmail.value == "" || signinPassword.value == "") {
        return false;
    }
    else {
        return true;
    }
}

// logout
function logOut() {
    localStorage.removeItem('userNameList');
}

// welcome in home page
var userName = localStorage.getItem('userNameList');
document.getElementById('username').innerHTML = "Welcome " + userName;
