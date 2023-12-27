document.getElementById('registroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const registroUsuario = document.getElementById('registroUsuario').value;
    const registroContraseña = document.getElementById('registroContraseña').value;
    const registroError = document.getElementById('registroError'); // Elemento para mostrar mensajes de error

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario: registroUsuario, contraseña: registroContraseña }),
        });

        if (response.ok) {
            // Registro exitoso
            console.log('Registro exitoso');
            registroError.textContent = ''; // Limpiar mensajes de error
        } else {
            // Manejar errores
            const data = await response.json();
            registroError.textContent = data.message; // Mostrar el mensaje de error
            console.error('Error en el registro:', data.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        registroError.textContent = 'Error en la solicitud'; // Mostrar mensaje de error genérico
    }
});

document.getElementById('inicioSesionForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const inicioUsuario = document.getElementById('inicioUsuario').value;
    const inicioContraseña = document.getElementById('inicioContraseña').value;
    const inicioError = document.getElementById('inicioError'); // Elemento para mostrar mensajes de error

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario: inicioUsuario, contraseña: inicioContraseña }),
        });

        if (response.ok) {
            // Inicio de sesión exitoso
            console.log('Inicio de sesión exitoso');
            inicioError.textContent = ''; // Limpiar mensajes de error
        } else {
            // Manejar errores
            const data = await response.json();
            inicioError.textContent = data.message; // Mostrar el mensaje de error
            console.error('Error en el inicio de sesión:', data.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        inicioError.textContent = 'Error en la solicitud'; // Mostrar mensaje de error genérico
    }
});
