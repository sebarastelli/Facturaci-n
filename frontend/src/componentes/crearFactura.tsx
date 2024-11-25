import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

interface InvoiceItem {
  productId: number;  
  quantity: number;
}

interface Client {
  id: number;  
  nombre: string;
  direccion: string;
  localidad: string;
  telefono: string;
  CUIT: string;
}

const BillForm: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<InvoiceItem[]>([]);
  const [selectedClient, setSelectedClient] = useState<number | ''>(''); // Cambié a number o ''
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cliente');
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los clientes');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

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

  const handleAddClient = (clientId: number) => {
    setSelectedClient(clientId);
  };

  const handleAddProduct = (productId: number) => {
    setSelectedProducts((prev) => [
      ...prev,
      { productId, quantity: 1 },
    ]);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient) {
      setError('Please select a client before submitting.');
      return;
    }

    const factura = {
      clienteId: selectedClient,  // Se envía el clientId como número
      productos: selectedProducts.map((item) => ({
        productoId: item.productId,  // Se asegura de que productId sea un número
        cantidad: item.quantity,
      })),
    };

    try {
      await axios.post('http://localhost:3000/facturas', factura);
      alert('Invoice created successfully!');
      setSelectedClient(''); // Limpiar cliente seleccionado
      setSelectedProducts([]); // Limpiar productos seleccionados
      console.log(factura);
    } catch (err) {
      setError('Error creating invoice');
      console.log(factura);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create Invoice</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Client Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="clientName">
            Client Name
          </label>
          <select
            id="clientSelected"
            onChange={(e) => handleAddClient(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Product Select */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="productSelect">
            Add Products
          </label>
          <select
            id="productSelect"
            onChange={(e) => handleAddProduct(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nombre} - ${product.precio}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Products */}
        {selectedProducts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Selected Products</h3>
            {selectedProducts.map((item, index) => {
              const product = products.find((p) => p.id === item.productId);
              const subtotal = product ? product.precio * item.quantity : 0;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between border p-2 mb-2 rounded"
                >
                  <span>
                    {product?.nombre} - ${subtotal}
                  </span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value, 10))
                      }
                      className="w-16 p-1 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProducts((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-teal-400 text-white font-bold rounded hover:bg-teal-500"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default BillForm;
