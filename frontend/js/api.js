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

async function getWorkouts(){
    const response = await fetch(`${BASE_URL}/workouts`);
    return response.json();
}