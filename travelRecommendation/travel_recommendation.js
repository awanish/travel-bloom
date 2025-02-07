// window.onload = () => {
// 	console.log("page loaded");
// 	fecthData();
// };

async function fecthData() {
	const url = "travel_recommendation_api.json";
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

const validSearchKeywords = [
	"beach",
	"beaches",
	"temple",
	"temples",
	"country",
	"countries",
];
const keywordMapping = {
	beach: "beaches",
	temple: "temples",
	country: "countries",
};
const searchButton = document.getElementById("search");
searchButton.addEventListener("click", async () => {
	const text = document.getElementById("text").value.trim().toLowerCase();
	if (validSearchKeywords.includes(text)) {
		const keyword = keywordMapping[text] ?? text;
		// console.log(keyword);

		const destinations = await fecthData();
		// console.log(destinations);

		if (destinations) {
			const data = destinations[keyword];
			console.log(data);

			let destinationsHtml = "";
			data.forEach((destination) => {
				let name, imageUrl, description;
				if (keyword === "countries") {
					name = destination.cities[0].name;
					imageUrl = destination.cities[0].imageUrl;
					description = destination.cities[0].description;
				} else {
					name = destination.name;
					imageUrl = destination.imageUrl;
					description = destination.description;
				}
				// console.log(destination);
				destinationsHtml += `<div class="destination-card">
				<img src="${imageUrl}" alt="${name}">
				<div class="card-content">
					<h3>${name}</h3>
					<p>${description}</p>
					<a href="#" class="visit-btn">Visit</a>
				</div>
			</div>`;
			});

			document.getElementById("destinations").innerHTML =
				destinationsHtml;
			console.log(destinations);
		}
	} else {
		alert("Invalid Keyword");
	}
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
	document.getElementById("text").value = "";
});
