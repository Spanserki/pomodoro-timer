import { HistoryContainner, HistoryList, Status } from "./styles";

export function History() {
    return (
        <HistoryContainner>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefas</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="green">Concluido</Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="yellow">Em andamento</Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="green">Concluido</Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="green">Concluido</Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefas</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <Status statusColor="red">Interrompido</Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainner>
    )
}