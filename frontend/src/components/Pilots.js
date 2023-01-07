import TimerTest from './TimerTest';

const Pilots = ({ violations }) => {

  return (
    <div>
      <h3>Violating persons in the last 10 minutes - elapsed time: {<TimerTest />} seconds</h3>
      <div>
        {violations.filter(item => item.time + 600000 >= Date.now()).map(item =>
          <div key={item.pilot.pilotId}>Name: {item.pilot.firstName} - Distance: {item.distance}</div>
        )}
      </div>
    </div>
  );
};

export default Pilots;