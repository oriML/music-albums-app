# Music Search App

## Description
The Music Search App is an Angular 19 application that allows users to search for albums using the Spotify Web API. Users can view album details, manage a list of favorite albums, and utilize features like search history, dark/light mode toggling, and responsive design.

## Features
*   **Album Search:** Search for albums by name using the Spotify Web API.
*   **Album Details:** View comprehensive details for a specific album, including:
    *   Large album cover image (responsive).
    *   Album title.
    *   Artist names (clickable links to Spotify artist pages).
    *   Release date.
    *   Total tracks.
    *   External Spotify link (button to listen on Spotify).
    *   Full track list with track number, name, and duration.
*   **Favorite Albums:** Add and remove albums from a personal favorites list, persisted locally.
*   **Search History:** The application saves and displays the last 5 unique search queries for quick access.
*   **Dark/Light Mode Toggle:** Switch between dark and light themes for a personalized viewing experience.
*   **Responsive Design:** The application's layout adapts to various screen sizes, from mobile to desktop.
*   **Input Validation:** Search queries are validated using regex to prevent the inclusion of symbols.
*   **Pagination on Scroll:** Albums are loaded dynamically as the user scrolls down the page, providing a smooth browsing experience.

## Technologies Used
*   **Angular 19:** Frontend framework.
*   **TypeScript:** Primary programming language.
*   **Node.js/Express:** (Assumed for backend API handling and Spotify token management).
*   **Axios/Fetch:** For HTTP requests to the Spotify API (via backend).
*   **Angular Material:** UI component library.
*   **SCSS:** CSS preprocessor for styling.
*   **Angular CDK:** For features like `cdk-scrollable` for pagination.
*   **JWT-based Authentication:** (Assumed for user authentication).
*   **Spotify Web API:** For album search and details.

## Installation

To set up and run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd music-search-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Backend Setup (Assumed Node.js/Express):**
    *   Ensure your backend is configured to proxy requests to the Spotify Web API and handle authentication (e.g., obtaining and refreshing Spotify access tokens).
    *   Set up necessary environment variables for Spotify API credentials (Client ID, Client Secret).
    *   Start your backend server.

4.  **Run the Angular application:**
    ```bash
    ng serve
    ```

5.  **Access the application:**
    Open your browser and navigate to `http://localhost:4200`.

## Usage

*   **Login:** Use the provided login interface (assumed JWT-based authentication).
*   **Search Albums:** Enter an album name in the search bar and press Enter or click the search button.
*   **Filter Search:** Use the filter dropdown to refine your search (e.g., by album title or artist name).
*   **View Album Details:** Click on any album card to view its detailed information, including tracks and a link to Spotify.
*   **Manage Favorites:** Click the heart icon on an album card to add/remove it from your favorites. Navigate to the "Favorites" section to view all your favorited albums.
*   **Search History:** Recently searched queries will appear in a dropdown below the search bar for quick re-selection.
*   **Toggle Theme:** Use the theme toggle button in the sidebar to switch between dark and light modes.
*   **Pagination:** Scroll down the album list to load more results automatically.

## API Integration

This application integrates with the [Spotify Web API](https://developer.spotify.com/documentation/web-api/). All album search and detail requests are routed through a Node.js/Express backend to manage API keys and authentication securely.

## Project Structure (Frontend)

```
src/
├── app/
│   ├── core/             # Core application logic, services, models, mappers
│   │   ├── http/             # Services for API calls (e.g., SpotifyService, AlbumDetailService)
│   │   ├── models/           # TypeScript interfaces for data models (e.g., Album, Spotify models)
│   │   ├── mappers/          # Utility functions to map Spotify API responses to internal models
│   │   └── services/         # Core application services (e.g., LocalStorageService, FavoritesService, ThemeService)
│   ├── features/             # Feature-specific modules/components
│   │   ├── albums-panel/     # Album search and list functionality
│   │   │   ├── components/   # Sub-components like album-detail, album-list, album-search-panel
│   │   │   └── services/     # Services specific to albums panel
│   │   ├── auth/             # Authentication related components/guards
│   │   ├── favorites/        # Favorites list functionality
│   │   └── layout/           # Application layout (sidenav, toolbar)
│   ├── shared/               # Reusable components and services
│   │   ├── components/       # Generic UI components (e.g., album-card, header)
│   │   └── services/         # Shared services (e.g., AuthService)
│   └── styles/               # Global SCSS styles and theme definitions
│       ├── _themes.scss      # CSS custom properties for dark/light themes
│       └── _variables.scss   # SCSS variables
├── assets/                   # Static assets like images
└── environments/             # Environment-specific configurations
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.