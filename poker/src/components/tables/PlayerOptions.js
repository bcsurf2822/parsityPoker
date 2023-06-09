import { Dropdown, Button } from "react-bootstrap";

const PlayerOptions = () => {
  return (
    <>
      <Button variant="primary" className="mt-2">Fold</Button>
      <Button variant="primary" className="mt-2">Call</Button>
      <Button variant="primary" className="mt-2">Raise</Button>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Options
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/add-chips">Add Chips</Dropdown.Item>
          <Dropdown.Item href="#/sit-out">Sit Out</Dropdown.Item>
          <Dropdown.Item href="#/sit-out">Sit Out Next Big Blind</Dropdown.Item>
          <Dropdown.Item href="#/sit-out-next">Leave Table</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default PlayerOptions;