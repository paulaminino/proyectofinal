document.getElementById('ingresoBtn').addEventListener('click', function() {

    const username = document.getElementById('usuario').value; 
    const password = document.getElementById('password1').value; 

    const data = { 
        username: username, 
        password: password 
    };
    
    fetch('/login', {
    method: 'POST',
    headers: { 
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
     })
    .then(response => response.json())
    .then(result => {
        if (result.token) {
            alert('Login exitoso!');
            console.log('Token:', result.token);
            window.location.href = "index.html";
        } else {
            alert ('Login fallido, datos erróneos');
        }
    })

.catch(error => {
    console.log('Error:', error)
});

});