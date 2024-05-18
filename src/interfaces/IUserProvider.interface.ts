import { IUserItem } from "./IUserItem.interface";

export interface IUserProvider {
  addItemsUser: (user: string, item: IUserItem) => void;
  gastoTotalJuli: () => gastoTotalJuli;
  gastoTotalAlex: () => gastoTotalJuli;
  deberPlata: () => Deuda;
  itemsJuli: IUserItem[];
  itemsAlex: IUserItem[];
  handlerRemoveTarea: (id: string, name: string) => void;
  handlerRemoveAllTareas: (name: string) => void;
}

export interface gastoTotalJuli {
  numeroGastoCompartido: number;
  numeroGastoPersonal: number;
  numeroGastoTotal: number;
  numeroPlataPrestada: number;
}

export interface Deuda {
  span: string;
}
