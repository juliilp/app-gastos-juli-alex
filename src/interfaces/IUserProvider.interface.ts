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
  formatNumber: (number: number) => void;
}

export interface gastoTotalJuli {
  numeroGastoCompartido: string;
  numeroGastoPersonal: string;
  numeroGastoTotal: string;
  numeroPlataPrestada: string;
}

export interface Deuda {
  span: string;
}
