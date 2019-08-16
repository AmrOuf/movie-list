
window.onload = printMovies();


let formSelect = document.getElementById('exampleFormControlSelect1');

// Make the list of options for the release year
for(let i=1900 ; i<=2030 ; i++)
{
	// Make 2019 the default selection
	if(i===2019)
		formSelect.innerHTML += `<option selected>${i}</option>`;
	else
		formSelect.innerHTML += `<option>${i}</option>`;
}

class movie 
{
	constructor(title, year, director) 
	{
		this.title = title;
		this.year = year;
		this.director = director;
	}
}


document.getElementById('myForm').addEventListener('submit', function(e) 
{
	// Prevent the page from reloading on 'Submit'
	e.preventDefault();

	// console.log(e.target.firstElementChild.lastElementChild.value);

	let movieName = document.getElementById('movieName').value;
	let movieYear = document.getElementById('exampleFormControlSelect1').value;
	let movieDirector = document.getElementById('movieDirector').value;

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

		storedList.forEach(function(movie)
		{
			i++;
			toBePrinted += 
			`
			    <tr>
			      <th scope="row">${i}</th>
			      <td>${movie.title}</td>
			      <td>${movie.year}</td>
			      <td>${movie.director}</td>
			      <td>
			      	<button class="btn btn-danger btn-sm">Remove</button>
			      </td>
			    </tr>
			`
		});

		document.getElementById('tableBody').innerHTML = toBePrinted;
	}


}