import { fileManager } from '../utils/files.js'
import {Todo} from '../models/todo.js'

class todoController {
    constructor() {
        this.initTodos()
    }
    async createTodo(req,res){
        console.log(req.body)
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        }) 
    }

    async initTodos() {
        const todosData = await fileManager.readFile('./data/todos.json')
        if(todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = []
        }
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }
    
    async updateTodo(req, res){
        try {
        console.log(req.body)
        const todoId = req.params.id
        const updatedTask = req.body.task
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)
        if (todoIndex < 0) {
            res.json({
                message: 'Could not find todo with such index'
            })
            throw new Error('Could not find todo!')
        }
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)

        await fileManager.writeFile('./data/todos.json', this.TODOS)

        res.json({
            message: 'Updated todo' ,
            updatedTask: this.TODOS[todoIndex]
        })
        } catch (error) {
            if (error.message.includes('todo')) {
                console.log('update error => ', error.message)
            }
        }
    }
    async deleteTodo(req, res){
        try {
        const todoId = req.params.id
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)
        if (todoIndex < 0) {
            res.json({
                message: 'Could not find todo with such id'
            })
            throw new Error('Could not find todo!')
        }
        const deletedTask = this.TODOS.splice(todoIndex, 1)

        await fileManager.writeFile('./data/todos.json', this.TODOS)

        res.json({
            message: 'Deleted todo successfully',
            deletedTask: deletedTask[0]
        })
    } catch (error) {
        if (error.message.includes('todo')) {
            console.log('delete error => ', error.message)
        }
    }
    }
}


export const TodoController = new todoController()