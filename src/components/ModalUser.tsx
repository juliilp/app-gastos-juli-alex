import React, { useState, useRef, useEffect, useId } from "react";
import { IUserItem } from "../interfaces/IUserItem.interface";
import useUsers from "../hooks/useUsers";

const ModalUser: React.FC<{ nombre: string; onClose: () => void }> = ({
  nombre,
  onClose,
}) => {
  const [gastoPersonalChecked, setGastoPersonalChecked] = useState(false);
  const [plataPrestadaChecked, setPlataPrestadaChecked] = useState(false);
  const { addItemsUser } = useUsers();
  const id = useId();
  const [data, setData] = useState<IUserItem>({
    id: id,
    descripcion: "",
    nombre: "",
    precio: 0,
    esPersonal: false,
    plataPrestada: false,
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.nombre.length < 3) {
      return alert("El nombre no puede estar vacío.");
    }
    if (data.precio < 200) {
      return alert("El precio no puede ser menor a 200 pesos.");
    }

    addItemsUser(nombre, data);
    onClose();
  };

  const handleCheckboxEsPersonal = () => {
    setGastoPersonalChecked((prev) => !prev);
    setPlataPrestadaChecked((prev) => (prev = false));
    setData((prevData) => ({
      ...prevData,
      esPersonal: !gastoPersonalChecked,
      plataPrestada: false,
    }));
  };

  const handlerCheckBoxPlataPrestada = () => {
    setPlataPrestadaChecked((prev) => !prev);
    setGastoPersonalChecked((prev) => (prev = false));
    setData((prev) => ({
      ...prev,
      plataPrestada: !plataPrestadaChecked,
      esPersonal: false,
    }));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">{nombre}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del producto"
            name="nombre"
            value={data.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="Descripción"
            name="descripcion"
            value={data.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="number"
            placeholder="Precio"
            name="precio"
            value={data.precio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="personal" className="text-sm">
              ¿Es gasto personal?
            </label>
            <input
              type="checkbox"
              id="personal"
              checked={gastoPersonalChecked}
              onChange={handleCheckboxEsPersonal}
              className="w-4 h-4 border-gray-300 rounded focus:ring-gray-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="plataPrestada" className="text-sm">
              ¿Es plata prestada?
            </label>
            <input
              type="checkbox"
              onChange={handlerCheckBoxPlataPrestada}
              checked={plataPrestadaChecked}
              className="w-4 h-4 border-gray-300 rounded focus:ring-gray-400"
              id="plataPrestada"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUser;
