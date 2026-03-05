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

async function signIn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await loginUser(email, password);
    const message = document.getElementById('message');

    if (result == "Login successful!"){
        message.textContent = 'Welcome Back!';
        message.style.color = 'green';
    }else{
        message.textContent = 'Invalid Email or Password.';
        message.style.color = 'red';
    }
}

function handleWorkoutChoice(){
    const choice = document.getElementById('workout-select').value;
    const customInput = document.getElementById('custom-workout');

    if (choice == 'other'){
        customInput.style.display = 'block';
    }else{
        customInput.style.display = 'none';
    }
}