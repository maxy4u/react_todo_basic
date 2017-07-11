import React, { PropTypes } from 'react';
import Todo from './Todo';

const TodoList = ({todos, onTodoClick}) =>{
	debugger;
	return (
	<ul>
		{
			todos.map(todo=>{
				debugger;

				return (<Todo key={todo.id} {...todo} onClick={()=>onTodoClick(todo.id)} />);
			})
		}
	</ul>
)}

TodoList.PropTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id:PropTypes.number.isRequired,
			text:PropTypes.string.isRequired,
			completed:PropTypes.bool.isRequired
		}).isRequired
	).isRequired,
	onTodoClick:PropTypes.func.isRequired

}

export default TodoList;