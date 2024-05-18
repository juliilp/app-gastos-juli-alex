// User.tsx
import React, { useState } from "react";
import useUsers from "../hooks/useUsers";
import ModalUser from "./ModalUser";

interface Props {
  nombre: "Juli" | "Alex";
}

const User: React.FC<Props> = ({ nombre }) => {
  const { itemsJuli, itemsAlex, handlerRemoveTarea } = useUsers();
  const userItems = nombre === "Juli" ? itemsJuli : itemsAlex;
  const [switchModal, setSwitchModal] = useState(false);

  const toggleModal = () => setSwitchModal(!switchModal);

  return (
    <section className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Gastos {nombre}:</h3>
          {userItems.length === 0 && (
            <p className="text-sm text-gray-500">{nombre} no tiene gastos</p>
          )}
          {userItems.map((item, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-sm font-medium">
                {item.nombre} ${item.precio}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {item.descripcion || "Sin descripción"}
              </p>
              <button
                className="text-sm text-red-500 font-semibold"
                onClick={() => handlerRemoveTarea(item.id, nombre)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-100 border-t border-gray-200">
          <button
            onClick={toggleModal}
            className="block w-full bg-gray-800 text-white font-semibold px-4 py-2 rounded-md"
          >
            Anotar gasto de {nombre}
          </button>
        </div>
      </div>
      {switchModal && <ModalUser nombre={nombre} onClose={toggleModal} />}
    </section>
  );
};

export default User;
