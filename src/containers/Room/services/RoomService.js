export async function createRoom(formData) {
  const response = await fetch("http://localhost:8000/rooms/create_room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function joinRoom(roomData){
  const roomId = encodeURIComponent(roomData.room_id);
  const playerName = encodeURIComponent(roomData.player_name);
  const response = await fetch(`http://localhost:8000/rooms/join/?room_id=${roomId}&player_name=${playerName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}