
# WeatherActive APP

Link to live preview [https://weatheractive.netlify.app/](https://weatheractive.netlify.app/)

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


