import React, { useState } from 'react';
import './App.css';
import Inputs from './components/inputs/inputs';
import Map from './components/map/map';
import Navbar from './components/navbar/navbar';
import List from './components/list/list';
const Graph = require('node-dijkstra')

function App() {

  /* I preferred to put all the variables in the same place so that it is possible to exchange information between siblings components */
  const [selected, setSelected] = useState('')
  const [positions, setPositions] = useState({
    origin: [0, 0],
    pickup: [0, 0],
    destination: [0, 0]
  })
  const [spinner, setSpinner] = useState(false);

  const [path, setPath] = useState([])
  const [pathsList, setPathsList] = useState([])

  /* as the parameter received by this function is the click event, there needs to be a treatment so that the 'selected' variable receives the correct value of the selected option */
  function selectionTreatment(event) {
    setSelected(event.target.value);
  }

  function search() {
    setSpinner(true);
    /* this is where the JSON is received and used in the code */
    fetch('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f')
      .then(response => response.json())
      .then(json => {
        setSpinner(false);
        /* Simple check that prevents the continuation of execution in case there is no change in the options */
        if (positions.origin[0] == 0 || positions.destination[0] == 0 || positions.pickup[0] == 0) return;

        let entries = Object.entries(json)

        /* Here is the use of the node-dijkstra library (https://www.npmjs.com/package/node-dijkstra) */
        const route = new Graph();

        /* Passing json information to Graph */
        entries.forEach(([key, value]) => {
          route.addNode(key, value)
        })

        let o = positions.origin[0] + positions.origin[1]
        let p = positions.pickup[0] + positions.pickup[1]
        let d = positions.destination[0] + positions.destination[1]

        /* Best path check */
        let p1 = route.path(o, p, { cost: true })
        /* it is necessary to use pop() so that the Pickup position is not repeated */
        p1.path.pop();
        let p2 = route.path(p, d, { cost: true })
        let full = p1.path.concat(p2.path)

        /* state change with arrays */
        setPathsList(old => [{ time: p1.cost + p2.cost, path: full }, ...old].slice(0, 10))
        setPath(old => full)

      }, (err) => console.log(err)
      );
  }

  return (
    <div>
      {/* User just for the logo */}
      <Navbar />
      {/* Conteiner at the certer of the screen */}
      <div className="box container p-3 col-8">
        <p className='fs-5 fw-semibold text-center'>
          Select the marker and then its position on the map
        </p>
        <div className='row'>
          <div className="col text-center pt-4">
            {/* Buttons */}
            {/* so that it is possible to change the state of the variables in the child components, I sent the functions that make it possible through a component property (setSelected) */}
            <Inputs setSelected={selectionTreatment} search={search} spinner={spinner} />
            {/* List of previous paths */}
            <List list={pathsList} />
          </div>
          {/* Board if the possibles positions */}
          <Map selected={selected} positions={positions} />
        </div>
      </div>
    </div>
  );
}

export default App;
