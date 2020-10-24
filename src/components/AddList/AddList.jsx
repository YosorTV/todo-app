import React, { useState, useEffect } from 'react';
import TodoService from '../../TodoService';

import List from '../List/List';
import Badge from '../Badge/Badge';

import classes from './AddList.module.scss';
import closeSVG from '../../assets/img/close.svg';

const addIcon = {
  className: classes.addButton,
  icon: 
    <svg 
      width="12" 
      height="12" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      >
    <path 
      d="M8 1V15" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M1 8H15" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      />
  </svg>    
}

const AddList = ({colors, onAdd}) => {
  
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setColor] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if(Array.isArray(colors)){
      setColor(colors[0].id)
    }
  },[colors])

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setColor(colors[0].id)
  }

  const showPopup = () => setVisiblePopup(!visiblePopup);
  const inputHandler = ({target}) => setInputValue(target.value);

  const addList = () => {
    if(!inputValue) {
      alert('Enter list name');
      return
    }
    setIsLoading(true);
    TodoService.post('/lists', { name:inputValue, colorId: selectedColor })
    .then(({data}) => {
      const color = colors.filter(c => c.id === selectedColor)[0];
      const listObj = {...data, color, tasks:[]};
        onAdd(listObj);
        onClose();
    }).finally(() => setIsLoading(false));
  }

  return (
    <div className={classes.AddList}>
      <List 
      onClick={showPopup}
      items={[
        {
          icon: addIcon.icon,
          className: addIcon.className,
          name: 'Add list'
        },
      ]}
    />
      {visiblePopup && (
      <div className={classes.AddListPopup}>
        <img 
          src={closeSVG} 
          alt="close" 
          className={classes.closePopup}
          onClick={onClose}
        />
        <input 
          type='text'
          placeholder='list name'
          onChange={inputHandler}
          value={inputValue}
          className={classes.field}
        />
        <div className={classes.addListPopupColors}>
          {
            colors.map((color) => 
              <Badge 
                onClick={() => setColor(color.id)}
                key={color.id} 
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            )
          }
        </div>
        <button className={classes.button} onClick={addList}>{isLoading ? 'Adding...' : 'Add'}</button>
      </div>
      )}
    </div>
  )
}

export default AddList;