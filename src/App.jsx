import { useState } from 'react'

import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'

import "./App.css"
import Filter from './components/Filter'


function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "Criar funcinalidade Scroll no sitema",
            category: "Trabalho",
            isCompleted: false,
        },
    ])

    // função para pesquisar todo
    const [search, setSearch] = useState("")

    //função para filtrar toto
    const [filter, setFilter] = useState("All")

    //função ordem alfabetica
    const [sort, setSort] = useState("Asc")

    // função para adicionar o todo a lista
    const addTodo = (text, category) => {

        const newTodos = [...todos, {
            id: Math.floor(Math.random() * 1000),
            text,
            category,
            isCompleted: false,

        }]

        setTodos(newTodos)
    }

    // função para remover o todo da lista
    const removeTodo = (id) => {
        const newTodos = [...todos]
        const filteredTodos = newTodos.filter((todo) =>
            todo.id !== id ? todo : null
        )
        setTodos(filteredTodos)
    }

    // função para completar o todo da lista
    const completeTodo = (id) => {
        const newTodos = [...todos]
        newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
        setTodos(newTodos)
    }


    return (
        <div className='app'>
            <h1>Lista de Tarefas</h1>
            <Search search={search} setSearch={setSearch} />
            <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
            <div className='todo-list'>
                {todos
                    .filter((todo) =>
                        filter === "All"
                            ? true
                            : filter === "Completed"
                            ? todo.isCompleted
                            : !todo.isCompleted
                    )
                    .filter((todo) =>
                        todo.text.toLowerCase().includes(search.toLowerCase())
                    )
                    .sort((a, b) =>
                        sort === "Asc"
                            ? a.text.localeCompare(b.text)
                            : b.text.localeCompare(a.text)
                    )
                    .map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            removeTodo={removeTodo}
                            completeTodo={completeTodo}
                        />
                    ))}
            </div>
            <TodoForm addTodo={addTodo} />
        </div>
    )
}

export default App
