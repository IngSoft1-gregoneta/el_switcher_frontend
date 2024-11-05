export async function createRoom(formData, userId) {
  const response = await fetch(
    `http://localhost:8000/rooms/create_room/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function joinRoom(roomData) {
  const roomId = encodeURIComponent(roomData.room_id);
  const playerName = encodeURIComponent(roomData.player_name);
  const userId = encodeURIComponent(roomData.user_id);
  const response = await fetch(
    `http://localhost:8000/rooms/join/${roomId}/${playerName}/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData.password),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function leaveRoom(room_id, player_name, user_id) {
  const roomId = encodeURIComponent(room_id);
  const playerName = encodeURIComponent(player_name);
  const userId = encodeURIComponent(user_id);
  const response = await fetch(
    `http://127.0.0.1:8000/rooms/leave/${roomId}/${playerName}/${userId}`,
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
}

// Esta aca porque solo se puede crear un match desde Room
export async function createMatch(roomId, ownerName) {
  const owner_name = encodeURIComponent(ownerName);
  const roomIdEncoded = encodeURIComponent(roomId);

  const response = await fetch(
    `http://localhost:8000/matchs/create_match/${roomIdEncoded}/${owner_name}`,
    {
      method: "POST",
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
