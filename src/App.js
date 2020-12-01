import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const App = ()=> {
  let [todos, setTodos] = useState([]);
  let [todo, setTodo] = useState("");
  let [due, setDue] = useState("");
  let [hours, setHours] = useState("");

  let [clicked, setClicked] = useState(-1);

  function check(){

  }

  return (
    <div className="App">
      <header className="App-header">

      <div style={{display:'flex'}}>{
          todos.map((instance, index)=>{
            if(!instance.complete)
              return <div className="Todo-box"
              name="todobox"
               onClick={()=>{if(clicked!==index)setClicked(index)}}>
                {
                clicked===index?<div>
                  <div className={'Tophalf-todo'}>
                    <input type="text" name="hoursDone" className={'input hazy'} placeholder="Hours done" value={todos[index].hoursDone} onChange={(event)=>{todos[index].hoursDone = event.currentTarget.value; setTodos(todos)}}/>
                    <div>
                      <div>Is Complete: <input
                        name="isComplete"
                        type="checkbox"
                        checked={todos[index].complete}
                        onChange={()=>{todos[index].complete=!todos[index].complete; let date = new Date(); todos[index].completedate=date.getFullYear()+"-"+date.getDate()+"-"+(date.getMonth()+1); setTodos(todos);}} />
                      </div>
                      <button name="closeUpdate" onClick={()=>{setClicked(-1); console.log(clicked);}}>CLOSE</button>
                    </div>
                  </div>
                </div>:<div>
                  <div className={'Tophalf-todo'}>{instance.todo}</div>
                  <div style={{display:'flex'}}>
                    <div className={'Bottomleft-todo'}>{instance.due}</div>
                    <div className={'Bottomright-todo'}>{instance.complete?<span>{instance.completedate}</span>:<span>{instance.hours - (instance.hoursDone?instance.hoursDone:0)} hours</span>}</div>
                  </div>
                </div>
              }
                
              </div>
            return null;
          })
        }</div>

        <input type="text" name="todo" className={'input hazy'} placeholder="To Do" value={todo} onChange={(event)=>{setTodo(event.currentTarget.value)}}/>
        <input type="date" name="due" className={'input hazy'} placeholder="Due" value={due} onChange={(event)=>{setDue(event.currentTarget.value)}}/>
        <input type="number" name="hours" className={'input hazy'} placeholder="Hours" value={hours} onChange={(event)=>{setHours(event.currentTarget.value)}}/>
        <button onClick={()=>{
          if(todo && due && hours){
            setTodos([...todos, {todo, due, hours}]);
            setTodo("");
            setDue("");
            setHours("");
          }
        }} name="newtodo" >SET TODO</button>

        <div style={{display:'flex'}}>{
          todos.map((instance, index)=>{
            if(instance.complete)
              return <div className="Todo-box"
                name="todobox"
               onClick={()=>{if(clicked!==index)setClicked(index)}}>
              {
                clicked===index?<div>
                  <div className={'Tophalf-todo'}>
                    <input type="text" name="hoursDone" className={'input hazy'} placeholder="Hours done" value={todos[index].hoursDone} onChange={(event)=>{todos[index].hoursDone = event.currentTarget.value; setTodos(todos)}}/>
                    <div>
                      <div>Is Complete: <input
                        name="isComplete"
                        type="checkbox"
                        checked={todos[index].complete}
                        onChange={()=>{todos[index].complete=!todos[index].complete; let date = new Date(); todos[index].completedate=date.getFullYear()+"-"+date.getDate()+"-"+(date.getMonth()+1); setTodos(todos);}} />
                      </div>
                      <button name="closeUpdate" onClick={()=>{setClicked(-1); console.log(clicked);}}>CLOSE</button>
                    </div>
                  </div>
                </div>:<div>
                  <div className={'Tophalf-todo'}>{instance.todo}</div>
                  <div style={{display:'flex'}}>
                    <div className={'Bottomleft-todo'}>{instance.due}</div>
                    <div className={'Bottomright-todo'}>{instance.complete?<span>{instance.completedate}</span>:<span>{instance.hours - (instance.hoursDone?instance.hoursDone:0)} hours</span>}</div>
                  </div>
                </div>
              }  
              </div>
            return null;
          })
        }</div>
      </header>
    </div>
  );
}

export default App;
