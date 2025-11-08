import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dashboard from './components/Dashboard';
import ContactCard from './components/ContactCard';
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all contacts on mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/contacts`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchContacts();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contacts?search=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) throw new Error('Failed to add contact');
      
      await fetchContacts();
      setShowAddContact(false);
    } catch (err) {
      alert('Error adding contact: ' + err.message);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`${API_URL}/contacts/${contactId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete contact');
      
      setSelectedContact(null);
      await fetchContacts();
    } catch (err) {
      alert('Error deleting contact: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading ConnectHub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error Loading Application</h2>
        <p>{error}</p>
        <button onClick={fetchContacts}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h1>ConnectHub</h1>
              <p className="app-tagline">Track relationships that matter</p>
            </div>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddContact(true)}
          >
            <span className="btn-icon">+</span>
            Add Contact
          </button>
        </div>

        {!selectedContact && (
          <SearchBar 
            value={searchQuery}
            onChange={handleSearch}
          />
        )}
      </header>

      <main className="app-main">
        {selectedContact ? (
          <ContactDetail
            contact={selectedContact}
            onBack={() => setSelectedContact(null)}
            onDelete={handleDeleteContact}
            apiUrl={API_URL}
          />
        ) : (
          <>
            <Dashboard contacts={contacts} apiUrl={API_URL} />
            
            <div className="contacts-grid">
              {contacts.length === 0 ? (
                <div className="empty-state">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <h3>{searchQuery ? 'No contacts found' : 'No contacts yet'}</h3>
                  <p>{searchQuery ? 'Try adjusting your search' : 'Add your first contact to get started'}</p>
                </div>
              ) : (
                contacts.map(contact => (
                  <ContactCard
                    key={contact._id}
                    contact={contact}
                    onClick={() => setSelectedContact(contact)}
                    apiUrl={API_URL}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>

      {showAddContact && (
        <ContactForm
          onSubmit={handleAddContact}
          onCancel={() => setShowAddContact(false)}
        />
      )}
    </div>
  );
}

export default App;