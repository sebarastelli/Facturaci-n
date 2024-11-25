import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Producto {
  id: number;
  cantidad: number;
  // nombre y precio si los necesitas
}

interface Cliente {
  id: string;
  nombre: string;
  direccion: string;
  localidad: string;
  telefono: string;
  CUIT: string;
}

interface Factura {
  id: number;
  fecha: string;
  total: number;
  clienteId: Cliente;
  productos: Producto[];
}

const BillList: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);

  // Fetch facturas from the API on component mount
  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/facturas');
        setFacturas(response.data);
      } catch (error) {
        console.error('Error fetching facturas', error);
      }
    };

    fetchFacturas();
  }, []);

  const deleteFactura = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/facturas/${id}`);
      console.log(response.data); // Aquí se muestra el mensaje de éxito
      // Actualizar el estado para eliminar la factura de la UI
      setFacturas(facturas.filter((factura) => factura.id !== id));
    } catch (error) {
      console.error('Error deleting factura', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Lista de Facturas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Número</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Fecha</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Cliente</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura) => (
                <tr key={factura.id} className="border-b">
                  <td className="px-4 py-2 text-sm text-gray-700">{factura.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{new Date(factura.fecha).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{factura.clienteId.nombre}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${factura.total.toFixed(2)}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      onClick={() => deleteFactura(factura.id)} // Llama a la función de eliminar
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td> {/* Botón de eliminar */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillList;