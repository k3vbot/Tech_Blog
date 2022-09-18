const handleNewBlog = async (e) => {
    e.preventDefault();

    const title = document.querySelector('input[name="blog-title"]').value;
    const text = document.querySelector('textarea[name="blog-body"]').value;

    await fetch(`/api/blog`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            text,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    document.location.replace('/dashboard');
};

document.querySelector('#new-blog-form').addEventListener('submit', handleNewBlog);