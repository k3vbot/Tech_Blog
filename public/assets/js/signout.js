async function signout() {
    const response = await fetch('/api/users/signout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    } 
}

document.querySelector('#signout').addEventListener('click', signout);