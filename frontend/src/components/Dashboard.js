import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';

function Dashboard({ contacts, apiUrl }) {
  const [stats, setStats] = useState({
    total: 0,
    needFollowUp: 0,
    totalInteractions: 0
  });

  useEffect(() => {
    calculateStats();
  }, [contacts]);

  const calculateStats = async () => {
    try {
      // Get all interactions to count them
      const response = await fetch(`${apiUrl}/interactions`);
      const interactions = await response.json();

      // Calculate days since last contact for each
      const needFollowUp = await Promise.all(
        contacts.map(async (contact) => {
          const contactInteractions = interactions.filter(
            i => i.contactId === contact._id
          );
          
          if (contactInteractions.length === 0) return true;

          const lastDate = new Date(
            Math.max(...contactInteractions.map(i => new Date(i.date)))
          );
          const daysSince = Math.floor(
            (new Date() - lastDate) / (1000 * 60 * 60 * 24)
          );

          return daysSince > 30;
        })
      );

      setStats({
        total: contacts.length,
        needFollowUp: needFollowUp.filter(Boolean).length,
        totalInteractions: interactions.length
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="stat-card">
        <div className="stat-value">{stats.total}</div>
        <div className="stat-label">Total Contacts</div>
      </div>

      <div className="stat-card stat-warning">
        <div className="stat-value">{stats.needFollowUp}</div>
        <div className="stat-label">Need Follow-up (30+ days)</div>
      </div>

      <div className="stat-card">
        <div className="stat-value">{stats.totalInteractions}</div>
        <div className="stat-label">Total Interactions</div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      company: PropTypes.string,
      role: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  apiUrl: PropTypes.string.isRequired
};

export default Dashboard;