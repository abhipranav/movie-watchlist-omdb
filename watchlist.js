import { movieKey, createMovieCard } from './constants.js'

const containerEl = document.getElementById("container")
const searchPage = document.getElementById("search-page")
const watchlistArr = JSON.parse(localStorage.getItem(movieKey)) || []
console.log(watchlistArr)

if(watchlistArr.length > 0) {
    containerEl.innerHTML = ''
    watchlistArr.forEach(movie => {
    containerEl.innerHTML += createMovieCard(movie, true)
});
}

searchPage.addEventListener("click", () => window.location.href = "index.html")

containerEl.addEventListener("click", function(e) {
    const addMoviesBtn =  e.target.closest(".add-movies")
    const removeBtn = e.target.closest(".remove")
    
    if(addMoviesBtn) {
        window.location.href = "index.html"
    }

    if(removeBtn) {
        const removeId = removeBtn.id
        console.log("Removed from watchlist: ",removeId)
        const currentWatchlist = JSON.parse(localStorage.getItem(movieKey)) || []
        const updatedWatchlist = currentWatchlist.filter(m => m.imdbID !== removeId)
        localStorage.setItem(movieKey, JSON.stringify(updatedWatchlist))

        removeBtn.closest('.movie').remove()

        if(updatedWatchlist.length === 0){
            location.reload()
        }
    }
})