import React, { useState } from 'react';
import axios from 'axios';

const ProductForm: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [precio, setPrecio] = useState<number | ''>('');
  const [loading, setLoading] = useState<boolean>(false)

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value);
  const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescripcion(e.target.value);
  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrecio(Number(e.target.value) || '');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!nombre || !descripcion || precio === '') {
      alert("Please fill out all fields.");
      return;
    }

    const newProduct = { nombre, descripcion, precio };
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/productos', newProduct);
      console.log('Producto agregado:', response.data);
      setNombre('');
      setDescripcion('');
      setPrecio('');
      alert("Producto agregado con éxito");
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert("Hubo un error al agregar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="nombre"
            type="text"
            value={nombre}
            onChange={handleNombreChange}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-24 resize-none"
            id="descripcion"
            value={descripcion}
            onChange={handleDescripcionChange}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="precio">
            Precio
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="precio"
            type="number"
            value={precio}
            onChange={handlePrecioChange}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Agregar Producto'}
              </button>
            </div>
          </div>
    </form>
    </div>
    </div>
  );
};

export default ProductForm;