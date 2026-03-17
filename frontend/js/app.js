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

    if (result.id){
        sessionStorage.setItem('userId', result.id);
        sessionStorage.setItem('username', result.username);
        message.textContent = 'Welcome Back!';
        message.style.color = 'green';
        window.location.href = '../index.html'

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

async function createWorkout(){
    const workoutName = getWorkoutName();
    const time = document.getElementById('time-select').value;
    //const message = document.getElementById('message');
    const userId = sessionStorage.getItem('userId');
    const status = true;

    const result = await saveWorkout(userId, workoutName, time, status);

    if (result.id){
        sessionStorage.setItem('workoutName', workoutName);
        sessionStorage.setItem('workoutId', result.id);
        sessionStorage.setItem('status', status);
        window.location.href = 'exercise.html';
    }

}

function loadExercisePage(){
    const workoutName = sessionStorage.getItem('workoutName');

    document.getElementById('workout-title').textContent = workoutName;

}

async function createExercise(){
    const exerciseName = document.getElementById('exercise-name').value;
    const sets = document.getElementById('sets-num').value;
    const workoutId = sessionStorage.getItem('workoutId');

    const result = await saveExercise(exerciseName, sets, workoutId);

    if (result.id){
        sessionStorage.setItem('exerciseName', exerciseName);
        sessionStorage.setItem('sets', sets);
        sessionStorage.setItem('exerciseId', result.id);
        window.location.href = 'sets.html';
    }
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

async function saveSet(action){
    const sets = parseInt(sessionStorage.getItem('sets'));
    const exerciseId = sessionStorage.getItem('exerciseId');
    const workoutId = sessionStorage.getItem('workoutId');

    for (let i = 1; i <= sets; i++){
        const reps = document.getElementById(`rep-${i}`).value;
        const weight = document.getElementById(`weight-${i}`).value;
        const intensity = document.getElementById(`intensity-${i}`).value;
        await saveSetApi(exerciseId, i, reps, weight, intensity);
    }

    if (action == 'exercise'){
        window.location.href = 'exercise.html';
    }else{
        await endWorkout(workoutId);
        window.location.href = 'dashboard.html';
    }

}

//temporary frontend check for dev
function checkAuth(){
    const userId = sessionStorage.getItem('userId');
    if (!userId){
        window.location.href = 'signin.html'
    }
}

async function loadDashboard(){
    checkAuth();
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    const workouts = await getWorkoutHistory(parseInt(userId));
    const container = document.getElementById('workout-list');
    const container2 = document.getElementById('welcome-message');

    container2.innerHTML = `<h2>Welcome ${username}!</h2>`;

    if (workouts.length == 0){
        container.innerHTML = '<p>No workouts logged yet. Start your first one!</p>';
        return;
    }

    workouts.forEach(workout => {
        const date = new Date(workout.date).toLocaleDateString(); //formats date to user's locale
        container.innerHTML += `
        <div class="workout-card">
            <h3>${workout.name}</h3>
            <p>${date}</p>
            <button onclick="viewWorkout(${workout.id})">View Details</button>
        </div>`
    });
}