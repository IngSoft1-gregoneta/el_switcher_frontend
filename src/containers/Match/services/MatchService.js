import { Await } from "react-router-dom";

export async function fetchMatch(roomId, userName) {
  const room_id = encodeURIComponent(roomId);
  const user_name = encodeURIComponent(userName);
  const response = await fetch(
    `http://localhost:8000/matchs/visible_match/${room_id}/${user_name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function passTurn(matchId, playerName) {
  const match_id = encodeURIComponent(matchId);
  const player_name = encodeURI(playerName);
  const response = await fetch(
    `http://localhost:8000/matchs/end_turn/${match_id}/${player_name}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function playerData(matchId, playerName) {
  const player_name = encodeURIComponent(playerName);
  const match_id = encodeURIComponent(matchId);

  const response = await fetch(
    `/matchs/visible_match/${match_id}/${player_name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function leaveMatch(matchId, playerName, userId) {
  const match_id = encodeURIComponent(matchId);
  const player_name = encodeURIComponent(playerName);
  const user_id = encodeURIComponent(userId);
  const response = await fetch(
    `http://localhost:8000/matchs/leave_match/${match_id}/${player_name}/${user_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}


//@app.put("/matchs/make_move/{match_id}/{x1}/{y1}/{x2}/{y2}")
export async function makePartialMove(matchId, playerName, cardIndex, x1, y1, x2, y2){
  const match_id = encodeURIComponent(matchId);
  const player_name = encodeURIComponent(playerName);
  const card_index = encodeURIComponent(cardIndex);
  const x_1 = encodeURIComponent(x1);
  const y_1 = encodeURIComponent(y1);
  const x_2 = encodeURIComponent(x2);
  const y_2 = encodeURIComponent(y2);

  const response = await fetch(
    `http://localhost:8000/parcial_move/${match_id}/${player_name}/${card_index}/${x_1}/${y_1}/${x_2}/${y_2}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if(!response.ok){
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function undoPartialMove(matchID, userName){
  const match_id = encodeURIComponent(matchID);
  const user_name = encodeURIComponent(userName);


  const response = await fetch(
    `http://localhost:8000/revert_movement/${match_id}/${user_name}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if(!response.ok){
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  console.log(response.ok);

  return response.json();
}

export async function confirmMoves(/*user_id?, match_id?*/){
  //TODO
}
