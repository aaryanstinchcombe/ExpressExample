async function getData() {
	const res = await fetch(`/api`);
	const data = await res.json();
	console.log(data);
	return data;
}

function createCard(post) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `
    <div class="card">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
    </div>
    `;
	return card;
}

function createContent() {
	const content = document.getElementById('content');
	getData().then((users) => {
		users.forEach((user) => {
			user.posts.forEach((post) => {
				content.appendChild(createCard(post));
			});
		});
	});
}

createContent();
