async function signinFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signin').value.trim();
    const password = document.querySelector('#password-signin').value.trim();

    if (usernmae && password) {
        const response = await fetch('/api/user/signin', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signin-form').addEventListener('submit', signinFormHandler);