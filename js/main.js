
window.onload = printMovies();


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

class movie {
	constructor(title, year, director) {
		this.title = title;
		this.year = year;
		this.director = director;
	}
}


document.getElementById('myForm').addEventListener('submit', (e) => {
	// Prevent the page from reloading on 'Submit'
	e.preventDefault();

	// console.log(e.target.firstElementChild.lastElementChild.value);

	let movieName = document.getElementById('movieName').value;
	let movieYear = document.getElementById('exampleFormControlSelect1').value;
	let movieDirector = document.getElementById('movieDirector').value;

	if (!movieName) {
		alert('Please enter a movie name');
		return;
	}

	if (!movieDirector)	{
		alert('Please enter the director\'s name');
		return;
	}

	// console.log(movieName);
	// console.log(movieYear);
	// console.log(movieDirector);

	let moviesList = [];
	// console.log(moviesList);
	const newEntry = new movie(movieName, movieYear, movieDirector);

	
	let storedList = JSON.parse(localStorage.getItem('List of Movies'));

	// if not null
	if(storedList)
		moviesList = [...storedList];

	moviesList.push(newEntry);

	localStorage.setItem('List of Movies', JSON.stringify(moviesList));


	// Reset the fields
	document.getElementById('movieName').value = '';
	document.getElementById('movieDirector').value = '';


	printMovies();


});


function printMovies()
{
	let storedList = JSON.parse(localStorage.getItem('List of Movies'));

	if(storedList)
	{
		let toBePrinted = '';
		let i = 0;

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

	let storedList = JSON.parse(localStorage.getItem('List of Movies'));

	let movieName = btn.parentNode.previousElementSibling
		.previousElementSibling.previousElementSibling.innerHTML;
	let movieYear = btn.parentNode.previousElementSibling.previousElementSibling.innerHTML;
	let movieDirector = btn.parentNode.previousElementSibling.innerHTML;

	let updatedList = [];

	storedList.forEach(movie => {
		// console.log(movie.title);

		if ((movieName != movie.title) || 
			(movieYear != movie.year) || 
			(movieDirector != movie.director))
		{
			updatedList.push(movie);
		}

	});

	// console.log(storedList);
	// console.log(updatedList);

	localStorage.setItem('List of Movies', JSON.stringify(updatedList));
	printMovies();
}	