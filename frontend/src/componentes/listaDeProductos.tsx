import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from the API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/productos');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Lista de Productos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Nombre</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Descripción</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Precio</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-2 text-sm text-gray-700">{product.nombre}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{product.descripcion}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${product.precio.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;