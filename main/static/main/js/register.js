const mailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
let inputs = document.getElementsByTagName('input');
placeholderDictionary = {
    1 : 'Username',
    2 : 'Email',
    3 : 'Password',
    4 : 'Password Confirmation'
};

function inputValidation() {
    let submitButton = document.getElementById('sbmt-btn');
    let passwordInput = document.getElementById('id_password1');
    let passwordConfirmInput = document.getElementById('id_password2');
    if (this.placeholder.includes('Password')) {
        if (this.placeholder === "Password") {
            if (this.value.toString().length < 8) {
                this.style.border = "1px solid red";
                passwordInput.style.border = "1px solid red";
                submitButton.disabled = true;
            } else if (/^\d+$/.test(this.value)) {
                this.style.border = "1px solid red";
                passwordInput.style.border = "1px solid red";
                submitButton.disabled = true;
            } else {
                this.style.border = "none";
                passwordInput.style.border = "none";
                if (this.value === passwordConfirmInput.value) {
                    passwordConfirmInput.style.border = "none";
                }
                submitButton.disabled = false;
            }
        } else {
            if (this.value !== passwordInput.value) {
                this.style.border = "1px solid red";
                passwordInput.style.border = "1px solid red";
                submitButton.disabled = true;
            } else {
                this.style.border = "none";
                if (!(passwordInput.value.toString().length < 8) && !(/^\d+$/.test(passwordInput.value))) {
                    passwordInput.style.border = "none";
                }
                submitButton.disabled = false;
            }
        }
    } else if (this.placeholder === "Email") {
        if (!(this.value.match(mailFormat))) {
            this.style.border = "1px solid red";
            submitButton.disabled = true;
        } else {
            this.style.border = "none";
            submitButton.disabled = false;
        }
    } else {
        return;
    }
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].placeholder = placeholderDictionary[i];
    inputs[i].addEventListener('keyup', inputValidation, false);
}

