import { useId, useState } from "react";
import { IUserItem } from "../interfaces/IUserItem.interface";
import useUsers from "../hooks/useUsers";

interface Props {
  nombre: string;
  onClose: () => void; // Función para cerrar el modal
}

export default function ModalUser({ nombre, onClose }: Props) {
  const [gastoPersonalChecked, setGastoPersonalChecked] = useState(false);
  const { addItemsUser } = useUsers();
  const id = useId();
  const [data, setData] = useState<IUserItem>({
    id,
    descripcion: "",
    nombre: "",
    precio: 0,
    esPersonal: false,
  });

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.nombre.length < 3) return alert("El nombre no puede estar vacío.");
    if (data.precio < 200)
      return alert("El precio no puede ser menor a 200 pesos.");

    addItemsUser(nombre, data);
    onClose();
    console.log(data);
  };

  const handlerOnChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGastoPersonalChecked(e.target.checked);
    setData({
      ...data,
      esPersonal: e.target.checked,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md">
        <h2>{nombre}</h2>
        <form onSubmit={handlerSubmit} className="flex flex-col gap-6 ">
          <input
            type="text"
            placeholder="Nombre del producto"
            onChange={handlerOnChange}
            value={data.nombre}
            name="nombre"
            className="text-black"
          />
          <input
            type="text"
            placeholder="Descripción"
            onChange={handlerOnChange}
            value={data.descripcion}
            name="descripcion"
            className="text-black"
          />
          <input
            type="number"
            placeholder="Precio"
            onChange={handlerOnChange}
            value={data.precio}
            name="precio"
            className="text-black"
          />
          <div>
            <span>
              ¿Es gasto personal? {gastoPersonalChecked ? "Si" : "No"}
            </span>
            <input type="checkbox" onChange={handlerOnChangeRadio} />
          </div>
          <button type="submit">Enviar</button>
        </form>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
