import {Play} from 'phosphor-react'
import {zodResolver} from '@hookform/resolvers/zod'
import zod from 'zod'
import { useForm } from 'react-hook-form'

import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountdownButton, 
    TaskInput 
} from './styles'

const formCycleFormValidationSchema = zod.object({ //validando um objeto
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(5, "Informe o tempo da tarefa").max(60)
})


type NewCycleFormData = zod.infer<typeof formCycleFormValidationSchema>

export function Home() {

    const {register, handleSubmit, watch, formState, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(formCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    function handleCreateNewCycle(data:NewCycleFormData) {
        reset();
    }
    
    const task = watch('task')
    const isDisableButton = !task

    console.log(formState.errors)
    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" list='task-suggestion'
                        placeholder='Dê um nome para seu projeto'
                        {...register('task')}
                    />

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
                        list="number-suggestion"
                        required
                        {...register('minutesAmount', {valueAsNumber: true})}
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

                    <StartCountdownButton 
                         disabled={isDisableButton}
                         type="submit"
                         >
                        <Play size={24}/>
                        Começar
                    </StartCountdownButton>
                </FormContainer>
                
            </form>
        </HomeContainer>
    )
}