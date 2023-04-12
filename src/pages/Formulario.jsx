import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Formulario = () => {
  const [fecha, setFecha] = useState("");
  const [avion, setAvion] = useState("");
  const [taquimetro, setTaquimetro] = useState("");
  const [pago, setPago] = useState("");
  const [piloto, setPiloto] = useState("");
  const [pagoPiloto, setPagoPiloto] = useState("");
  const [saldo, setSaldo] = useState("");
  const [minutosVolados, setMinutosVolados] = useState("");
  const [comentario, setComentario] = useState("");

  const pilotos = ["Salva", "Bruno", "Ezequiel", "Julian", "Lucho", "Andres"];

  const calcularPago = (taquimetro) => {
    var valorHora = 27000;
    if (avion == "RHS") {
      valorHora = 22000;
    }

    const horas = parseFloat(taquimetro);
    const pago = horas * valorHora;
    setPago(pago.toFixed(2));
  };
  const calcularSaldo = () => {
    setSaldo((pago - pagoPiloto).toFixed(2));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevoTaquimetro = parseFloat(minutosVolados) / 60;

    const form = {
      Fecha: fecha,
      Avion: avion,
      Piloto: piloto,
      Taquimetro: nuevoTaquimetro.toFixed(2),
      Pago: pago,
      PagoPiloto: pagoPiloto,
      Saldo: saldo,
      Comentario: comentario,
    };

    saveFormOnline(form);
  };

  const saveFormOnline = async (form) => {
    const id = toast.loading("Please wait...");
    //do something else

    fetch("https://sheetdb.io/api/v1/hbg8jfgyv5lj2", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            Fecha: form.Fecha,
            Avion: form.Avion,
            Piloto: form.Piloto,
            Taquimetro: form.Taquimetro,
            Pago: form.Pago,
            PagoPiloto: form.PagoPiloto,
            Saldo: form.Saldo,
            Comentario: form.Comentario,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.created) {
          // La solicitud se completó con éxito
          console.log(data);
          // muestra un mensaje de éxito
          toast.update(id, {
            render: "Carga Exitosa",
            type: "success",
            isLoading: false,
          });
          toast.dismiss();
          // toast.success("Carga exitosa");
          limpiarForm();
        } else {
          // Hubo un error en la solicitud
          console.log(data);
          // muestra un mensaje de error
          toast.error("Error en la carga, intenta mas tarde");
          limpiarForm();
        }
      })
      .catch((error) => {
        console.log(error);
        // muestra un mensaje de error
        toast.error("Error en la carga, intenta mas tarde");
        limpiarForm();
      });
  };
  const limpiarForm = () => {
    setFecha("");
    setAvion("");
    setTaquimetro("");
    setMinutosVolados("");
    setPago("");
    setPiloto("");
    setPagoPiloto("");
    setSaldo("");
    setComentario("");
  };
  useEffect(() => {
    calcularPago(parseFloat(minutosVolados) / 60);
    calcularSaldo();
  }, [minutosVolados, pagoPiloto]);

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
        onChange={(e) => {
          setAvion(e.target.value);
          setMinutosVolados("");
          setSaldo("");
        }}
        required
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        <option value="JQK">JQK</option>
        <option value="RHS">RHS</option>
      </select>

      {/* <label
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
      /> */}
      <label
        htmlFor="minutosVolados"
        className="block mt-4 text-blue-500 font-bold mb-2"
      >
        Minutos volados:
      </label>
      <input
        type="number"
        id="minutosVolados"
        name="minutosVolados"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={minutosVolados}
        onChange={(e) => {
          setMinutosVolados(e.target.value);
        }}
        step="0.1"
        min="0.1"
        required
      />
      <label
        htmlFor="taquimetro"
        className="block mt-4 text-blue-500 font-bold mb-2"
      >
        Taquímetro:{" "}
        {parseFloat(minutosVolados) / 60
          ? (parseFloat(minutosVolados) / 60).toFixed(2)
          : ""}
      </label>

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
      <label
        htmlFor="minutosVolados"
        className="block mt-4 text-blue-500 font-bold mb-2"
      >
        Comentario:
      </label>
      <textarea
        type="text"
        id="comentario"
        name="comentario"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={comentario}
        onChange={(e) => {
          setComentario(e.target.value);
        }}
      />

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
      <ToastContainer />
    </form>
  );
};

export default Formulario;
