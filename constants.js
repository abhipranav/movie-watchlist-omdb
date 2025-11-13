export const movieKey = 'myMovies'

export function createMovieCard(data, isWatchlistPage = false) {
    if(data.Poster === "N/A"){
                console.log("Using placeholder for:", data.Title)
                data.Poster = "source/placeholder.jpeg"
            }
    
    const className = isWatchlistPage ? 'remove' : 'watchlist'
    const buttonText = isWatchlistPage ? 'Remove' : 'Watchlist'
    const buttonSvg = isWatchlistPage
            ? ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="#111827"/>
                </svg>`
            
            : ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="#111827"/>
                </svg>`

    return `
        <div class="movie">
            <img class="poster" src="${data.Poster}" alt="${data.Title}" onerror="this.src='source/placeholder.jpeg'">
            <div class="details">
                <div class="heading">
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path d="M4.86276 0.518226C5.08727 -0.172757 6.06483 -0.172758 6.28934 0.518225L7.09152 2.98707C7.19193 3.29609 7.47989 3.50531 7.80481 3.50531H10.4007C11.1273 3.50531 11.4293 4.43502 10.8416 4.86207L8.74142 6.3879C8.47856 6.57889 8.36856 6.91741 8.46897 7.22643L9.27115 9.69528C9.49566 10.3863 8.7048 10.9609 8.11702 10.5338L6.01689 9.00797C5.75402 8.81699 5.39808 8.81699 5.13521 9.00797L3.03508 10.5338C2.4473 10.9609 1.65644 10.3863 1.88095 9.69528L2.68313 7.22643C2.78354 6.91741 2.67354 6.57889 2.41068 6.3879L0.31055 4.86207C-0.277235 4.43502 0.0248458 3.50531 0.751388 3.50531H3.34729C3.67221 3.50531 3.96017 3.29609 4.06058 2.98707L4.86276 0.518226Z" fill="#FEC654"/>
                        </svg>
                        <p>${data.imdbRating}</p>
                    </div>
                </div>
                <div class="sub-heading">
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <div role="button" tabindex="0" class="${className}" id="${data.imdbID}">
                        ${buttonSvg}
                        <p>${buttonText}</p>
                    </div>
                </div>
                <div class="info-body">
                    <p>${data.Plot}</p>
                </div>
            </div>
        </div>
    `
}