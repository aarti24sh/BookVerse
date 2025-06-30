const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');
const booksTbody = document.getElementById('booksTbody');
const searchInput = document.getElementById('searchInput');
const addBookBtn = document.getElementById('addBookBtn');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const changePasswordModal = document.getElementById('changePasswordModal');
const closeChangePasswordModalBtn = document.getElementById('closeChangePasswordModal');
const changePasswordForm = document.getElementById('changePasswordForm');
const changePasswordMessage = document.getElementById('changePasswordMessage');

let booksData = [];
let currentSortField = null;
let currentSortDirection = 'asc';

// Message display helper
function showMessage(msg, isError = true) {
    if (!messageDiv) return;
    messageDiv.textContent = msg;
    messageDiv.style.color = isError ? 'red' : 'green';
}

// ========================
// Auth - Register/Login
// ========================

const apiBaseUrl = '/api/auth';

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const res = await fetch(`${apiBaseUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (json.success) {
                showMessage('Registration successful! You can now log in.', false);
                registerForm.reset();
            } else {
                showMessage(json.message || json.errors?.map(e => e.msg).join(', ') || 'Registration failed');
            }
        } catch {
            showMessage('Network error');
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const res = await fetch(`${apiBaseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await res.json();

            if (json.success) {
                localStorage.setItem('token', json.token);
                localStorage.setItem('user', JSON.stringify(json.user));
                showMessage('Login successful! Redirecting...', false);
                setTimeout(() => {
                    window.location.href = 'books.html';
                }, 1000);
            } else {
                showMessage(json.message || json.errors?.map(e => e.msg).join(', ') || 'Login failed');
            }
        } catch {
            showMessage('Network error');
        }
    });
}

// Open Change Password modal
changePasswordBtn?.addEventListener('click', () => {
    changePasswordMessage.textContent = '';
    changePasswordForm.reset();
    changePasswordModal.style.display = 'flex';
});

// Close Change Password modal
closeChangePasswordModalBtn?.addEventListener('click', () => {
    changePasswordModal.style.display = 'none';
});

// Handle Change Password form submission
changePasswordForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmNewPassword = document.getElementById('confirmNewPassword').value.trim();

    // Clear previous message
    changePasswordMessage.textContent = '';

    // Basic client-side validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        changePasswordMessage.textContent = 'All fields are required.';
        return;
    }

    if (newPassword !== confirmNewPassword) {
        changePasswordMessage.textContent = 'New passwords do not match.';
        return;
    }

    // You can add more password strength validation here if desired

    const token = localStorage.getItem('token');
    if (!token) {
        changePasswordMessage.textContent = 'You must be logged in to change your password.';
        return;
    }

    try {
        const res = await fetch(`${apiBaseUrl}/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });

        const json = await res.json();

        if (json.success) {
            changePasswordMessage.style.color = 'green';
            changePasswordMessage.textContent = 'Password changed successfully!';
            setTimeout(() => {
                changePasswordModal.style.display = 'none';
                changePasswordMessage.style.color = 'red';
                changePasswordForm.reset();
            }, 1500);
        } else {
            // Show error messages from server validation or other errors
            if (json.errors && Array.isArray(json.errors)) {
                changePasswordMessage.textContent = json.errors.map(e => e.msg).join(', ');
            } else {
                changePasswordMessage.textContent = json.message || 'Failed to change password.';
            }
        }
    } catch (error) {
        changePasswordMessage.textContent = 'Network error. Please try again.';
    }
});

// Close modals when clicking outside modal content
window.addEventListener('click', (e) => {
    if (e.target === changePasswordModal) {
        changePasswordModal.style.display = 'none';
    }
});

// ========================
// Book Listing
// ========================

function renderBooksTable(books) {
    booksTbody.innerHTML = '';

    if (books.length === 0) {
        booksTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No books found.</td></tr>`;
        return;
    }

    books.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.status}</td>
      <td>${book.rating}</td>
      <td>
        <button class="editBtn" data-id="${book._id}">Edit</button>
        <button class="deleteBtn" data-id="${book._id}">Delete</button>
      </td>
    `;
        booksTbody.appendChild(tr);
    });

    document.querySelectorAll('.editBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            openEditModal(id); // will implement later
        });
    });

    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            confirmDelete(id);
        });
    });
}

function openEditModal(id) {
    const book = booksData.find(b => b._id === id);
    if (!book) return;

    editingBookId = id;
    modalTitle.textContent = 'Edit Book';
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookStatus').value = book.status;
    document.getElementById('bookRating').value = book.rating;
    document.getElementById('bookNotes').value = book.notes || '';

    bookModal.style.display = 'flex';
}

async function loadBooks() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('spinner').style.display = 'block';

    try {
        const res = await fetch('/api/books', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        if (!json.success) {
            showMessage(json.message || 'Failed to load books');
            return;
        }

        booksData = json.data;
        renderBooksTable(booksData);
    } catch {
        showMessage('Error fetching books');
    } finally {
        document.getElementById('spinner').style.display = 'none'; // Hide spinner
    }
}

// ========================
// Search Filter
// ========================

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        const filtered = booksData.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
        renderBooksTable(filtered);
    });
}

// ========================
// Sorting by Column
// ========================

document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
        const field = th.getAttribute('data-sort');

        if (currentSortField === field) {
            currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortField = field;
            currentSortDirection = 'asc';
        }

        const sorted = [...booksData].sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];

            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return currentSortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return currentSortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        renderBooksTable(sorted);
    });
});

// ========================
// Delete Book
// ========================

const confirmDeleteModal = document.getElementById('confirmDeleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

let bookIdToDelete = null;

function confirmDelete(id) {
    bookIdToDelete = id;
    confirmDeleteModal.style.display = 'flex';
}

cancelDeleteBtn.addEventListener('click', () => {
    confirmDeleteModal.style.display = 'none';
    bookIdToDelete = null;
});

confirmDeleteBtn.addEventListener('click', async () => {
    if (!bookIdToDelete) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const res = await fetch(`/api/books/${bookIdToDelete}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const json = await res.json();
        if (json.success) {
            showMessage('Book deleted', false);
            loadBooks();
        } else {
            showMessage(json.message || 'Failed to delete book');
        }
    } catch {
        showMessage('Delete failed');
    } finally {
        confirmDeleteModal.style.display = 'none';
        bookIdToDelete = null;
    }
});

// ========================
// Page Init
// ========================

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('books.html')) {
        loadBooks();
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

const bookModal = document.getElementById('bookModal');
const bookForm = document.getElementById('bookForm');
const modalTitle = document.getElementById('modalTitle');
const formMessageDiv = document.getElementById('formMessage');

let editingBookId = null;

// Open modal for adding book
addBookBtn?.addEventListener('click', () => {
    editingBookId = null;
    modalTitle.textContent = 'Add Book';
    bookForm.reset();
    showFormMessage('');
    bookModal.style.display = 'flex';
});

// Close modal
document.getElementById('closeModalBtn').addEventListener('click', () => {
    bookModal.style.display = 'none';
    showFormMessage('');
});

bookForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    showFormMessage('');

    const token = localStorage.getItem('token');
    if (!token) return;

    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const ratingValue = document.getElementById('bookRating').value.trim();
    const rating = parseInt(ratingValue);

    if (!title || !author) {
        showFormMessage('Title and Author are required');
        return;
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
        showFormMessage('Rating must be a number between 1 and 5');
        return;
    }

    const data = {
        title: document.getElementById('bookTitle').value.trim(),
        author: document.getElementById('bookAuthor').value.trim(),
        status: document.getElementById('bookStatus').value,
        rating,
        notes: document.getElementById('bookNotes').value.trim()
    };

    const method = editingBookId ? 'PUT' : 'POST';
    const url = editingBookId ? `/api/books/${editingBookId}` : '/api/books';

    try {
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        if (json.success) {
            showFormMessage(editingBookId ? 'Book updated!' : 'Book added!', false);
            setTimeout(() => {
                bookModal.style.display = 'none';
                loadBooks();
                showFormMessage(''); // clear on close
            }, 1000);
        } else {
            showFormMessage(json.message || 'Failed to save book');
        }
    } catch {
        showFormMessage('Error saving book');
    }
});

function showFormMessage(msg = '', isError = true) {
    if (!formMessageDiv) return;
    formMessageDiv.textContent = msg;
    formMessageDiv.style.color = isError ? 'red' : 'green';
}
