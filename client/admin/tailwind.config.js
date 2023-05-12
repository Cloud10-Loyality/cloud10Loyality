/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
      primaryColor:'#33383E',
      secondaryColor:'#FFFFFF',
      btColor:'#5BA191',
      greyColor:'#AEB2BB',
      greyheadColor: '#9BA0A6',
      line: '#9BA0A6',
        textcolor: '#5BA191',
  
      },
      padding:{

      }
    },
  },
  plugins: [],
}
