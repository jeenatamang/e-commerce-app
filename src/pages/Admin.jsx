import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../features/products/productSlice";
import ProductForm from "./ProductForm";

const StatCard = ({ emoji, value, label }) => (
  <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
    <span className="text-2xl">{emoji}</span>
    <p className="text-2xl font-bold text-stone-900">{value}</p>
    <p className="text-sm text-stone-400">{label}</p>
  </div>
);

const Admin = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const totalValue = items.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = items.length ? totalValue / items.length : 0;
  const categories = new Set(items.map((p) => p.category)).size;

  const openAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setDeleteConfirm(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Admin Panel</h1>
          <p className="text-stone-400 text-sm mt-1">{items.length} products in catalog</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-stone-700 transition"
        >
          <span className="text-lg leading-none">+</span> Add Product
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard value={items.length} label="Total Products" />
        <StatCard value={`$${totalValue.toFixed(0)}`} label="Total Value" />
        <StatCard value={`$${avgPrice.toFixed(2)}`} label="Avg Price" />
        <StatCard value={categories} label="Categories" />
      </div>

      {/* Product table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left text-xs font-semibold text-stone-400 tracking-wider px-6 py-4 uppercase">Product</th>
              <th className="text-left text-xs font-semibold text-stone-400 tracking-wider px-4 py-4 uppercase">Category</th>
              <th className="text-left text-xs font-semibold text-stone-400 tracking-wider px-4 py-4 uppercase">Price</th>
              <th className="text-left text-xs font-semibold text-stone-400 tracking-wider px-4 py-4 uppercase">Stock</th>
              <th className="text-right text-xs font-semibold text-stone-400 tracking-wider px-6 py-4 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product, i) => (
              <tr
                key={product.id}
                className={`border-b border-stone-50 hover:bg-stone-50 transition ${i === items.length - 1 ? "border-none" : ""}`}
              >
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-xl object-cover bg-stone-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/40x40/e7e5e4/a8a29e?text=${encodeURIComponent(product.name[0])}`;
                      }}
                    />
                    <span className="font-medium text-stone-800 text-sm">{product.name}</span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-4">
                  <span className="bg-stone-100 text-stone-600 text-xs font-medium px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </td>

                {/* Price */}
                <td className="px-4 py-4">
                  <span className="font-semibold text-stone-900 text-sm">${product.price.toFixed(2)}</span>
                </td>

                <td className="px-4 py-4">
                  <span className={`font-semibold text-sm ${product.stockCount <= 10 && product.stockCount > 0 ? "text-yellow-500" : product.stockCount === 0 ? "text-red-500" : "text-green-500"}`}>
                    {product.stockCount}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(product)}
                      className="text-sm font-medium text-stone-600 border border-stone-200 px-4 py-1.5 rounded-lg hover:bg-stone-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="text-sm font-medium text-red-500 border border-red-100 px-4 py-1.5 rounded-lg hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-stone-900">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={closeModal} className="text-stone-400 hover:text-stone-600 text-xl leading-none">✕</button>
            </div>
            <ProductForm editData={editingProduct} onDone={closeModal} />
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <h2 className="text-lg font-bold text-stone-900 mb-2">Delete Product?</h2>
            <p className="text-stone-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-stone-200 text-stone-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-stone-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
