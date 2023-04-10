import { useState, useEffect } from "react";
const Formulario = () => {
  const [fecha, setFecha] = useState("");
  const [avion, setAvion] = useState("");
  const [taquimetro, setTaquimetro] = useState("");
  const [pago, setPago] = useState("");
  const [piloto, setPiloto] = useState("");
  const [pagoPiloto, setPagoPiloto] = useState("");
  const [saldo, setSaldo] = useState("");
  //   const auth = new google.auth.GoogleAuth({
  //     // Configura tus credenciales de autenticación
  //     keyFile: "",
  //     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  //   });
  // Definimos un array de pilotos
  const pilotos = ["Salva", "Bruno", "Ezequiel", "Julian", "Lucho"];

  const calcularPago = (taquimetro) => {
    const valorHora = 27000;
    const horas = parseFloat(taquimetro);
    const pago = horas * valorHora;
    setPago(pago.toFixed(2));
  };
  const calcularSaldo = () => {
    setSaldo((pago - pagoPiloto).toFixed(2));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = {
      Fecha: fecha,
      Avion: avion,
      Piloto: piloto,
      Taquimetro: taquimetro,
      Pago: pago,
      PagoPiloto: pagoPiloto,
      Saldo: saldo,
    };
    console.log("form:", form);
    
  };

  useEffect(() => {
    calcularPago(taquimetro);
    calcularSaldo();
  }, [taquimetro, pagoPiloto]);

  // async function saveFormData(data) {
  //   try {
  //     const response = await sheets.spreadsheets.values.append({
  //       spreadsheetId: process.env.GOOGLE_SHEET_ID,
  //       range: "Input",
  //       valueInputOption: "RAW",
  //       insertDataOption: "INSERT_ROWS",
  //       resource: {
  //         values: [[data.Fecha, data.Avion]],
  //       },
  //     });

  //     console.log(`Form data saved to Google Sheets: ${JSON.stringify(data)}`);
  //   } catch (error) {
  //     console.error(`Error saving form data to Google Sheets: ${error}`);
  //   }
  // }

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <label htmlFor="fecha" className="block text-blue-500 font-bold mb-2">
        Fecha:
      </label>
      <input
        type="date"
        id="fecha"
        name="fecha"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <label
        htmlFor="pilotName"
        className="block mt-4 text-blue-500 font-bold mb-2"
      >
        Piloto:
      </label>
      <select
        id="piloto"
        name="piloto"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={piloto}
        onChange={(e) => setPiloto(e.target.value)}
        required
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        {pilotos.map((piloto) => {
          return <option>{piloto}</option>;
        })}
      </select>

      <label
        htmlFor="avion"
        className="block mt-4 text-blue-500 font-bold mb-2"
      >
        Avión:
      </label>
      <select
        id="avion"
        name="avion"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={avion}
        onChange={(e) => setAvion(e.target.value)}
        required
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        <option value="JQK">JQK</option>
        <option value="RHS">RHS</option>
      </select>

      <label
        htmlFor="taquimetro"
        className="block mt-4 text-blue-500 font-bold mb-2"
      >
        Taquímetro:
      </label>
      <input
        type="number"
        id="taquimetro"
        name="taquimetro"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={taquimetro}
        onChange={(e) => setTaquimetro(e.target.value)}
        step="0.1"
        min="0.1"
        required
      />

      <label htmlFor="pago" className="block mt-4 text-blue-500 font-bold mb-2">
        Pago:
      </label>
      <input
        type="number"
        id="pago"
        name="pago"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={pago}
        readOnly
      />
      <label htmlFor="pago" className="block mt-4 text-blue-500 font-bold mb-2">
        Paga el Piloto:
      </label>
      <input
        type="number"
        id="pagoPiloto"
        name="pagoPiloto"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={pagoPiloto}
        onChange={(e) => setPagoPiloto(e.target.value)}
      />

      <label htmlFor="pago" className="block mt-4 text-blue-500 font-bold mb-2">
        Saldo:
      </label>
      <input
        type="number"
        id="pago"
        name="pago"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={saldo}
        readOnly
      />

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </form>
  );
};

export default Formulario;
