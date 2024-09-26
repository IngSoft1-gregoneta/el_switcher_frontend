import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIdStore } from "../../services/state";

export default function GetId() {
  // const userId = useIdStore((state) => state.userId);
  const setId = useIdStore((state) => state.setId);
  const navigate = useNavigate();

  // Creo que esto corre dos veces, pero no se porque
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get_id", {
          method: "GET",
        });
        if (response.ok) {
          const id = await response.json();
          setId(id);
          navigate(`/id/${id}`);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUserId();
  }, [setId, navigate]);
}
