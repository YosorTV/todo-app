import React, {useState} from 'react'

import TodoService from '../../TodoService';

import addSvg from '../../assets/img/add.svg';
import classes from './tasks.module.scss';

export default function AddTaskForm({list, onAddTask}) {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState('');

  const toggleForm = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    const newTask = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    TodoService.post(`/tasks`, newTask).then(({ data }) => {
      onAddTask(list.id, data);
      toggleForm();
    })
    .catch(() => console.log('error'))
    .finally(() => setLoading(false))
  }

  return (
    <div className={classes.taskForm}>
      {!visibleForm ? 
        (<div className={classes.taskFormNew} onClick={toggleForm}>
          <img src={addSvg} alt="Add Icon"/>
        <span>New Task</span>
        </div> ) : (
        <div className={classes.taskFormBlock}>
            <input 
              type='text'
              placeholder='Task name'
              className={classes.field}
              value={inputValue}
              onChange={(({target}) => setInputValue(target.value))}
            />
              <button 
                className={classes.buttonSubmit} 
                disabled={isLoading} 
                onClick={addTask}>
                  {isLoading ? 'Adding...' : 'Add Task'}
                </button>
              <button 
                className={classes.buttonCancel} 
                onClick={toggleForm}>
                  Cancel
              </button>
            </div>
        )}
    </div>
  )
}
