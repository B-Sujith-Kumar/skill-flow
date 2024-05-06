/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                rubik: ['Rubik', 'sans-serif'],
            },
            colors: {
                'coral-green': '#068932',
            },
            backgroundColor: {
                'dashboard': "#f5f6fa"
            },
            backgroundImage: {
                'custom-image': "url('/src/assets/images/book-bg.png)"
            },
            screens: {
                'lg2' : '1200px'
            }
        },
    },
    plugins: [],
}