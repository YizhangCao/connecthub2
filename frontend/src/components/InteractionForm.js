import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InteractionForm.css';

function InteractionForm({ contactName, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: 'meeting',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    duration: ''
  });

  const handleSubmit = () => {
    if (!formData.date || !formData.notes) {
      alert('Date and notes are required');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Log Interaction with {contactName}</h2>
          <button onClick={onCancel} className="modal-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="meeting">Meeting</option>
              <option value="call">Phone Call</option>
              <option value="email">Email</option>
              <option value="message">Message</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Duration (optional)</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="e.g., 30min, 1hr"
            />
          </div>

          <div className="form-group">
            <label>Notes *</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="What did you discuss? Any action items or follow-ups?"
              rows="5"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Log Interaction
          </button>
        </div>
      </div>
    </div>
  );
}

InteractionForm.propTypes = {
  contactName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default InteractionForm;