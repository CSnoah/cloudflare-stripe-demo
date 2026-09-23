import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PurchaseSuccess from './PurchaseSuccess.jsx'

function Store() {
  const handleCheckout = async () => {
    const response = await fetch("/api/session/create-checkout-session", {
      method: "POST",
   });

    const data = await response.json();

    window.location.href = data.url;
  };

  return (
    <>
    <h1 style={styles.title}>Store</h1>
    <div style={styles.body}>
      <div style={styles.itemBox}>
        <img style={styles.itemImage} src="https://free-images.com/lg/464d/digital_equipment_t_shirt.jpg"/>
        <button onClick={handleCheckout}>
          Buy for $10
        </button>
      </div>
    </div>
    </>
  )
}

export default Store

const styles = {
  body: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    textAlign: 'center'
  },
  itemBox: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    border: 'solid black',
    borderRadius: '5px',
    padding: '5px',
    width: '15%',
  },
  itemImage: {
    width: "100px",
    margin: '5px',
    borderRadius: '5px',
  },
}
