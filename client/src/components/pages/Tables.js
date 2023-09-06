import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { requestGames } from "../../rtk/slices/socketSlice";



const Tables = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.socket.data);
  // const isLoading = useSelector((state) => state.socket.isLoading);
  const error = useSelector((state) => state.socket.error);

  console.log("Games In tables", games)

  useEffect(() => {
    dispatch(requestGames());
  }, [dispatch]);


  const navigate = useNavigate();


  return (
    <Container style={{ maxHeight: "80vh", overflowY: "scroll" }}>
      <h1>Available Tables</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Game</th>
            <th>Blinds</th>
            <th>Players</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td>{game.name}</td>
              <td>{game.gameType}</td>
              <td>${game.blinds}</td>
              <td>{game.seats.filter((seat) => seat.player !== null).length}  / {game.seats.length} </td>
              <td>
                <Button onClick={() => navigate(`/Room/${game._id}`)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Tables;