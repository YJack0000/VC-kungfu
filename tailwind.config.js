/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#BF553D",
            },
            animation: {
                "fade-in": "fadeIn 5s ease-in-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { transform: "opacity(0)" },
                    "100%": { transform: "opacity(1)" },
                },
            },
        },
    },
    plugins: [],
}
