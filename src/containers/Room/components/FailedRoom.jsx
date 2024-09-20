import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";

export default function RoomCreationFailed() {
  const navigate = useNavigate();

  function handleRetry() {
    navigate("/CreateRoom");
  }

  function handleLeave() {
    navigate("/");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Lobby Creation Failed</h1>
        <p className="text-gray-700 mb-6">
          Unfortunately, we were unable to create the lobby. Please try again.
        </p>
        <div className="space-y-4">
            <Button
              onClick={handleRetry}
              className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Try Again
            </Button>
            <Button
              onClick={handleLeave}
              className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Leave
            </Button>
        </div>
      </div>
    </div>
  );
}
