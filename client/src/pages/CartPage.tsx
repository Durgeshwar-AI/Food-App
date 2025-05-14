import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Cart from '../Components/Cart'

const CartPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Cart />
      </div>
      <Footer />
    </>
  )
}

export default CartPage
