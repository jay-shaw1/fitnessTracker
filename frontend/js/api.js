const BASE_URL = "http://localhost:8080/api" //Store root to backend

//helper to build headers with token
function authHeaders(){
    const token = sessionStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

async function createUser(username, email, password){
    try{
        const response = await fetch(`${BASE_URL}/users`,
        {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ username, email, password })
        });

        if (!response.ok){
            throw new Error(await response.text());
        }
        return response.json();

    } catch (error) {
        console.error('createUser error: ', error);
        throw error;
    }
}

async function loginUser(email, password){
    try{
        const response = await fetch(`${BASE_URL}/users/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok){
            throw new Error(`Login failed.`);
        }

        return response.json();

    } catch (error) {
        console.error('loginUser error:', error);
    }
}

async function saveWorkout(userId, name, time, status){
    try{
        const response = await fetch(`${BASE_URL}/workouts`,
        {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ name, time, status,
                user : { id : userId }
             })
        });

        if (!response.ok){
            throw new Error('Unable to save workout.');
        }

        return response.json();

    } catch (error) {
        console.error('saveWorkout error: ', error);
    }
}

async function saveExercise(name, workoutId){
    try{
        const response = await fetch(`${BASE_URL}/exercises`,
        {
            method : 'POST',
            headers : authHeaders(),
            body : JSON.stringify({ name, 
                workout : { id : workoutId }
            })
        });

        if (!response.ok){
            throw new Error('Unable to save exercise.');
        }

        return response.json();

    } catch (error) {
        console.error('saveExercise error: ', error);
    }
}

async function saveSetApi(setNum, reps, weight, exerciseId){
    try{
        const response = await fetch(`${BASE_URL}/sets`,
        {
            method : 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ setNum, reps, weight,
                exercise : { id : exerciseId }
            })
        });

        if (!response.ok){
            throw new Error(await response.text());
        }

        return response.json();

    } catch (error) {
        console.error('saveSetApi error: ', error);
        throw error;
    }
}

async function endWorkout(workoutId){
    try{
        const response = await fetch(`${BASE_URL}/workouts/${workoutId}/complete`,
        {
            method : 'PATCH',
            headers : authHeaders()
        });

        if (!response.ok){
            throw new Error('Unable to end workout.');
        }

        return response.json();
        
    } catch (error) {
        console.error('endWorkout error: ', error);
    }
}

async function getWorkoutHistory(userId){
    try{
        const response = await fetch(`${BASE_URL}/workouts/users/${userId}`, {
            headers: authHeaders()
        });

        if (!response.ok) throw new Error('Unable to get workout history.');
        return response.json();
    } catch (error) {
        console.error('getWorkoutHistory error: ', error);
        return [];
    }
}

//Not used in app.js
async function getWorkout(workoutId){
    const response = await fetch(`${BASE_URL}/workouts/${workoutId}`)
    return response.json();
}

async function getExercisesByWorkout(workoutId){
    try{
        const response = await fetch(`${BASE_URL}/exercises/workout/${workoutId}`, {
            headers: authHeaders()
        });

        if (!response.ok) throw new Error('Cannot get exercises.');
        return response.json();
    } catch (error) {
        console.error('getExercisesByWorkout error: ', error);
    }
}

async function getSetsByExercise(exerciseId){
    try{
        const response = await fetch(`${BASE_URL}/sets/exercise/${exerciseId}`, {
            headers: authHeaders()
        });

        if (!response.ok) throw new Error('Cannot get sets.');
        return response.json();
    } catch (error) {
        console.error('getSetsByExercise error: ', error);
    }
}

async function searchByWorkout(name, userId){
    try{
        const response = await fetch(`${BASE_URL}/workouts/search?name=${name}&userId=${userId}`, {
            headers: authHeaders()
        });

        if(!response.ok) throw new Error('Search failed.');
        return response.json();
    } catch (error) {
        console.error('searchByWorkout error: ', error);
    }
}

async function searchByExercise(name, userId){
    try{
        const response = await fetch(`${BASE_URL}/exercises/search?name=${name}&userId=${userId}`, {
            headers: authHeaders()
        });

        if(!response.ok) throw new Error('Search failed.');
        return response.json();
    } catch (error) {
        console.error('searchByExercise error: ', error);
    }
}

async function searchByDate(date, userId){
    try{
        const response = await fetch(`${BASE_URL}/workouts/search?date=${date}&userId=${userId}`, {
            headers: authHeaders()
        });
        
        if(!response.ok) throw new Error('Search failed.')
        return response.json();
    } catch (error) {
        console.error('searchByDate error: ', error);
    }
}