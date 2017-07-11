import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos,filter)=>{
	debugger;
	switch (filter){
		case 'SHOW_ALL' :
		return todos;
		case 'SHOW_COMPLETED' :
		return todos.filter(t=>t.completed);
		case 'SHOW_ACTIVE' :
		return 
	}
}

const mapStateToProps = state =>{
	return {
		todos : getVisibleTodos(state.todos,state.visibilityFilter)
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onTodoClick: id=>{
			dispatch(toggleTodo(id))
		}
	};
}

const VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList);
export default VisibleTodoList;