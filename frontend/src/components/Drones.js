const Drones = (props) => {
  const drones = props.drones;

  return (
    <div>
      {drones.map((drone, i) =>
        <div key={i}>{drone.manufacturer}</div>)}
    </div>
  );
};

export default Drones;