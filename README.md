# 🎬 Movie Watchlist App

A simple web app to search for movies and manage your personal watchlist using the OMDb API.

## Features

- Search for movies
- Add/remove movies to watchlist
- Persistent storage with localStorage
- Responsive design

## Installation

1. Clone the repo
   ```bash
   git clone https://github.com/abhipranav/movie-watchlist-omdb.git
   cd movie-watchlist-omdb
   ```

2. Copy `config.example.js` to `config.js`
   ```bash
   cp config.example.js config.js
   ```

3. Add your OMDb API key in `config.js`
   ```javascript
   const API_KEY = 'your_api_key_here'
   ```

4. Open `index.html` in your browser or use a local server
   ```bash
   python -m http.server 8000
   ```

## Usage

- **Search**: Enter a movie title and press Enter
- **Add to Watchlist**: Click the "Watchlist" button on any movie
- **View Watchlist**: Click "My Watchlist" in the header
- **Remove**: Click "Remove" on the watchlist page

## Tech Stack

- HTML5, CSS3, JavaScript (ES6+)
- OMDb API
- LocalStorage

## Project Structure

```
movie-watchlist-omdb/
├── index.html
├── watchlist.html
├── index.css / watchlist.css
├── constants.js
├── index.js
├── watchlist.js
└── source/
```

## License

MIT License

## Author

**Abhijeet Pranav Mishra**

---

⭐ Star this repo if you found it helpful!