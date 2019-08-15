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

	const movieName = document.getElementById('movieName').value;
	const movieYear = document.getElementById('exampleFormControlSelect1').value;
	const movieDirector = document.getElementById('movieDirector').value;

	// console.log(movieName);
	// console.log(movieYear);
	// console.log(movieDirector);

	let moviesList = [];
	const newEntry = new movie(movieName, movieYear, movieDirector);
	// const newEntry2 = new movie(movieName, movieYear, movieDirector);
	moviesList.push(newEntry);
	// moviesList.push(newEntry2);

	/***** You should get the old list first *****/
	localStorage.setItem('List of Movies', JSON.stringify(moviesList));

	/***** Should manage local storage first then make a new function just for printing *****/
	/***** Print should get its data from local storage onlyyyyyy *****/
	document.getElementById('tableBody').innerHTML += 
	`
	    <tr>
	      <th scope="row">1</th>
	      <td>${movieName}</td>
	      <td>${movieYear}</td>
	      <td>${movieDirector}</td>
	      <td>
	      	<button class="btn btn-danger btn-sm">Remove</button>
	      </td>
	    </tr>
	`;
});