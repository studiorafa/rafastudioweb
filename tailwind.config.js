/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./components/**/*.{js,ts,jsx,tsx}", "./context/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            colors: {
                black: "#000000",
                white: "#FFFFFF",
                gray: {
                    mid: "#666666",
                    light: "#F5F5F5",
                    dark: "#1A1A1A", // Dark mode surface
                    textDark: "#A3A3A3", // Dark mode secondary text
                },
            },
        },
    },
    plugins: [],
};
