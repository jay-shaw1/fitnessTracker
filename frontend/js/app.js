//helper to display error/success messages
function showMessage(elementId, text, color){
    const element = document.getElementById(elementId);
    
    if (element){
        element.textContent = text;
        element.style.color = color;
    }
}

async function signUp(){
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{

        const result = await createUser(username, email, password);
        showMessage('message', 'Account created successfully!', 'green');
        setTimeout(() => window.location.href = 'signin.html', 1000);

    } catch (error) {
        showMessage('message', 'Something went wrong. Try again.', 'red');
    } 
}

async function signIn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{

        const result = await loginUser(email,password);
        sessionStorage.setItem('userId', result.id);
        sessionStorage.setItem('username', result.username);
        showMessage('message', `Welcome Back ${result.username}!`, 'green');
        setTimeout(() => window.location.href = 'dashboard.html', 1000);

    } catch (error) {
        showMessage('message', 'Invalid Email or Password. Please try again.', 'red');
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

    if (choice === 'other'){
        return customInput;
    }
    return choice;
}

async function createWorkout(){
    const workoutName = getWorkoutName();
    const time = document.getElementById('time-select').value;
    const userId = sessionStorage.getItem('userId');
    const status = true;

    try{

        const result = await saveWorkout(userId, workoutName, time, status);
        sessionStorage.setItem('workoutName', workoutName);
        sessionStorage.setItem('workoutId', result.id);
        sessionStorage.setItem('status', status);
        showMessage('message', 'Workout created successfully!', 'green');
        setTimeout(() => window.location.href = 'exercise.html', 1000);

    } catch (error) {
        showMessage('message', 'There was an error creating the workout.', 'red');
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

    try{

        const result = await saveExercise(exerciseName, sets, workoutId);
        sessionStorage.setItem('exerciseName', exerciseName);
        sessionStorage.setItem('sets', sets);
        sessionStorage.setItem('exerciseId', result.id);
        showMessage('message', 'Exercise created successfully.', 'green');
        setTimeout(() => window.location.href = 'sets.html', 1000);

    } catch (error) {
        showMessage('message', 'There was an error creating the exercise.', 'red');
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

        try {
            await saveSetApi(exerciseId, i, reps, weight, intensity);
        } catch (error) {
            showMessage('message', `Unable to save set ${i}`, 'red');
        }
    }

    if (action == 'exercise'){
        window.location.href = 'exercise.html';
    }else{

        try{
            await endWorkout(workoutId);
            window.location.href = 'dashboard.html';
        } catch (error) {
            showMessage('message', 'Unable to save workout. Try again.', 'red');
        }
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

    if (workouts.length === 0){
        container.innerHTML = '<p>No workouts logged yet. Start your first one!</p>';
        return;
    }

    workouts.forEach(workout => {
        const date = new Date(workout.date).toLocaleDateString(); //formats date to user's locale
        container.innerHTML += `
        <div class="workout-card">
            <h3>${workout.name}</h3>
            <p>${date}</p>
            <button onclick="toggleWorkoutDetails(${workout.id})">View Details</button>
            <div id="details-${workout.id}" style="display:none"></div>
        </div>`
    });
}

async function toggleWorkoutDetails(workoutId){
    const detailsDiv = document.getElementById(`details-${workoutId}`);

    //Hide details if details showing
    if (detailsDiv.style.display === 'block'){
        detailsDiv.style.display = 'none';
        return;
    }

    //fetch exercises
    const exercises = await getExercisesByWorkout(workoutId);

    let html = '';

    for (const exercise of exercises){
        html += `<div class="exercise-detail">
                    <h4>${exercise.name}</h4>`;

        //fetch sets
        const sets = await getSetsByExercise(exercise.id);

        sets.forEach(set => {
            html += `<p>Set ${set.setNum}:
                    ${set.reps} reps @ ${set.weight} lbs</p>`;
        });

        html += '</div>';
    }

    detailsDiv.innerHTML = html;
    detailsDiv.style.display = 'block';
}

const searchFilter = document.getElementById('search-filter');
if (searchFilter){
    searchFilter.addEventListener('change', function(){
        const input = document.getElementById('search-input');
        if (this.value === 'date'){
            input.type = 'date';
        }else{
            input.type = 'text';
            input.placeholder = 'Search...';
        }
    });
}


async function search(){
    const filter = document.getElementById('search-filter').value;
    const query = document.getElementById('search-input').value;
    const userId = sessionStorage.getItem('userId');
    document.getElementById('search-results').innerHTML = '';

    if (!query) return;

    let results = [];

    if (filter === 'workout'){
        results = await searchByWorkout(query, userId);
        displayWorkoutResults(results);
    } else if (filter === 'exercise'){
        results = await searchByExercise(query, userId);
        displayExerciseResults(results);
    } else if (filter === 'date'){
        results = await searchByDate(query, userId);
        displayWorkoutResults(results);
    }
}

function displayWorkoutResults(results){
    const html = document.getElementById('search-results');

    if (results.length === 0){
        html.innerHTML = '<p>No results found.<p>'
    }else{
        results.forEach(workout => {
            const date = new Date(workout.date).toLocaleDateString();
            html.innerHTML += `
                <div class="workout-card">
                    <h3>${workout.name}</h3>
                    <p>${date}</p>
                    <button onclick="toggleWorkoutDetails(${workout.id})">View Details</button>
                    <div id="details-${workout.id}" style="display:none"></div>
                </div>`
            }
        );
    }
}

async function displayExerciseResults(results){
    const container = document.getElementById('search-results');
    let html = '';

    if (results.length === 0){
        html = '<p>No results found.<p>'
    }else{
        for (const exercise of results){
            html += `<h4>${exercise.name}</h4>`;

            //fetch sets
            const sets = await getSetsByExercise(exercise.id);

            sets.forEach(set => {
                html += `<p>Set ${set.setNum}:
                    ${set.reps} reps @ ${set.weight} lbs</p>`;
            });
        }
    }
    container.innerHTML = html;
}