async function signout() {
    const response = await fetch('/api/users/signout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    response.ok ? document.location.replace('/') : alert('Failed to signout')
}

document.querySelector('#signout-link').addEventListener('click', signout);