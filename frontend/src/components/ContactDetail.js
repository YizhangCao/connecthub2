import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InteractionLog from './InteractionLog';
import InteractionForm from './InteractionForm';
import './ContactDetail.css';

function ContactDetail({ contact, onBack, onDelete, apiUrl }) {
  const [interactions, setInteractions] = useState([]);
  const [showAddInteraction, setShowAddInteraction] = useState(false);
  const [daysSince, setDaysSince] = useState(null);

  useEffect(() => {
    fetchInteractions();
  }, [contact._id]);

  const fetchInteractions = async () => {
    try {
      const response = await fetch(`${apiUrl}/interactions/contact/${contact._id}`);
      const data = await response.json();
      setInteractions(data);

      if (data.length > 0) {
        const lastDate = new Date(Math.max(...data.map(i => new Date(i.date))));
        const days = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
        setDaysSince(days);
      }
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const handleAddInteraction = async (interactionData) => {
    try {
      const response = await fetch(`${apiUrl}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...interactionData,
          contactId: contact._id
        })
      });

      if (!response.ok) throw new Error('Failed to add interaction');
      
      await fetchInteractions();
      setShowAddInteraction(false);
    } catch (error) {
      alert('Error adding interaction: ' + error.message);
    }
  };

  const handleDeleteInteraction = async (interactionId) => {
    if (!window.confirm('Are you sure you want to delete this interaction?')) return;

    try {
      const response = await fetch(`${apiUrl}/interactions/${interactionId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete interaction');
      
      await fetchInteractions();
    } catch (error) {
      alert('Error deleting interaction: ' + error.message);
    }
  };

  return (
    <div className="contact-detail">
      <div className="contact-detail-header">
        <button onClick={onBack} className="btn-back">
          ← Back to Contacts
        </button>

        <div className="contact-detail-info">
          <div className="contact-detail-main">
            <h2>{contact.name}</h2>
            <p className="contact-detail-role">{contact.role}</p>
            <p className="contact-detail-company">{contact.company}</p>
            <p className="contact-detail-email">{contact.email}</p>
          </div>

          <div className="contact-detail-stats">
            <div className="stat-large">{interactions.length}</div>
            <div className="stat-label">Interactions</div>
            <div className="stat-small">
              Last contact: {daysSince === null ? 'Never' : `${daysSince}d ago`}
            </div>
          </div>
        </div>

        {contact.tags && contact.tags.length > 0 && (
          <div className="contact-detail-tags">
            {contact.tags.map((tag, index) => (
              <span key={index} className="tag-large">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="contact-detail-actions">
        <button 
          onClick={() => setShowAddInteraction(true)}
          className="btn btn-primary btn-block"
        >
          + Log New Interaction
        </button>
        <button 
          onClick={() => onDelete(contact._id)}
          className="btn btn-danger"
        >
          Delete Contact
        </button>
      </div>

      <div className="contact-detail-body">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Interaction History
        </h3>

        {interactions.length === 0 ? (
          <div className="empty-interactions">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>No interactions recorded yet</p>
            <p className="empty-subtitle">Start by logging your first conversation</p>
          </div>
        ) : (
          interactions.map(interaction => (
            <InteractionLog
              key={interaction._id}
              interaction={interaction}
              onDelete={handleDeleteInteraction}
            />
          ))
        )}
      </div>

      {showAddInteraction && (
        <InteractionForm
          contactName={contact.name}
          onSubmit={handleAddInteraction}
          onCancel={() => setShowAddInteraction(false)}
        />
      )}
    </div>
  );
}

ContactDetail.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    company: PropTypes.string,
    role: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired
};

export default ContactDetail;