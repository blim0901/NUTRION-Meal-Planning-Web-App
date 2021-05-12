
import React, {useState} from 'react'
//import '../styles/MealPlanner.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../styles/MealPlannerBoard.css'

import BreakfastLogo from '../assets/images/breakfast-icon.svg';
import LunchLogo from '../assets/images/lunch-icon.svg';
import DinnerLogo from '../assets/images/dinner-icon.svg';

import PlannerCard from './PlannerCard'

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      content: `item ${k + offset}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const getTimetableHead = () => {
    const days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const tem = [];
    for (let i = 0; i < 8; i++) {
        tem.push(
          <div className="timetable-col timetable-col-center timetable-black">
            {days[i]}
          </div>
        );
      }
      return <div className="timetable-row timetable-header">{tem}</div>;
}

const grid = 1;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    //background: isDragging ? "#DDDDDD" : "#E5E5E5",

    textAlign: "center",
    lineHeight: "30px", 
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? "lightblue" : "lightgrey",
    background: "#E5E5E5",
    "min-height":150
    //padding: grid,
});

const recipe = {
    title:"Burger"
}

function MealPlannerBoard(props) {
    const {state, setState} = props

    function onDragEnd(result) {
      const { source, destination } = result;
  
      // dropped outside the list
      if (!destination) {
        return;
      }
      const sInd = +source.droppableId;
      const dInd = +destination.droppableId;

      if (sInd === dInd) {
        const items = reorder(state[sInd], source.index, destination.index);
        const newState = [...state];
        newState[sInd] = items;
        setState(newState);
      } else {
        const result = move(state[sInd], state[dInd], source, destination);
        const newState = [...state];
        newState[sInd] = result[sInd];
        newState[dInd] = result[dInd];
  
        //setState(newState.filter(group => group.length)); //Remove length = 0 de
        setState(newState);
        }
    }

    const deleteItem = (ind, index) => {
        return () => {  const newState = [...state];
                        newState[ind].splice(index, 1);
                        setState(newState);
                    }
    }

    const getTimetableBody = () => {
        const rows = [];
        
        const meals = ["Breakfast", "Lunch", "Dinner"];
        const mealsLogo = [BreakfastLogo, LunchLogo, DinnerLogo];
        for(let j = 0; j < 3; j++){
            let tem = [];
            tem.push(<div className="timetable-col timetable-col-center timetable-black timetable-body-title">
            <img src={mealsLogo[j]} alt="Meals Logo" className="mealslogo" />
            {meals[j]}
            </div>);
            for(let i = 0; i < 7; i++) {
                tem.push(
                <div className="timetable-col timetable-col-center timetable-transparent">
               
                    <Droppable key={j*7+i} droppableId={`${j*7+i}`}>
                        {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                            {state[j*7+i].map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index} >
                                {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                >
                                    <div style={{display: "flex", justifyContent: "space-around" }}>
                                    <PlannerCard deleteItem={deleteItem(j*7+i, index)} recipe={item.content}/>
                                    </div>
                                </div>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                    
                </div>
                );
            }
            rows.push(<div className="timetable-row timetable-body">{tem}</div>);
        }
        
        return <div>{rows}</div>;
    }
  
    return (
      <div>
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            {getTimetableHead()}
            {getTimetableBody()}            
          </DragDropContext>
        </div>
      </div>
    );


}

export default MealPlannerBoard;

