'use client';
import Cart from '@/components/cart';
import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800">
      <NavBar />
      <div className="pt-24"> {/* Add padding top to account for fixed navbar */}
        <Cart/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;