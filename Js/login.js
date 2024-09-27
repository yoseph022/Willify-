// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('signup-form').addEventListener('submit', validateSignupForm);
//     document.getElementById('login-form').addEventListener('submit', validateLoginForm);
// });
if (window.location.pathname.endsWith("LoginPage.html")){
    document.getElementById('login-form').addEventListener('submit', validateLoginForm);
}
else {
    document.getElementById('signup-form').addEventListener('submit', validateSignupForm);
}
  


function validateSignupForm(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let age = document.getElementById('age').value;
    let gender = document.getElementById('gender').value;

    if (!validateName(name)) {
        alert("Name must be at least 3 characters long.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Email must contain an '@' and a domain.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    if (!validateAge(age)) {
        alert("Age must be a number between 18 and 100.");
        return;
    }

    if (!validateGender(gender)) {
        alert("Please select a gender.");
        return;
    }

    window.location.href = "homePage.html";
}

function validateLoginForm(event) {
    event.preventDefault();
    
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    if (!validateEmail(email)) {
        alert("Email must contain an '@' and a domain.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    window.location.href = "homePage.html";
}

function validateName(name) {
    return name.length >= 3;
}

function validateEmail(email) {
    return email.includes('@') && email.includes('.');
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateAge(age) {
    age = Number(age);
    return age >= 18 && age <= 100;
}

function validateGender(gender) {
    return gender !== "";
}
