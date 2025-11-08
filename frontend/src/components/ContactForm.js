import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.css';

function ContactForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    tags: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert('Name and email are required');
      return;
    }

    const contactData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    onSubmit(contactData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Contact</h2>
          <button onClick={onCancel} className="modal-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              placeholder="TechCorp"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              placeholder="Software Engineer"
            />
          </div>

          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="client, active, prospect"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ContactForm;