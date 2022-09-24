import {HandPalm, Play} from 'phosphor-react'
import {zodResolver} from '@hookform/resolvers/zod'
import zod from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {differenceInSeconds} from 'date-fns'
import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountdownButton, 
    StopCountdownButton, 
    TaskInput 
} from './styles'

const formCycleFormValidationSchema = zod.object({ //validando um objeto
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(1, "Informe o tempo da tarefa").max(60)
})


type NewCycleFormData = zod.infer<typeof formCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minuteAmount: number;
    startDate: Date;
    interruptDate?: Date;
    finishedtDate?: Date;
}

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([]) //ciclos adicionados
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null) //status dos ciclos
    const [amountSecondsPassed, setAmountSecondsPassed ] = useState(0) //quantidade de segundos ja passados

    const {register, handleSubmit, watch, formState, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(formCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    const totalSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0 //total de segundos menos os que ja passaram

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDiference = differenceInSeconds(new Date(), activeCycle.startDate)
                
                if (secondsDiference > totalSeconds) {

                    setCycles(state => state.map((cycle) => {

                         if (
                            cycle.id === activeCycleId) {
                            return {...cycle, finishedtDate: new Date()}
                        }else {
                            return cycle
                        }
                    }),
                       
                    )
                    clearInterval(interval)

                } else {
                    setAmountSecondsPassed(secondsDiference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId])

    function handleCreateNewCycle(data:NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getDate()),
            task: data.task,
            minuteAmount: data.minutesAmount,
            startDate: new Date()
        }
        
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)

        reset()
    }

    function handleInterruptCycle() {

        setCycles((state) => state.map((cycle) => {
             if (
                cycle.id === activeCycleId) {
                return {...cycle, interruptDate: new Date()}
            }else {
                return cycle
            }
        }))

        setActiveCycleId(null)

    }
    
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60) //Arredonda os segundos para baixo
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0') //A variavel precisa ter 2 caracteres, caso não tenha, adiciona um zero
    const seconds = String(secondsAmount).padStart(2, '0') 

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
        
    },[minutes, seconds, activeCycle])
    
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
                        disabled={!!activeCycle}
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
                        step={1}
                        list="number-suggestion"
                        required
                        disabled={!!activeCycle}
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
                        <span>{minutes[0]}</span>
                        <span>{minutes[1]}</span>
                        <Separator>:</Separator>
                        <span>{seconds[0]}</span>
                        <span>{seconds[1]}</span>
                    </CountdownContainer>

                    {activeCycle ? (
                            <StopCountdownButton
                                onClick={handleInterruptCycle}
                                type="button"
                                >
                                <HandPalm size={24}/>
                                    Interromper
                            </StopCountdownButton>
                        ) : (
                            <StartCountdownButton 
                                disabled={isDisableButton}
                                type="submit"
                                >
                                <Play size={24}/>
                                    Começar
                            </StartCountdownButton>
                    )  }
                    
                </FormContainer>
                
            </form>
        </HomeContainer>
    )
}