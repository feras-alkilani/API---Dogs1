// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

const dogsTag = document.querySelector("[data-dogs]");
const dogImage = document.querySelector("[data-image]");

async function getImage(event) {
	const breed = event.target.getAttribute("data-image");
	const imageAPI = `https://dog.ceo/api/breed/${breed}/images`;

	let result = await fetch(imageAPI)
		.then((response) => response.json())
		.then((data) => data);

	let randomImage = getRandomInt(result.message.length);
	let src = result.message[randomImage];
	dogImage.setAttribute("src", src);
	dogImage.setAttribute("alt", breed);
	return result;
}

function generateHTML(breeds) {
	Object.keys(breeds).forEach((breed) => {
		let button = document.createElement("button");
		button.setAttribute("data-image", breed);
		button.innerHTML = breed;
		dogsTag.appendChild(button);
		dogsTag.addEventListener("click", getImage);
	});
}

async function getBreeds() {
	const breedsAPI = "https://dog.ceo/api/breeds/list/all";
	let result = await fetch(breedsAPI)
		.then((response) => response.json())
		.then((data) => data);

	return generateHTML(result.message);
}

getBreeds();
