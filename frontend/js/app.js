//helper to display error/success messages
function showMessage(elementId, text, color){
    const element = document.getElementById(elementId);
    
    if (element){
        element.textContent = text;
        element.style.color = color;
    }
}

//helper to handle expired/missing tokens
function requireAuth(){
    const token = sessionStorage.getItem('token');
    if (!token){
        window.location.href = 'signin.html';
    }
}

//check if current page needs authorization
const protectedPages = ['dashboard.html', 'workout.html', 'exercise.html', 'sets.html'];
const currentPage = window.location.pathname.split('/').pop();
if (protectedPages.includes(currentPage)){
    requireAuth();
}

//clear session storage when the user logs out
function logout(){
    sessionStorage.clear();
    showMessage('message', 'You are being logged out.', 'green');
    setTimeout(() => window.location.href = '../index.html', 1000);
}

async function signUp(){
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const error = validateSignUp(username, email, password);
    if (error){
        showMessage('message', error, 'red');
        return;
    }

    try{

        const result = await createUser(username, email, password);
        showMessage('message', 'Account created successfully!', 'green');
        setTimeout(() => window.location.href = 'signin.html', 1000);

    } catch (error) {
        showMessage('message', error.message, 'red');
        return;
    } 
}

async function signIn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const error = validateLogin(email, password);

    if (error){
        showMessage('message', error, 'red');
        return;
    }

    try{
        const result = await loginUser(email,password);

        if (result.token){
            sessionStorage.setItem('token', result.token);
            sessionStorage.setItem('userId', result.userId);
            sessionStorage.setItem('username', result.username);
            showMessage('message', `Welcome Back ${result.username}!`, 'green');
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
        }else{
            showMessage('message', 'Invalid credentials. Please try again.', 'red');
        }

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
    const error = validateCreateWorkout(workoutName);

    if (error){
        showMessage('message', error, 'red');
        return;
    }

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
    const error = validateCreateExercise(exerciseName, sets);

    if (error){
        showMessage('message', error, 'red');
        return;
    }

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
        const error = validateSaveSet(reps, weight, intensity);

        if (error) {
            showMessage('message', error, 'red');
            return;
        }

        try {
            await saveSetApi(exerciseId, i, reps, weight, intensity);
        } catch (error) {
            showMessage('message', `Unable to save set ${i}`, 'red');
        }
    }

    if (action == 'exercise'){
        showMessage('message', 'Your sets for this exercise have been saved.', 'green');
        setTimeout(() => window.location.href = 'exercise.html', 1000);
    }else{

        try{
            await endWorkout(workoutId);
            showMessage('message', 'Congrats! You completed a workout!', 'green');
            setTimeout(() => window.location.href = 'dashboard.html', 1500);
        } catch (error) {
            showMessage('message', 'Unable to save workout. Try again.', 'red');
        }
    }

}


async function loadDashboard(){
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    const container = document.getElementById('workout-list');
    const container2 = document.getElementById('welcome-message');
    let workouts = [];

    try{
        workouts = await getWorkoutHistory(parseInt(userId));
    } catch (error) {
        showMessage('message', 'Something went wrong. Try reloading the page.', 'red');
    }

    container2.innerHTML = `<h2>Welcome ${username}!</h2>`;

    if (workouts.length === 0){
        container.innerHTML = '<p>No completed workouts logged yet. Start your first one!</p>';
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
    let exercises = [];

    //Hide details if details showing
    if (detailsDiv.style.display === 'block'){
        detailsDiv.style.display = 'none';
        return;
    }

    //fetch exercises
    try{
        exercises = await getExercisesByWorkout(workoutId);
    } catch (error) {
        showMessage('message', 'Cannot retrieve workout details. Try again.', 'red');
    }

    let html = '';

    for (const exercise of exercises){
        let sets = [];
        html += `<div class="exercise-detail">
                    <h4>${exercise.name}</h4>`;

        //fetch sets
        try{
            sets = await getSetsByExercise(exercise.id);
        } catch (error) {
            showMessage('message', 'Cannot retrieve workout details. Try again.', 'red');
        }

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
        try{
            results = await searchByWorkout(query, userId);
            displayWorkoutResults(results);
        } catch(error){
            showMessage('message', 'Search failed. Try again.', 'red');
        }
    } else if (filter === 'exercise'){
        try{
            results = await searchByExercise(query, userId);
            displayExerciseResults(results);
        } catch(error){
            showMessage('message', 'Search failed. Try again.', 'red');
        }
    } else if (filter === 'date'){
        try{
            results = await searchByDate(query, userId);
            displayWorkoutResults(results);
        } catch(error){
            showMessage('message', 'Search failed. Try again.', 'red');
        }
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
            let sets = [];
            html += `<h4>${exercise.name}</h4>`;

            //fetch sets
            try {
                sets = await getSetsByExercise(exercise.id);
            } catch (error) {
                showMessage('message', 'Cannot display exercise results. Try again.', 'red');
            }

            sets.forEach(set => {
                html += `<p>Set ${set.setNum}:
                    ${set.reps} reps @ ${set.weight} lbs</p>`;
            });
        }
    }
    container.innerHTML = html;
}

//Validation helpers

function validateSignUp(username, email, password){
    if (!username || username.trim() === ''){
        return 'Username is required.';
    }
    if (!email || !email.includes('@')){
        return 'Please enter a valid email.';
    }
    if (!password || password.length < 6){
        return 'Password must be at least 6 characters.';
    }
    return null; //no error
}

function validateLogin(email, password){
    if (!email || !email.includes('@')){
        return 'Please enter a valid email.';
    }
    if (!password){
        return 'Please enter your password.'
    }
    return null;
}

function validateCreateWorkout(name){
    if (!name || name.trim() === ''){
        return 'You must enter a split.';
    }
    return null;
}

function validateCreateExercise(name, sets){
    if (!name || name.trim() === '') return 'You must enter an exercise name.';
    if (!sets || sets <= 0 || sets >= 9) return 'The number of sets must be between 1 and 8.';
    return null;
}

function validateSaveSet(reps, weight, intensity){
    if (!reps || reps <= 0) return 'You must fill in reps for each set.';
    if (!weight || weight <= 0) return 'You must fill in weight for each set.';
    if (!intensity || intensity <= 0 || intensity >= 11) return 'Intensity level must be between 1 and 10.';
    return null;
}