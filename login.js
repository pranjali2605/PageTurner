const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

signUpButton.addEventListener('click', () => {
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();

    if (!name || !email || !password) {
        alert('Please fill in all fields to sign up.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }


    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    container.classList.remove("active");
});

signInButton.addEventListener('click', () => {
    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value.trim();

    if (!email || !password) {
        alert('Please fill in all fields to sign in.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }


    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        window.location.href = './index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});
let lusername = localStorage.getItem('uname');
let lpassword = localStorage.getItem('pass');

lusername = lusername ? lusername = lusername.split(",") : lusername = [];

if (lpassword) {
    lpassword = lpassword.split(",");
} else {
    lpassword = [];
}


function register() {
    let username = document.querySelector('#signUpEmail').value;
    let password = document.querySelector('#signUpPassword').value;
    let cpassword = document.querySelector('#signUpPassword').value;
    if (!username || !password || !cpassword) {
        alert("Please fill out all fields!")
    } else {
        if (password === cpassword) {
            console.log(username);
            lusername.push(username);
            lpassword.push(password);
            savetoLocal();
            alert("User Saved!!!");
        } else {
            alert("password and confirm password doesn't match");
            document.querySelector('#username').value = "";
            document.querySelector('#password').value = "";
            document.querySelector('#confirm-password').value = "";

        }
    }
}

function login() {
    let counter = 0;
    let username = document.querySelector('#signInEmail').value;
    let password = document.querySelector('#signInPassword').value;
    if (!username || !password) {
        alert("Please enter both username and password!")
    } else {
        for (let i = 0; i < lusername.length; i++) {
            if (username == lusername[i] && password == lpassword[i]) {
                counter++;
            }
        }
    }


    if (counter == 1) {
        alert("Login Granted!!!")
    } else {
        alert("Invalid credentials. Please try again!")
    }
}


function savetoLocal() {
    localStorage.setItem('uname', lusername);
    localStorage.setItem('pass', lpassword);
}