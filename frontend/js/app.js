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

function getWorkoutName(){
    const choice = document.getElementById('workout-select').value;
    const customInput = document.getElementById('custom-workout').value;

    if (choice == 'other'){
        return customInput;
    }
    return choice;
}

function goToExercise(){
    const workoutName = getWorkoutName();

    sessionStorage.setItem('workoutName', workoutName);

    window.location.href = 'exercise.html'
}

function loadExercisePage(){
    const workoutName = sessionStorage.getItem('workoutName');

    document.getElementById('workout-title').textContent = workoutName;

}

function goToSets(){
    const exerciseName = document.getElementById('exercise-name').value;
    const sets = document.getElementById('sets-num').value;

    sessionStorage.setItem('exerciseName', exerciseName);
    sessionStorage.setItem('sets', sets);

    window.location.href = 'sets.html';
}

function loadSetsPage(){
    const workoutName = sessionStorage.getItem('workoutName');
    const exerciseName = sessionStorage.getItem('exerciseName');
    const sets = parseInt(sessionStorage.getItem('sets'));

    document.getElementById('workout-title').textContent = workoutName;
    document.getElementById('exercise-title').textContent = exerciseName;

    const container = document.getElementById('sets-container');

    for (let i = 1; i <= sets; i++){
        container.innerHTML += `
            <div class="set-row">
                <label>Set ${i}</label>
                <input type="number" id="rep-${i}" placeholder="Reps">
                <input type="number" id="weight-${i}" placeholder="Weight (lbs)">
                <input type="number" id="intensity-${i}" placeholder="Intensity Level">
            </div>`;
    }
}