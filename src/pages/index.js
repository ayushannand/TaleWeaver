import Image from 'next/image'
import { Inter } from 'next/font/google'
import Homepage from './home.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <main
      className={`flex min-h-screen flex-col p-2 ${inter.className}`}
    >
      <Homepage />
    </main>

  </ThemeProvider>

  )
}
