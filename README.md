
# WeatherActive APP

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/43371892/231988401-68a4b2cb-eeab-4260-9d29-d20c6aee9c36.png">

Link to live preview [https://weatheractive.netlify.app/](https://weatheractive.netlify.app/)

## Description

WeatherActive is an application that provides weather information about the 15 most largest cities in the world.
It has the following functionalities:

## Functionalities

- Get temperatures of the 15 largest cities in the world and sort them alphabetically (See image above)

- Remove cities
  <img width="1440" alt="image" src="https://user-images.githubusercontent.com/43371892/231992956-4f699ee6-11f6-4921-bdc7-cbc2cb3af30e.png">

- Favorite/Unfavorite most loved cities
  <img width="1440" alt="image" src="https://user-images.githubusercontent.com/43371892/231991327-e1109bff-d8b1-4341-99f6-e4a3ce1d2f8a.png">

- View Favorited cities sorted alphabetically
  <img width="1439" alt="image" src="https://user-images.githubusercontent.com/43371892/231991904-2d5679f4-7d25-488c-99a6-e0f9c818b3a3.png">

- Get more detailed weather information when you click on any city.
  <img width="1440" alt="image" src="https://user-images.githubusercontent.com/43371892/231992267-c657d12e-1673-4b66-8824-4801bb080cc9.png">

- Add, view, edit, and remove notes per city
  <img width="1440" alt="image" src="https://user-images.githubusercontent.com/43371892/231992582-971cf25a-147c-4557-b358-6b76bb1d5d13.png">

- Search for any city, and pull the weather information
  <img width="1421" alt="image" src="https://user-images.githubusercontent.com/43371892/231993348-59b9ea0d-9b1e-4b70-93a8-1cdfaef09bfa.png">

- Get weather information of the user's current location.
  <img width="1440" alt="image" src="https://user-images.githubusercontent.com/43371892/231993673-5b082235-5c18-4109-afa7-650c84c766f7.png">

- Offline functionality - the app's data is cached and persisted in local storage, new data is fetched only when there has been an update to a
  particular city's data. NB: the weather api used [https://www.weatherapi.com/](https://www.weatherapi.com/) has a Cache-Control of 180s, hence
  the app will try to request new data after this time has passed. If app is still offline when this occurs, it will return an error page, but once user reconnects, the app will automatically reload and fetch latest data.

## Running and Testing the app

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### System Requirements

#### Browser

- Google chrome

### How to run

- Create a `.env` file in the project root directory and paste the below code into it:

```
VITE_API_URL=http://api.weatherapi.com/v1/current.json
VITE_API_KEY=c3c4e1a812174973977181408231004
```

- Run `yarn install` from the project root directory to install dependencies.
- Run `yarn dev` from the project root directory to run the app locally.
- You can find the project running locally on `http://127.0.0.1:5173/`.

### How to test

- Run `yarn test` from the project root directory to test the app.

## Libraries Used

- Vite
  - Blazing fast start-ups with instant hot module replacement
  - Out-of-the-box support for TypeScript.
  - CSS Pre-Processors support for Sass, Less and Stylus, as well as PostCSS and CSS Modules.
  - Vite is framework-agnostic and works with multiple frameworks. For instance, it offers official templates for React, Vue, Preact, Svelte, Lit and even vanilla JavaScript and TypeScript.
- Redux Toolkit/Redux Toolkit Query
  - Manage app state globally, and makes it easy to share data across components
  - A lot lesser boilerplate code is required compared to Redux.
  - Generate React hooks that encapsulate the entire data fetching process, provide data and isFetching fields to components, and manage the lifetime of cached data as components mount and unmount.
  - API endpoints are defined ahead of time, including how to generate query parameters from arguments and transform responses for caching.
  - Designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself
- SASS

  - Fewer codes so you can write CSS quicker
  - Compatible with all versions of CSS
  - Facilitates you to write clean, easy and less CSS in a programming construct

- DayJS

  - A minimalist JavaScript library that parses, validates, manipulates, and displays dates and times 2kb only!
  - All API operations that change the Day.js object will return a new instance instead. This helps prevent bugs and avoid long debugging sessions.


