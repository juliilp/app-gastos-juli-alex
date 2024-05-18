export interface IUserItem {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  esPersonal: boolean;
  plataPrestada: boolean;
  gastoCompartido: boolean;
}
