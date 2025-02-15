async function getPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();

        const postsContainer = document.querySelector(".postes");
        postsContainer.innerHTML = ""; // Clear previous posts

        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            postsContainer.appendChild(postDiv); // More efficient than innerHTML +=
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Error fetching posts",error); // Or a more user-friendly error message
    }
}

async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();

        const usersContainer = document.querySelector(".us");
        usersContainer.innerHTML = "";

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
            userDiv.innerHTML = `<h3>${user.name}</h3><h3>${user.email}</h3>`;
            userDiv.addEventListener('click', () => clicked(user.id, userDiv)); 
            usersContainer.appendChild(userDiv);
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users");
    }
}

getPosts(1);
getUsers();


function clicked(id, element) {
    getPosts(id);

    const users = document.querySelectorAll(".user");
    users.forEach(user => user.removeAttribute("id"));

    element.id = "selected"; 
}