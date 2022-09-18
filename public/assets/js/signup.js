async function handleSignup(event) {
    event.preventDefault();

    const username = document.querySelector('#username-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: { 'Content-Type': 'application/json'},
    });

        response.ok 
                ? document.location.replace('/dashboard') 
                : alert('Failed to sign up');
};

document.querySelector('#signup-form').addEventListener('submit', handleSignup);