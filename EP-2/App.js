import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * 
 * 
 * <div id="parent">
 *       <div id="child">
 *              <h1></h1>
 *              <h2></h2>
 *        </div>
 *        <div id="child">
 *              <h1></h1>
 *              <h2></h2>
 *        </div>  
 * </div>
 * 
 * 
 * React.createElement(Object) => HTML(which browser understands with the help of ReactDOM.render()) 
 * how to created nested structure like this ?
 */


const h1 = React.createElement('h1',{},'Hello Vaishali');
const h2 = React.createElement('h2',{},'Hello from h2 tag');
const child = React.createElement('div',{id:'child'},[h1,h2]);

const h11 = React.createElement('h1',{},'Hello Vaishali');
const h22 = React.createElement('h2',{},'Hello from h2 tag');
const child2 = React.createElement('div',{id:'child'},[h11,h22]);

const parent = React.createElement('div',{id:'parent'},[child,child2]);


const heading = React.createElement('h1',{id:'header'},'Hello World from React!');

console.log(heading); // React,createElemnet() gives us an object;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(parent); // render job is to create h1 tag which browser understands and put it inti the DOM.