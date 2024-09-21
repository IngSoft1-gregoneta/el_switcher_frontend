import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";

export default function RoomCreationFailed() {
  const navigate = useNavigate();

  function handleRetry() {
    navigate("/create_room");
  }

  function handleLeave() {
    navigate("/");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-red-600">
          Room Creation Failed
        </h1>
        <p className="mb-6 text-gray-700">
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
