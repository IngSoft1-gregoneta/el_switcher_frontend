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
