import 'styled-components'
import { defaultTheme } from '../components/themes/default'

type ThemeType = typeof defaultTheme; //pegando as propriedades que o defaultTheme possui

declare module 'styled-components' {
       export interface DefaultTheme extends ThemeType{}
}