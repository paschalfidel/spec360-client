import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      // Remove from local state
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Loading...</div>;

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Manage Products</h1>
          <button
            onClick={() => navigate('/admin/add-product')}
            className="bg-accent hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Add New Product
          </button>
        </div>

        <div className="bg-white/5 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-white">Image</th>
                <th className="px-6 py-3 text-white">Name</th>
                <th className="px-6 py-3 text-white">Category</th>
                <th className="px-6 py-3 text-white">Price</th>
                <th className="px-6 py-3 text-white">Stock</th>
                <th className="px-6 py-3 text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 text-gray-300">{product.name}</td>
                  <td className="px-6 py-4 text-gray-300 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-gray-300">₦{product.price}</td>
                  <td className="px-6 py-4 text-gray-300">{product.stock}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminProductList;