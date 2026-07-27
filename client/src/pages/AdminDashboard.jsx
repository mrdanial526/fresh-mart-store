import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Apparel');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(10);
  const [message, setMessage] = useState('');

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const anyModalOpen = deleteModalOpen || editModalOpen;

  const fetchProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const fetchOrders = () => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Error fetching orders:', err));
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (anyModalOpen) return;

    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price: Number(price), category, image, countInStock: Number(countInStock) })
    })
      .then((res) => res.json())
      .then(() => {
        setMessage('Product added successfully!');
        setName('');
        setDescription('');
        setPrice('');
        setImage('');
        fetchProducts();
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => console.error('Error adding product:', err));
  };

  const confirmDelete = (id) => {
    if (anyModalOpen) return;
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;

    fetch(`/api/products/${productToDelete}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          setMessage('Product deleted successfully!');
          fetchProducts();
        } else {
          setMessage('Failed to delete product.');
        }
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => console.error('Error deleting product:', err))
      .finally(() => {
        setDeleteModalOpen(false);
        setProductToDelete(null);
      });
  };

  const openEditModal = (product) => {
    if (anyModalOpen) return;
    const productId = product._id || product.id;
    setEditProduct({
      id: productId,
      name: product.name || '',
      description: product.description || '',
      price: product.price ?? '',
      category: product.category || 'Apparel',
      image: product.image || '',
      countInStock: product.countInStock ?? 0,
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditProduct(null);
  };

  const handleEditFieldChange = (field, value) => {
    setEditProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editProduct) return;
    setSavingEdit(true);

    fetch(`/api/products/${editProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editProduct.name,
        description: editProduct.description,
        price: Number(editProduct.price),
        category: editProduct.category,
        image: editProduct.image,
        countInStock: Number(editProduct.countInStock),
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (res.ok) {
          setMessage('Product updated successfully!');
          fetchProducts();
        } else {
          setMessage(data?.message || 'Failed to update product.');
        }
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => {
        console.error('Error updating product:', err);
        setMessage('Network error while updating product.');
        setTimeout(() => setMessage(''), 3000);
      })
      .finally(() => {
        setSavingEdit(false);
        closeEditModal();
      });
  };

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then((res) => res.json())
      .then(() => {
        setMessage('Order status updated!');
        fetchOrders();
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => console.error('Error updating status:', err));
  };

  return (
    <div className="page-transition" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh', position: 'relative' }}>
      <h1 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>Admin Management Dashboard</h1>

      {message && (
        <div className="alert-banner" style={{ background: 'var(--bg-card)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', fontWeight: '500' }}>
          {message}
        </div>
      )}

      {/* Add Product Form */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Add New Product</h3>
        <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} disabled={anyModalOpen} required style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', opacity: anyModalOpen ? 0.6 : 1 }} />
          <input type="number" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} disabled={anyModalOpen} required style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', opacity: anyModalOpen ? 0.6 : 1 }} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={anyModalOpen} style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', cursor: anyModalOpen ? 'not-allowed' : 'pointer', opacity: anyModalOpen ? 0.6 : 1 }}>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            <option value="Audio">Audio</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>
          <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} disabled={anyModalOpen} required style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', opacity: anyModalOpen ? 0.6 : 1 }} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={anyModalOpen} required style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', gridColumn: '1 / -1', opacity: anyModalOpen ? 0.6 : 1 }} />
          <button type="submit" disabled={anyModalOpen} style={{ padding: '0.75rem', background: anyModalOpen ? 'var(--border-color)' : 'var(--accent-gold)', color: anyModalOpen ? 'var(--text-muted)' : 'var(--bg-primary)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: anyModalOpen ? 'not-allowed' : 'pointer', gridColumn: '1 / -1', opacity: anyModalOpen ? 0.7 : 1 }}>
            {anyModalOpen ? 'Action Required' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Manage Products List */}
      <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Manage Store Products</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {products.map((product) => {
          const productId = product._id || product.id;
          return (
            <div key={productId} className="product-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.75rem' }} />
                <h4 style={{ color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>{product.name}</h4>
                <p style={{ color: 'var(--accent-gold)', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>${product.price}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => openEditModal(product)}
                  disabled={anyModalOpen}
                  style={{
                    padding: '0.5rem',
                    background: anyModalOpen ? 'var(--border-color)' : 'var(--accent-gold)',
                    color: anyModalOpen ? 'var(--text-muted)' : 'var(--bg-primary)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: anyModalOpen ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    opacity: anyModalOpen ? 0.7 : 1,
                    flex: 1,
                  }}
                >
                  {anyModalOpen ? 'Action Required' : 'Edit'}
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(productId)}
                  disabled={anyModalOpen}
                  style={{
                    padding: '0.5rem',
                    background: anyModalOpen ? 'var(--border-color)' : '#d9534f',
                    color: anyModalOpen ? 'var(--text-muted)' : '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: anyModalOpen ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    opacity: anyModalOpen ? 0.7 : 1,
                    flex: 1,
                  }}
                >
                  {anyModalOpen ? 'Action Required' : 'Delete'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Orders Management */}
      <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Customer Orders Management</h3>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem' }}>
        {orders.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No customer orders found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((order) => (
              <div key={order._id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p style={{ color: 'var(--text-main)', margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Order ID: {order._id}</p>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.85rem' }}>User: {order.user?.name || 'Guest'} ({order.user?.email || 'N/A'})</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>${order.totalPrice.toFixed(2)}</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    disabled={anyModalOpen}
                    style={{ padding: '0.4rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', cursor: anyModalOpen ? 'not-allowed' : 'pointer', opacity: anyModalOpen ? 0.6 : 1 }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {deleteModalOpen && createPortal(
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'var(--bg-card)',
            border: '2px solid var(--accent-gold)',
            padding: '1.25rem',
            borderRadius: '10px',
            maxWidth: '360px',
            width: '90%',
            boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
            zIndex: 99999,
          }}
        >
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>
            Delete Product?
          </h4>
          <p style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => {
                setDeleteModalOpen(false);
                setProductToDelete(null);
              }}
              style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteProduct}
              style={{ padding: '0.5rem', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1, fontWeight: 'bold' }}
            >
              Yes, Delete
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Edit Product Modal */}
      {editModalOpen && editProduct && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--accent-gold)',
              padding: '1.5rem',
              borderRadius: '10px',
              maxWidth: '480px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
            }}
          >
            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '1.2rem' }}>
              Edit Product
            </h4>

            <form onSubmit={handleSaveEdit} style={{ display: 'grid', gap: '0.85rem' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Name
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) => handleEditFieldChange('name', e.target.value)}
                  required
                  style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </label>

              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Price ($)
                <input
                  type="number"
                  step="0.01"
                  value={editProduct.price}
                  onChange={(e) => handleEditFieldChange('price', e.target.value)}
                  required
                  style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </label>

              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Category
                <select
                  value={editProduct.category}
                  onChange={(e) => handleEditFieldChange('category', e.target.value)}
                  style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', boxSizing: 'border-box' }}
                >
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Audio">Audio</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                </select>
              </label>

              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Image URL
                <input
                  type="text"
                  value={editProduct.image}
                  onChange={(e) => handleEditFieldChange('image', e.target.value)}
                  required
                  style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </label>

              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Description
                <textarea
                  value={editProduct.description}
                  onChange={(e) => handleEditFieldChange('description', e.target.value)}
                  required
                  rows={3}
                  style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </label>

              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Stock Count
                <input
                  type="number"
                  value={editProduct.countInStock}
                  onChange={(e) => handleEditFieldChange('countInStock', e.target.value)}
                  required
                  style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </label>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={savingEdit}
                  style={{ padding: '0.6rem', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: savingEdit ? 'not-allowed' : 'pointer', flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  style={{ padding: '0.6rem', background: 'var(--accent-gold)', color: 'var(--bg-primary)', border: 'none', borderRadius: '4px', cursor: savingEdit ? 'not-allowed' : 'pointer', flex: 1, fontWeight: 'bold', opacity: savingEdit ? 0.7 : 1 }}
                >
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}