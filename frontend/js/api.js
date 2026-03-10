const BASE_URL = "http://localhost:8080/api" //Store root to backend

async function createUser(username, email, password){
    const response = await fetch(`${BASE_URL}/users`,
        {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ username, email, password })
        }
    );
    return response.json();
}

async function loginUser(email, password){
    const response = await fetch(`${BASE_URL}/users/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    if (response.ok){
        return response.json();
    }else{
        return response.text();
    }
}

async function saveWorkout(userId, name, time, status){
    const response = await fetch(`${BASE_URL}/workouts`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ name, time, status,
                user : { id : userId }
             })
        }
    );
    return response.json();
}

async function getWorkouts(){
    const response = await fetch(`${BASE_URL}/workouts`);
    return response.json();
}