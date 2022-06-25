# ironShark

## Client

### Pages

- HomePage: NavBar, SearchBar, HeroImage, (TopSellers || NewAdditions), footer ✅
- SignUpPage
- LoginPage
- ProfilePage: personal details (picture, email, name, password, age)
- ProfileEditPage: Edit Profile
- BookmarkPage: bookmark games, add to card button and link to single game page.
- SingleGamePage: Title, Genres, screenshots, description, etc
- SearchPage: AdvancedSearch filters (genre, title, platform, price)
- ErrorPage: Catch errors
- AddGamePage: Form to sell game. Form includes title, genre, file/link of game, price, description, created by
- EditGamePage

### Services

- listGameData - issues GET to '/' - Lists Games. ({ games: [] })

- registerUser - issues POST to '/authentication/sign-up' - Registers new user.

- logInUser - issues POST to '/authentication/login' - Authenticates existing user.

- signOutUser - issues POST to '/authentication/sign-out' - Signs out user.

- loadUserInformation - issues GET to '/authentication/me' - Loads information about authenticated user.

- profileLoad - issues GET to '/profile/:id' - Loads single users profile.

- profileEdit - issues PATCH to '/profile' - Edit authenticated users profile.

- GameSearch - issues GET to '/game/search' - Allows user to search for games.

- GameLoad - issues GET to '/game/:id' - Loads single game

- bookmarkList - issues GET to '/game/bookmarked' - List all games an authenticated user has bookmarked.

- bookmarkAdd - issues POST to '/game/:id/bookmark' - Set bookmark for this game on this users profile.

- bookmarkRemove - issues DELETE to '/game/:id/bookmark' - Unset bookmark for this game on this users profile.

## Server

### Models

- User:

name: String, required, trim
email: String, required, trim, lowercase
passwordHashAndSalt: String, required
picture: String

- Bookmark:

user: ObjectId, ref: 'User', required
game: ObjectId, ref: 'Game', required

### Request Handlers

- GET to '/' - Lists Games. ({ games: [] })

- POST to '/authentication/sign-up' - Registers new user.

- POST to '/authentication/sign-in' - Authenticates existing user.

- POST to '/authentication/sign-out' - Signs out user.

- GET to '/authentication/me' - Loads information about authenticated user.

- GET to '/profile/:id' - Loads single users profile.

- PATCH to '/profile' - Edit authenticated users profile.

- GET to '/game/search' - Allows user to search for games.

- GET to '/game/:id' - Loads single game

- GET to '/game/bookmarked' - List all games an authenticated user has bookmarked.

- POST to '/game/:id/bookmark' - Set bookmark for this game on this users profile.

- DELETE to '/game/:id/bookmark' - Unset bookmark for this game on this users profile.

## Wishlist

- The user can sell their own games
- mailchimp
- google authentication
- game ratings
