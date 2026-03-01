async function signUp(){
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await createUser(username, email, password);
    const message = document.getElementById('message');

    if (result.id){
        message.textContent = 'You have successfully signed up!';
        message.style.color = 'green';
    }else{
        message.textContent = 'Something went wrong. Try again.';
        message.style.color = 'red';
    }  
}