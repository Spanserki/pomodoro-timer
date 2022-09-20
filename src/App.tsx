import { Button } from "./components/Button";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./components/themes/default";
import { GlobalStyle } from "./styles/global";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>

      <Button variant="primary"/>
      <Button variant="secondary"/>
      <Button variant="danger"/>
      <Button variant="sucess"/>

      <GlobalStyle />
    </ThemeProvider>
    
  )
}

