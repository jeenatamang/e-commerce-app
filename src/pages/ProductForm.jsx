import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../features/products/productSlice";

const CATEGORIES = ["Electronics", "Accessories", "Footwear", "Bags", "Lifestyle"];

const emptyForm = {
  name: "",
  category: "Electronics",
  price: "",
  stockCount: "",
  rating: 4.0,
  description: "",
  image: "",
};

const ProductForm = ({ editData = null, onDone }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        category: editData.category || "Electronics",
        price: editData.price || "",
        stockCount: editData.stockCount || "",
        rating: editData.rating || 4.0,
        description: editData.description || "",
        image: editData.image || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      ...form,
      price: parseFloat(form.price),
      stockCount: parseInt(form.stockCount, 10),
      rating: parseFloat(form.rating),
      inStock: parseInt(form.stockCount, 10) > 0,
    };

    if (editData) {
      dispatch(updateProduct({ ...product, id: editData.id }));
    } else {
      dispatch(addProduct({ ...product, id: Date.now() }));
    }

    setForm(emptyForm);
    if (onDone) onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-xs font-semibold text-stone-500 mb-1 block">
          Product Image
        </label>
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="w-full h-40 object-cover rounded-xl mb-2 bg-stone-100"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-sm text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
        />

        <input
          name="image"
          value={form.image.startsWith("data:") ? "" : form.image}
          onChange={handleChange}
          placeholder="Or paste an image URL (https://...)"
          className="mt-2 w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-500 mb-1 block">
          Product Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="e.g. Wireless Headphones"
          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-stone-500 mb-1 block">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-500 mb-1 block">
            Price ($)
          </label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            placeholder="0.00"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-stone-500 mb-1 block">
            Stock Count
          </label>
          <input
            name="stockCount"
            type="number"
            min="0"
            value={form.stockCount}
            onChange={handleChange}
            required
            placeholder="0"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-500 mb-1 block">
            Rating (0–5)
          </label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-500 mb-1 block">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Short product description..."
          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-1">
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="flex-1 border border-stone-200 text-stone-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-stone-50 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex-1 bg-stone-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-stone-700 transition"
        >
          {editData ? "Save Changes" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;