const searchBtn = document.getElementById("search-btn")
const containerEl = document.getElementById("container")
const formEl =document.getElementById("search-bar")
const searchInput = document.getElementById("search-input")

searchBtn.addEventListener('click', function searchMovies(e) {
    e.preventDefault()
    const formData = new FormData(formEl)
    const query = formData.get("movie")
    console.log(query)
    fetch(`http://www.omdbapi.com/?apikey=e26bf671&s=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.Response === "True"){
            console.log(data.Search)
        } else {
            containerEl.innerHTML = `<p class="error-txt">Unable to find what you’re looking for. Please try another search.</p>`
            console.log(data.Error)
        }
        
        console.log(searchInput.value)
    })
})



// function searchMovies(e) {
//     e.preventDefault()
//     fetch("http://www.omdbapi.com/?apikey=e26bf671&s=Blade+Runner")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         console.log(data.Plot)
//     })
// }

