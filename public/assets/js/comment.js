const handleComment = async (e) => {
    e.preventDefault();

    const blog_id = document.querySelector('input[name="blog-id"]').value;
    const text = document.querySelector('textaea[name="comment-body"]').value;

    if (text) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                blog_id,
                text,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        document.location.reload();
    }
};

document.querySelector('#new-comment-form').addEventListener('submit', handleComment);