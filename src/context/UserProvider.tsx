import React, { createContext, useEffect, useState } from "react";
import {
  gastoTotalJuli,
  IUserProvider,
} from "../interfaces/IUserProvider.interface";
import { IUserItem } from "../interfaces/IUserItem.interface";

interface Props {
  children: React.ReactNode;
}
export const userContext = createContext<IUserProvider | undefined>(undefined);
export default function UserProvider({ children }: Props) {
  const [itemsJuli, setItemsJuli] = useState<IUserItem[]>([]);
  const [itemsAlex, setItemsAlex] = useState<IUserItem[]>([]);

  useEffect(() => {
    const traerItemsJuli = localStorage.getItem("TareasJuli");
    const traerItemsAlex = localStorage.getItem("TareasAlex");

    if (traerItemsJuli) {
      setItemsJuli(JSON.parse(traerItemsJuli));
    }

    if (traerItemsAlex) {
      setItemsAlex(JSON.parse(traerItemsAlex));
    }
  }, []);

  const addItemsUser = (user: string, item: IUserItem) => {
    let updateItems = [];
    if (user === "Juli") {
      updateItems = [...itemsJuli, item];
      setItemsJuli(updateItems);
      return localStorage.setItem("TareasJuli", JSON.stringify(updateItems));
    } else {
      updateItems = [...itemsAlex, item];
      setItemsAlex(updateItems);
      localStorage.setItem("TareasAlex", JSON.stringify(updateItems));
    }
  };

  const gastoTotalJuli = (): gastoTotalJuli => {
    const plataPrestada = itemsJuli.filter((i) => i.plataPrestada === true);
    const gastoPersonal = itemsJuli.filter((r) => r.esPersonal === true);
    const gastoCompartido = itemsJuli.filter(
      (r) => r.esPersonal === false && r.plataPrestada === false
    );

    const numeroGastoPersonal = gastoPersonal.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroGastoCompartido = gastoCompartido.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroGastoTotal = itemsJuli.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroPlataPrestada = plataPrestada.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    return {
      numeroGastoCompartido,
      numeroGastoPersonal,
      numeroGastoTotal,
      numeroPlataPrestada,
    };
  };

  const gastoTotalAlex = (): gastoTotalJuli => {
    const plataPrestada = itemsAlex.filter((i) => i.plataPrestada === true);
    const gastoPersonal = itemsAlex.filter((r) => r.esPersonal === true);
    const gastoCompartido = itemsAlex.filter(
      (r) => r.esPersonal === false && r.plataPrestada === false
    );
    const numeroGastoPersonal = gastoPersonal.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );
    const numeroGastoCompartido = gastoCompartido.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroGastoTotal = itemsAlex.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroPlataPrestada = plataPrestada.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    return {
      numeroGastoCompartido,
      numeroGastoPersonal,
      numeroGastoTotal,
      numeroPlataPrestada,
    };
  };

  const deberPlata = () => {
    const gastoJuli = gastoTotalJuli().numeroGastoCompartido;
    const gastoAlex = gastoTotalAlex().numeroGastoCompartido;
    let total = 0;

    if (gastoJuli > gastoAlex) {
      total = Number(gastoJuli) / 2 - Number(gastoAlex) / 2;
    } else {
      total = Number(gastoAlex) / 2 - Number(gastoJuli) / 2;
    }

    if ((gastoAlex === 0 && gastoJuli === 0) || gastoAlex === gastoJuli) {
      return { span: "No se deben nada" };
    }

    if (gastoJuli > gastoAlex) {
      return {
        span: `Alex le debe $${Number(total)} a Juli`,
      };
    }

    return {
      span: `Juli le debe $${Number(total)} a Alex`,
    };
  };

  const handlerRemoveTarea = (id: string, name: string) => {
    const alertConfirm = confirm("Estas seguro de querer eliminar la tarea?");
    if (!alertConfirm) return;
    let itemsFiltrados = null;
    if (name === "Juli") {
      itemsFiltrados = itemsJuli.filter((i) => i.id !== id);
      setItemsJuli(itemsFiltrados);
      return localStorage.setItem("TareasJuli", JSON.stringify(itemsFiltrados));
    }

    itemsFiltrados = itemsAlex.filter((i) => i.id !== id);
    setItemsAlex(itemsFiltrados);
    localStorage.setItem("TareasAlex", JSON.stringify(itemsFiltrados));
  };

  const handlerRemoveAllTareas = (name: string) => {
    const alertConfirm = confirm("Estas seguro de eliminar todas las tareas?");
    if (!alertConfirm) return;
    if (name === "Juli") {
      setItemsJuli([]);
      localStorage.removeItem("TareasJuli");
    } else {
      setItemsAlex([]);
      localStorage.removeItem("TareasAlex");
    }
  };

  return (
    <userContext.Provider
      value={{
        addItemsUser,
        gastoTotalJuli,
        gastoTotalAlex,
        deberPlata,
        itemsJuli,
        itemsAlex,
        handlerRemoveTarea,
        handlerRemoveAllTareas,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
