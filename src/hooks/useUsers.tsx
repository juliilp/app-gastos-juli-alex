import { useContext } from "react";
import { userContext } from "../context/UserProvider";

export default function useUsers() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUsers debe ser usado dentro de un UserProvider");
  }

  return context;
}
