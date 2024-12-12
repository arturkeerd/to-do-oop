import {Todo} from '../models/todo.js'

class todoController {
    constructor() {
        this.TODOS = []
    }
    createTodo(req,res){
        console.log(req.body)
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        }) 
    }
    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }
    updateTodo(req, res){
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
        res.json({
            message: 'Updated todo' ,
            updatedTask: this.TODOS[todoIndex]
        })
    }
    deleteTodo(req, res){
        const todoId = req.params.id
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)
        if (todoIndex < 0) {
            res.json({
                message: 'Could not find todo with such id'
            })
            throw new Error('Could not find todo!')
        }
        const deletedTask = this.TODOS.splice(todoIndex, 1)
        res.json({
            message: 'Deleted todo successfully',
            deletedTask: deletedTask[0]
        })
    }
}


export const TodoController = new todoController()