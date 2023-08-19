document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (username === '') {
            alert('Por favor, ingresa un nombre de usuario.');
            return;
        }
        
        if (password === '') {
            alert('Por favor, ingresa una contraseña.');
            return;
        }
        
        if (username === 'admin' && password === '1234') {
            // Autenticación exitosa, redirigir a index.html
            window.location.href = 'inicio.html';
        } else {
            // Autenticación fallida, muestra mensaje de error
            alert('Nombre de usuario o contraseña incorrectos. Por favor, intenta nuevamente.');
        }
    });
});
