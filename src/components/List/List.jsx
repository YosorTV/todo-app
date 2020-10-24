import React from 'react';
import TodoService from '../../TodoService';

import Badge from '../Badge/Badge';

import classNames from 'classnames';
import classes from './List.module.scss';
import removeSvg from '../../assets/img/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {  

  const onRemoveList = list => 
    TodoService.delete(`lists/${list.id}`).then(() => onRemove(list.id));
    
  return (
    <ul  onClick={onClick} className={classes.list}>
      {
        items.map((item, index) => {
          return (
            <li 
              key={index} 
              className={classNames( item.className, {
                [classes.active]: 
                  item.active ? 
                  item.active : 
                    activeItem && activeItem.id === item.id 
                })}
              onClick={onClickItem ? () => onClickItem(item) : null}>
              <i>
                {
									item.icon ? ( item.icon ) : ( <Badge color={item.color.name}/> )
								}
                </i>
              <span>
                {item.name}
                <sup>{item.tasks && ` ${item.tasks.length}`}</sup>
              </span>
              {isRemovable && 
                <img 
                  className={classes.removeIcon} 
                  src={removeSvg} 
                  alt="Remove Icon"
                  onClick={() => onRemoveList(item)}
              />}
            </li>
          )
        }
      )}
    </ul>
  )
}

export default List;
