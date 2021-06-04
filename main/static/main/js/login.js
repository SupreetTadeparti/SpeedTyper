let inputs = document.getElementsByTagName('input');
placeholderDictionary = {
    1 : 'Username',
    2 : 'Password',
    3 : 'Password Confirmation'
}
for (var i = 0; i < inputs.length; i++) {
    inputs[i].placeholder = placeholderDictionary[i]
}