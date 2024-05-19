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
    const filterPlataPrestada = itemsJuli.filter(
      (i) => i.plataPrestada === true
    );
    const filterGastoPersonal = itemsJuli.filter((r) => r.esPersonal === true);
    const filterGastoCompartido = itemsJuli.filter(
      (r) => r.gastoCompartido === true
    );

    const numeroGastoPersonal = filterGastoPersonal.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroGastoCompartido = filterGastoCompartido.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroPlataPrestada = filterPlataPrestada.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroGastoTotal = itemsJuli.reduce(
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
    const filterPlataPrestada = itemsAlex.filter(
      (i) => i.plataPrestada === true
    );
    const filterGastoPersonal = itemsAlex.filter((r) => r.esPersonal === true);
    const filterGastoCompartido = itemsAlex.filter(
      (r) => r.gastoCompartido === true
    );

    const numeroGastoPersonal = filterGastoPersonal.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );
    const numeroGastoCompartido = filterGastoCompartido.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroGastoTotal = itemsAlex.reduce(
      (acm, currentValue) => acm + Number(currentValue.precio),
      0
    );

    const numeroPlataPrestada = filterPlataPrestada.reduce(
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
    const numeroGastoCompartidoJuli = Number(
      gastoTotalJuli().numeroGastoCompartido
    );
    const numeroGastoCompartidoAlex = Number(
      gastoTotalAlex().numeroGastoCompartido
    );
    const numeroPlataPrestadaJuli = gastoTotalJuli().numeroPlataPrestada;
    const numeroPlataPrestadaAlex = gastoTotalAlex().numeroPlataPrestada;
    const LoQueleDebenAAlex =
      numeroGastoCompartidoAlex / 2 - numeroPlataPrestadaJuli;
    const LoQueLeDebenAJuli =
      numeroGastoCompartidoJuli / 2 - numeroPlataPrestadaAlex;

    let total = 0;

    if (LoQueleDebenAAlex > LoQueLeDebenAJuli) {
      total = LoQueleDebenAAlex - LoQueLeDebenAJuli;
    } else {
      total = LoQueLeDebenAJuli - LoQueleDebenAAlex;
    }

    if (LoQueleDebenAAlex > LoQueLeDebenAJuli) {
      return {
        span: `Juli le debe $${total} a Alex`,
      };
    } else {
      return {
        span: `Alex le debe $${total} a Juli`,
      };
    }
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
