import React from 'react'
import {Link} from 'react-router-dom';
import TodoService from '../../TodoService';

import Task from './Task';
import AddTaskForm from './AddTaskForm';

import editSvg from '../../assets/img/edit.svg';
import classes from './tasks.module.scss';

const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, onCompletedTask, withoutEmpty,}) => {

  const editTitle = () => {
    
    const newTitle = window.prompt('List Name', list.name);
      if(newTitle) {
        onEditTitle(list.id, newTitle);
        TodoService.put(`/lists/${list.id}`, {
          name:newTitle
      }).catch(() => {
        console.log('error')
      })
    }
  }

return (
<div className={classes.tasks}>
  <Link to={`/lists/${list.id}`}>
  <h2 className={classes.title} style={{color: list.color.hex}}>{list.name}
    <img onClick={editTitle} src={editSvg} alt="Edit Icon" />
  </h2>
  </Link>
  <div className={classes.items}>
    {!withoutEmpty && list.tasks && !list.tasks.length && <h2>No Tasks</h2>}
    {list.tasks && list.tasks.map(task => 
    <Task 
      key={task.id} 
      list={list} 
      onRemove={onRemoveTask}
      onCompleted={onCompletedTask}
      {...task}/>
    )}
    <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
  </div>
</div>
)}

export default Tasks;