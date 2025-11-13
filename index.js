import { movieKey, createMovieCard } from './constants.js'
import { API_KEY } from './config.js'

const searchBtn = document.getElementById("search-btn")
const containerEl = document.getElementById("container")
const formEl =document.getElementById("search-bar")
const searchInput = document.getElementById("search-input")
const watchlistPage = document.getElementById("watchlist-page")
const MAX_SEARCH_RESULTS = 5
let movieList =[]
const movieCache = new Map()

const ADDED_BUTTON_HTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM6.5 11.5L3 8L4.41 6.59L6.5 8.67L11.59 3.58L13 5L6.5 11.5Z" fill="#10B981"/>
    </svg>
    <p>Added</p>
`

watchlistPage.addEventListener('click',() => window.location.href = "watchlist.html")

searchBtn.addEventListener('click', function searchMovies(e) {
    e.preventDefault()
    const formData = new FormData(formEl)
    const movieInput = formData.get("movie")
    
    if(!movieInput || !movieInput.trim()){
        containerEl.innerHTML = `<div class="placeholder"><p>Please enter a movie title</p></div>`
        return
    }
    
    const query = encodeURIComponent(movieInput)
    console.log(query)
        
    // Show loading state
    containerEl.innerHTML = `
        <div class="placeholder">
            <p>Searching for "${movieInput}"...</p>
        </div>
    `
    
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.Response === "True"){
            console.log(data.Search)
            getMovies(data.Search)
        } else {
            let errorMessage = "Unable to find what you're looking for. Please try another search."
            
            if(data.Error === "Too many results.") {
                errorMessage = "Too many results found. Please be more specific with your search."
            } else if(data.Error === "Invalid API key!") {
                errorMessage = "Configuration error. Please contact support or check your API key."
            }

            containerEl.innerHTML = `
            <div class="placeholder">
                <p>${errorMessage}</p>
            </div>`
            console.log(data.Error)
        }
        console.log(searchInput.value)
    })
    .catch(error => {
        console.error("API Error: ", error)
        containerEl.innerHTML = `
            <div class="placeholder">
                <p>Something went wrong. Please try again later.</p>
            </div>`
    })
})

function getMovies(movieArr) {
    containerEl.innerHTML = ''
    movieList = []
    
    const promises = movieArr.slice(0, MAX_SEARCH_RESULTS).map(movie => {
        if(movieCache.has(movie.imdbID)) {
            return Promise.resolve(movieCache.get(movie.imdbID))
        }
        
        return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
            .then(res => res.json())
            .then(data => {
                movieCache.set(movie.imdbID, data)
                return data
            })
    })
    
    Promise.all(promises).then(moviesData => {
        movieList = moviesData
        const html = moviesData.map(data => createMovieCard(data)).join('')
        containerEl.innerHTML = html

        // Update button state for movies already in watchlist
        const existingMovies = JSON.parse(localStorage.getItem(movieKey)) || []
        existingMovies.forEach(savedMovie => {
            const watchlistBtn = document.getElementById(savedMovie.imdbID)
            if(watchlistBtn) {
                watchlistBtn.innerHTML = ADDED_BUTTON_HTML
            }
        })

        searchInput.value = ''
    })
}

containerEl.addEventListener("click",function(e) {
    const watchlistBtn = e.target.closest('.watchlist')
    
    if(watchlistBtn) {
        const movieId =  watchlistBtn.id
        const existingMovies = JSON.parse(localStorage.getItem(movieKey)) || []
        console.log("Watchlist Clicked for movie ID:",movieId)
        const isAdded = existingMovies.find(m => m.imdbID === movieId)
        
        if(isAdded) {
            console.log("Movie already added to Watchlist")
            return
        }
        
        const movie = movieList.find(m => m.imdbID === movieId)
        if(movie) {

            console.log("Adding to watchlist: ",movie.Title)
            existingMovies.push(movie)
            localStorage.setItem(movieKey, JSON.stringify(existingMovies))

            // Visual feedback:
            watchlistBtn.innerHTML = ADDED_BUTTON_HTML
        }

    }
})