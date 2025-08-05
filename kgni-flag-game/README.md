# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

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

Simpler Code and Less Boilerplate

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
