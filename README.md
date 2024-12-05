# SkyCast
## A simple Weather App built with Next.js

### Installations
    - (Add --legacy-peer-deps to your package.json file if you get errors)
    - npx create-next-app@latest .
    - npm install @heroicons/react
    - npm i react-icons
    - npm i tailwind-merge clsx
    - npm i react-query
    - npm i axios
    - npm i date-fns 
    - npm i chart.js react-chartjs-2


### Repository Structure Explanation

#### Components
    - **SearchBar**: A reusable search bar component.
        - Accepted props - value, onchange, onsubmit, className
    - **Navbar**: The main navigation bar component.
#### Utils
    - **cn.ts**: a single utility function for conflict-free class management.