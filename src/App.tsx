import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './components/themes/default'
import { Router } from './Route'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    
      <ThemeProvider theme={defaultTheme}>
        <Router/>  
        <GlobalStyle/>
      </ThemeProvider>
  )
}
