const blogId = document.querySelector('input[name="blog-id"]').value;

const handleEdit = async (e) => {
    e.preventDefault();

    const title = document.querySelector('input[name="blog-title"]').value;
    const text = document.querySelector('textarea[name="blog-body"]').value;

    await fetch(`/api/blog/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            text,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    document.location.replace('/dashboard')

};

const handleDelete = async () => {
    await fetch(`/api/blog/${blogId}`, {
        method: 'DELETE',
    });

    document.location.replace('/dashboard');

};

document.querySelector('#edit-blog-form').addEventListener('submit', handleEdit);

document.querySelector('#delete-btn').addEventListener('click', handleDelete);

