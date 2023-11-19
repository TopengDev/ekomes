import type { Config } from "tailwindcss"

const config: Config = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         colors: {
            white: "#F5F5F5",
            "light-white": "#FFFFFF",
            black: "#000000",
            "dark-gray": "#484848",
            "light-gray": "#FAFAFA",
            gray: "#8A8A8A",
            "light-red": "#FF4646",
            yellow: "#FCA120",
         },
      },
   },
   plugins: [],
}
export default config
