class movie {
	constructor(title, year, director) {
		this.title = title;
		this.year = year;
		this.director = director;
	}
}

// Get the year input field
let formSelect = document.getElementById('exampleFormControlSelect1');

// Make the list of options for the release year
for (let i=1900 ; i<=2030 ; i++) {

	// Make the current year the default selection
	let d = new Date();
	let n = d.getFullYear();
	if(i===n)
		formSelect.innerHTML += `<option selected>${i}</option>`;
	else
		formSelect.innerHTML += `<option>${i}</option>`;
}

// On load, retrieve the stored movies and print them on the screen
window.onload = printMovies();

// On clicking submit, make a new entry with the new input
document.getElementById('myForm').addEventListener('submit', (e) => {

	// Prevent the page from reloading on 'Submit'
	e.preventDefault();

	let movieName = document.getElementById('movieName').value;
	let movieYear = document.getElementById('exampleFormControlSelect1').value;
	let movieDirector = document.getElementById('movieDirector').value;

	// A form validation to prevent submitting empty fields
	if (!movieName) {
		alert('Please enter a movie name');
		return;
	}

	if (!movieDirector)	{
		alert('Please enter the director\'s name');
		return;
	}

	// Array of classes
	let moviesList = [];
	const newEntry = new movie(movieName, movieYear, movieDirector);

	// Get the old movie list from the local storage
	let storedList = JSON.parse(localStorage.getItem('List of Movies'));

	// if not null
	if(storedList)
		moviesList = [...storedList];

	moviesList.push(newEntry);

	// Re-store the movies list after adding the new entry
	localStorage.setItem('List of Movies', JSON.stringify(moviesList));

	// Reset the fields
	document.getElementById('movieName').value = '';
	document.getElementById('movieDirector').value = '';

	// After adding to local storage, print the new entry on the screen
	printMovies();
});


// Print the list in the local storage on the screen
function printMovies()
{
	let storedList = JSON.parse(localStorage.getItem('List of Movies'));

	if(storedList)
	{
		// Text to be printed
		let toBePrinted = '';
		let i = 0;

		// Print each movie in a new row
		storedList.forEach(movie => {
			i++;
			toBePrinted += 
			`
			    <tr>
			      <th scope="row">${i}</th>
			      <td>${movie.title}</td>
			      <td>${movie.year}</td>
			      <td>${movie.director}</td>
			      <td>
			      	<button class="btn btn-danger btn-sm"
			      	onclick="removeMovie(this)">Remove</button>
			      </td>
			    </tr>
			`
		});

		document.getElementById('tableBody').innerHTML = toBePrinted;
	}
}


function removeMovie(btn) {

	// Get the movie list from the local storage
	let storedList = JSON.parse(localStorage.getItem('List of Movies'));

	// Get the siblings of the specific button pressed in the table
	let movieName = btn.parentNode.previousElementSibling
		.previousElementSibling.previousElementSibling.innerHTML;
	let movieYear = btn.parentNode.previousElementSibling.previousElementSibling.innerHTML;
	let movieDirector = btn.parentNode.previousElementSibling.innerHTML;

	let updatedList = [];

	// Store all the movies in the updated list except the one to be removed
	storedList.forEach(movie => {

		if ((movieName != movie.title) || 
			(movieYear != movie.year) || 
			(movieDirector != movie.director))
		{
			updatedList.push(movie);
		}

	});

	localStorage.setItem('List of Movies', JSON.stringify(updatedList));
	printMovies();
}	


// On clicking on the 'title' header in the table, sort by title
document.getElementById('th-title').addEventListener('click', function(){

	let oldList = JSON.parse(localStorage.getItem('List of Movies'));
	let sortedList = oldList.sort((a, b) => 
		(a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));


	localStorage.setItem('List of Movies', JSON.stringify(sortedList));
	printMovies();
});


// On clicking on the 'year' header in the table, sort by year
document.getElementById('th-year').addEventListener('click', function(){

	let oldList = JSON.parse(localStorage.getItem('List of Movies'));
	let sortedList = oldList.sort((a, b) => (a.year > b.year ? 1 : -1));

	localStorage.setItem('List of Movies', JSON.stringify(sortedList));
	printMovies();
});


// On clicking on the 'director' header in the table, sort by director
document.getElementById('th-director').addEventListener('click', function(){

	let oldList = JSON.parse(localStorage.getItem('List of Movies'));
	let sortedList = oldList.sort((a, b) => 
		(a.director.toLowerCase() > b.director.toLowerCase() ? 1 : -1));

	localStorage.setItem('List of Movies', JSON.stringify(sortedList));
	printMovies();
});