// App.tsx
import React from "react";
import useUsers from "./hooks/useUsers";
import User from "./components/User";

const App: React.FC = () => {
  const { gastoTotalJuli, gastoTotalAlex, deberPlata } = useUsers();

  const totalJuli = gastoTotalJuli();
  const totalAlex = gastoTotalAlex();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="flex flex-wrap gap-8 w-full justify-center mb-8">
        <User nombre="Juli" />
        <User nombre="Alex" />
      </div>
      <div className="flex gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-[300px] ">
          <h2 className="text-lg font-semibold mb-4">TOTAL JULI</h2>
          <div className="space-y-4">
            <p>Gasto Personal: ${totalJuli.numeroGastoPersonal}</p>
            <p>Plata prestada: ${totalJuli.numeroPlataPrestada}</p>
            <p>Gasto Compartido: ${totalJuli.numeroGastoCompartido}</p>
            <p>Gasto Total: ${totalJuli.numeroGastoTotal}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md  w-[300px]">
          <h2 className="text-lg font-semibold mb-4">TOTAL ALEX</h2>
          <div className="space-y-4">
            <p>Gasto Personal: ${totalAlex.numeroGastoPersonal}</p>
            <p>Plata Prestada: ${totalAlex.numeroPlataPrestada}</p>
            <p>Gasto Compartido: {totalAlex.numeroGastoCompartido}</p>
            <p>Gasto Total: ${totalAlex.numeroGastoTotal}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-xl">
        <u>{deberPlata().span}</u>
      </div>
    </main>
  );
};

export default App;
