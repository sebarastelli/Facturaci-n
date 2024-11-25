import React, { useState } from 'react';
import axios from 'axios';

const AddClientForm: React.FC = () => {
  // Estado para los campos del formulario
  const [clientData, setClientData] = useState({
    nombre: '',
    direccion: '',
    localidad: '',
    telefono: '',
    CUIT: '',
  });

  // Manejar el cambio de los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/cliente', clientData);
      console.log('Cliente agregado', response.data);
      setClientData({nombre: '',
        direccion: '',
        localidad: '',
        telefono: '',
        CUIT: '',})

      
      // Puedes hacer algo más, como limpiar el formulario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al agregar cliente', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Agregar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nombre"
                name="nombre"
                type="text"
                value={clientData.nombre}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="direccion">
                Dirección
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="direccion"
                name="direccion"
                type="text"
                value={clientData.direccion}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="localidad">
                Localidad
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="localidad"
                name="localidad"
                type="text"
                value={clientData.localidad}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telefono">
                Teléfono
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="telefono"
                name="telefono"
                type="text"
                value={clientData.telefono}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cuit">
                CUIT
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="CUIT"
                name="CUIT"
                type="text"
                value={clientData.CUIT}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                type="submit"
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Agregar Cliente
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientForm;