# ConnectHub - Professional Network Tracker

**Author:** Yizhang Cao 
**License:** MIT

## Project Objective

ConnectHub is a full-stack MERN application that helps professionals, freelancers, and job seekers maintain meaningful relationships by tracking contacts and interactions. Unlike basic contact apps or LinkedIn, ConnectHub provides a private workspace for managing relationship details that actually matter—what you discussed, when to follow up, and how relationships develop over time.

## Features

- **Contact Management**: Store contacts with name, email, company, role, and custom tags
- **Interaction Tracking**: Log meetings, calls, emails, and messages with notes and timestamps
- **Smart Insights**: See who needs follow-up based on days since last contact
- **Powerful Search**: Find contacts instantly by name, company, role, or tags
- **Full CRUD Operations**: Create, read, update, and delete contacts and interactions
- **Seeded Database**: 1000+ synthetic contacts with 2000-5000 interactions

## Tech Stack

### Backend
- Node.js + Express
- MongoDB (native driver, no Mongoose)
- RESTful API architecture

### Frontend
- React 18 with Hooks
- PropTypes for type checking
- Component-based CSS
- Fetch API (no axios)

## Installation Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

### Setup

1. **Clone the repository**
```bash
git clone [your-repo-url]
cd connecthub
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure environment variables**

Backend (backend/.env):
