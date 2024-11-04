import React from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import Payment from './components/pages/Payment';
import CertificateList from './components/pages/CertificateList/CertificateList'
import ContactForm from './components/pages/ContactForm/ContactForm'
import "./App.css"

const App = () => {
	return (
      <Routes>
        <Route path="/" element={<CertificateList />} />
				<Route path="/contact/:id/:tableName/:primaryKey/:price/:summa"  element={<ContactForm />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
  );
}

export default App
