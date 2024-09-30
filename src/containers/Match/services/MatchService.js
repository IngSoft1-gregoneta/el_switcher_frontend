import { redirect } from "react-router-dom";

export async function createMatch(roomId, ownerName) {
  const roomData = { room_id: roomId };
  const owner_name = encodeURIComponent(ownerName);

  const response = await fetch(
    `http://localhost:8000/matchs/create_match/${owner_name}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

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

export async function passTurn(matchId,playerName) {
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

export async function leaveMatch(matchId,playerName,userId){
    const match_id = encodeURIComponent(matchId);
    const player_name = encodeURIComponent(playerName);
    const user_id = encodeURIComponent(userId);
    const response = await fetch(
        `http://localhost:8000/matchs/leave_match/${match_id}/${player_name}/${user_id}`,
        {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
            }
        }
    );

    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}