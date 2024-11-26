document.getElementById('ingresoBtn').addEventListener('click', async (e) => { e.preventDefault(); 
    
    // Prevenir comportamiento por defecto del botón 
    const username = document.getElementById('usuario').value; 
    const password = document.getElementById('password1').value; 
    
    const response = await fetch('/login', {
    method: 'POST',
    headers: { 
    'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({ username, password })
     }); 
    const data = await response.json(); 
    if (response.ok) { console.log('Token:', data.token); 

    // Puedes guardar el token en el almacenamiento local, cookies, etc. 
    } else { alert(data.message); } });