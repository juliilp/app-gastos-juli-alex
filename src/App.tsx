import User from "./components/User";
import useUsers from "./hooks/useUsers";
import { gastoTotalJuli } from "./interfaces/IUserProvider.interface";

export default function App() {
  const { gastoTotalJuli, gastoTotalAlex, deberPlata } = useUsers();

  const totalJuli: gastoTotalJuli = gastoTotalJuli();
  const totalAlex: gastoTotalJuli = gastoTotalAlex();

  return (
    <main className="flex flex-col justify-center gap-12 items-center w-full h-screen">
      <div className="flex gap-12">
        <User nombre="Juli" />
        <User nombre="Alex" />
      </div>
      <div className="flex gap-16">
        <div>
          <h2>TOTAL JULI</h2>
          <p>Gasto Personal: {totalJuli.numeroGastoPersonal}</p>
          <p>Gasto Compartido: {totalJuli.numeroGastoCompartido}</p>
          <p>Gasto Total: {totalJuli.numeroGastoTotal}</p>
        </div>
        <div>
          <h2>TOTAL ALEX</h2>
          <p>Gasto Personal: {totalAlex.numeroGastoPersonal}</p>
          <p>Gasto Compartido: {totalAlex.numeroGastoCompartido}</p>
          <p>Gasto Total: {totalAlex.numeroGastoTotal}</p>
        </div>
      </div>

      <span>{deberPlata().span}</span>
    </main>
  );
}
