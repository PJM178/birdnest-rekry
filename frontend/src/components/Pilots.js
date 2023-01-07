import { useState } from 'react';

import InfoModal from './InfoModal';
import TimerTest from './TimerTest';

const Pilots = ({ violations }) => {
  const [modal, setModal] = useState(false);
  const [pilot, setPilot] = useState([]);

  const imageContainerStyle = {
    transition: 'transform .1s',
    display: 'none',
    zIndex: '2',
    position: 'absolute'
  };

  const imageSizeStyle = {
    width: 'auto',
    height: 'auto',
    border: '1px solid',
    padding: '5px',
    backgroundColor: 'white'
  };

  const getMouse = (e, i) => {
    const mouse = { x:0, y:0 };
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    const image = document.getElementById(`hover-container-${i}`);
    image.style.display = 'block';
    image.style.left = mouse.x + 20 + 'px';
    image.style.top = mouse.y + 'px';
  };

  const mouseContent = (e, i) => {
    const test = document.getElementById(`link-${i}`);
    test.addEventListener('mousemove', getMouse(e, i));
  };

  const hideImage = (i) => {
    const image = document.getElementById(`hover-container-${i}`);
    image.style.display = 'none';
  };

  const pilotInfo = (pilot) => {
    setModal(true);
    setPilot(pilot);
  };

  return (
    <div>
      <h3 style={{ marginBottom: '5px' }}>Violating persons in the last 10 minutes - elapsed time: {<TimerTest />} seconds</h3>
      <div>
        {violations.filter(item => item.time + 600000 >= Date.now()).map((item, i) =>
          <div key={item.pilot.pilotId}>
            <a id={`link-${i}`} href="#" onMouseMove={(event) => mouseContent(event, i)} onMouseLeave={() => hideImage(i)}>{item.pilot.firstName} - {item.distance.toFixed(2)} meters</a><button onClick={() => pilotInfo(item)}>show info</button>
            <div id={`hover-container-${i}`} style={imageContainerStyle}>
              <div id={`hover-size-${i}`} style={imageSizeStyle}>
                <div>Name: {item.pilot.firstName} {item.pilot.lastName}</div>
                <div>Email: {item.pilot.email}</div>
                <div>Phone number: {item.pilot.phoneNumber}</div>
                <div>Shortest distance to the nest: <div>{item.distance.toFixed(2)} meters</div></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {modal ? <InfoModal setModal={setModal} imageSizeStyle={imageSizeStyle} item={pilot} /> : null}
    </div>
  );
};

export default Pilots;