import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    category: 'phone',
    price: '',
    description: '',
    stock: 10,
    imageFile: null,        // renamed for clarity (holds the File object)
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('stock', form.stock);
    formData.append('image', form.imageFile); // must match backend field name

    try {
      await axios.post('http://localhost:5001/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Product added successfully!');
      
      // ✅ Correct reset: use 'imageFile: null', not 'image: null'
      setForm({
        name: '',
        category: 'phone',
        price: '',
        description: '',
        stock: 10,
        imageFile: null,
      });
      
      // Clear file input visually
      document.getElementById('image-input').value = '';
      
      // Optional: auto-hide message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding product. Please try again.');
      console.error('Upload error:', err.response?.data || err.message);
    }
  };

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Add New Product</h1>
        <button
    onClick={() => navigate('/admin/products')}
    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg"
  >
    Manage Products
  </button>
        <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-xl space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-dark border border-white/10 rounded-lg text-white"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-dark border border-white/10 rounded-lg text-white"
          >
            <option value="phone">Phone</option>
            <option value="accessory">Accessory</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price (₦)"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-dark border border-white/10 rounded-lg text-white"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 bg-dark border border-white/10 rounded-lg text-white"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-dark border border-white/10 rounded-lg text-white"
          />
          <div>
            <label className="block text-gray-300 mb-2">Product Image</label>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-red-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Product
          </button>
          {message && <p className="text-center text-green-400">{message}</p>}
        </form>
        <button
          onClick={handleLogout}
          className="mt-4 text-gray-400 hover:text-accent text-sm"
        >
          Logout
        </button>
      </div>

    </section>
  );
};

export default AdminAddProduct;