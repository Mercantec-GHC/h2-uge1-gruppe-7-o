# FlagGuesser

This project is a simple flag guessing game, built with [React](https://react.dev/), [Zustand](https://zustand-demo.pmnd.rs/) and [TailwindCSS](https://tailwindcss.com/).

To get the data for all countries, we use the browser’s Fetch API to request a single endpoint (<https://restcountries.com/>) on load, and then store the country data in memory using a global Zustand store.

`fetchCountries.ts` contains the fetching logic, including error handling, and mapping/extending the data with additional properties for our game.

`APIError.ts` contains our custom error class, which extends the native `Error` class. Currently, it adds one additional property, `status`, which represents the HTTP status code of the error. This status code is used internally to determine an appropriate default error message, but it can also be used in the frontend.

`retry.ts` contains a simple retry higher order function that can be used to retry a function call, with a delay, in case of an error. This is used in `fetchCountries.ts` to retry the fetching of the countries endpoint in case of an error.

`App.tsx` is the entry point of the application. This is where the initial fetching for the countries data is triggered, and the initial state of the game is set.

- We are currently just using the default react `useEffect` hook to fetch the countries data on load, but also for handling loading state and error states while the data is being fetched. This is a bit verbose, and we are going to be using a more robust async state management library like `TanStack Query` in the future.

## Running the App

To tun the app, follow the instructions below, this creates a local server on port 5173.
<https://localhost:5173/>

```bash
npm install
npm run dev
```

## Optimizations, Improvements and Future Features

### Optimizations / Improvements

**Use [TanStack Query](https://tanstack.com/query/latest) for async state management instead of `useEffect` and `useState`.**

This will allow us to handle loading states, error states, retries, race conditions and much more with ease and a very clean API.
Quote from the docs: _"Toss out that granular state management, manual refetching and endless bowls of async-spaghetti code."_

**Store countries, game state etc in local storage or IndexedDB.**

This will allow users to refresh or even close the browser tab, and continue playing from where they left off. Also we can minimize the amount of requesets we make to the API, since this only needs to be done once, until local storage is cleared.

**Store flag assets in the bundle**

Currently, we are loading flag images from a CDN, which means the app fetches each flag image from the network when it is needed. While browsers often cache these images, this still requires an external request for each flag at least once per user session.
By bundling the flag assets with the app, we can eliminate these network requests entirely, improve loading speed, and ensure the game works offline.

### Future Features

- Add a "Game Over" screen that shows the final score and allows the user to restart the game.
- Add a menu/start screen that allows the user to select difficulties/levels, game modes (like only guessing flags for a specific region), and other settings.
- Add highscore functionality that saves the highest score achieved by the user, saved to local storage.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand

### Styling

For styling we are using [Tailwind CSS](https://tailwindcss.com/), [class-variance-authority](https://cva.style/docs), [tailwind-merge](https://github.com/dcastil/tailwind-merge) and [clsx](https://www.npmjs.com/package/clsx).

#### Tailwind CSS

Utility-first CSS framework for rapidly building custom designs.

#### CVA (class-variance-authority)

Package that gives us an easy to use API to define variants of our components, by conditionally applying classes.

#### Tailwind Merge

Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.

#### clsx

Used for conditionally applying classes.

### Global game state management

We haven chosen Zustand for its simplicity, performance, and scalability, making it an excellent fit for our game’s global state management.

#### Why We Use Zustand Instead of Context + useReducer

**Simpler Code and Less Boilerplate**

- Zustand allows us to define our global game state and actions in a single, easy-to-read store file.
- There’s no need to create multiple context providers or reducers, which keeps our codebase clean and maintainable.

**Better Performance**

- Zustand uses a subscription model, so only the components that actually use a piece of state will re-render when that state changes.
- With the Context API, any state update causes all consuming components to re-render, which can hurt performance.

**Easier State Updates**

- Zustand lets us update state directly with simple functions, similar to setState, but with global scope.
- With Context + useReducer, we have to dispatch actions and manage reducers, which can be more complex for larger or more dynamic state.

**Scalable and Flexible**

- Zustand is great for both small and large apps, and can easily handle more complex game logic if needed in the future.
- It supports features like persistence, middleware, and selective subscriptions out of the box.
