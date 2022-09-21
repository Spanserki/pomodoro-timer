import {Play} from 'phosphor-react'
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" list='task-suggestion' placeholder='Dê um nome para seu projeto'/>

                    <datalist id='task-suggestion'>
                        <option value="JavaScript"></option>
                        <option value="React.Js"></option>
                        <option value="TypeScript"></option>
                        <option value="Next.Js"></option>
                        <option value="Chackra"></option>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>

                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder='00'
                        step={5}
                        min={5}
                        max={60}
                        list="number-suggestion"
                    />

                    <datalist id='number-suggestion'>
                        <option value="10"></option>
                        <option value="20"></option>
                        <option value="30"></option>
                        <option value="40"></option>
                        <option value="50"></option>
                        <option value="60"></option>
                    </datalist>

                    <span>minutos.</span>
                

                    <CountdownContainer>
                        <span>0</span>
                        <span>0</span>
                        <Separator>:</Separator>
                        <span>0</span>
                        <span>0</span>
                    </CountdownContainer>

                    <StartCountdownButton type="submit">
                        <Play size={24}/>
                        Começar
                    </StartCountdownButton>
                </FormContainer>
                
            </form>
        </HomeContainer>
    )
}