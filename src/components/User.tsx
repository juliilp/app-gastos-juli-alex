import { useState } from "react";
import useUsers from "../hooks/useUsers";
import ModalUser from "./ModalUser";
import { IUserItem } from "../interfaces/IUserItem.interface";

interface Props {
  nombre: "Juli" | "Alex";
}

export default function User({ nombre }: Props) {
  const { itemsJuli, itemsAlex } = useUsers();
  const userItems: IUserItem[] = nombre === "Juli" ? itemsJuli : itemsAlex;
  const [switchModal, setSwitchModal] = useState(false);
  const { handlerRemoveTarea } = useUsers();
  const handlerModal = () => setSwitchModal((prev) => !prev);

  return (
    <section className="border border-black p-12 ">
      <h3>Gastos {nombre}:</h3>
      {userItems.length === 0 && <h2>{nombre} no tiene gastos</h2>}
      {userItems.map((item, key) => (
        <section
          key={key}
          className={`flex flex-col gap-8 items-center border border-black p-3 my-12 relative `}
        >
          <h4>
            {item.nombre} ${item.precio}
          </h4>
          <span>¿Es personal? {item.esPersonal ? "Si" : "No"} </span>
          <p>{item.descripcion || "Sin descripción"}</p>
          <button
            className="absolute top-0 right-2 bg-red-500 p-1 text-white"
            onClick={() => handlerRemoveTarea(item.id, nombre)}
          >
            X
          </button>
        </section>
      ))}
      <button
        onClick={handlerModal}
        className="bg-gray-700 text-white p-6 rounded-lg "
      >
        Anotar gasto de {nombre}
      </button>
      {switchModal && <ModalUser nombre={nombre} onClose={handlerModal} />}
    </section>
  );
}
