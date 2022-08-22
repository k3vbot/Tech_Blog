async function commentFormHandler(event) {
    event.preventDefault();

    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();

    const blogId = window.location.toString90.split('/') [
        window.location.toString().split('/').length - 1
    ];

    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringifu({
                blogId,
                commentText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);