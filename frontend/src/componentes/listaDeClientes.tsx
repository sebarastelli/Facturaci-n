import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Client {
  id: string;
  nombre: string;
  direccion: string;
  localidad: string;
  telefono: string;
  CUIT: string;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the clients when the component mounts
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cliente');
        setClients(response.data); // Assuming the response contains a list of clients
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los clientes');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Lista de Clientes</h2>
      <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Dirección</th>
            <th className="px-4 py-2 border-b">Localidad</th>
            <th className="px-4 py-2 border-b">Teléfono</th>
            <th className="px-4 py-2 border-b">CUIT</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-4 py-2 border-b">{client.id}</td>
              <td className="px-4 py-2 border-b">{client.nombre}</td>
              <td className="px-4 py-2 border-b">{client.direccion}</td>
              <td className="px-4 py-2 border-b">{client.localidad}</td>
              <td className="px-4 py-2 border-b">{client.telefono}</td>
              <td className="px-4 py-2 border-b">{client.CUIT}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

export default ClientList;