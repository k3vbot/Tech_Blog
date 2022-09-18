const handleSignin = async (e) => {
    console.log(e);
    e.preventDefault();

    const usernameEl = document.querySelector('#username-input-signin');
    console.log(usernameEl);
    const passwordEl = document.querySelector('#password-input-signin');

    const response = await fetch('/api/user/signin', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    response.ok
            ? document.location.replace('/dashboard')
            : alert('Failed to signin')
};

document.querySelector('#signin-form').addEventListener('submit', handleSignin);