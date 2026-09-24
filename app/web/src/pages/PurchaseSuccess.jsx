import { useEffect, useState } from 'react'

const PurchaseSuccess = () => {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    async function getSession() {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      const response = await fetch(
        `/api/session/checkout-session/${sessionId}`
      );

      const data = await response.json();
      console.log(`Data=${data}`)
      console.log(data)

      setSession(data);
    }

    getSession();

  }, [])

  return (
    <div>
    <h1>Order Complete</h1>
    <div style={styles.message}>
      <h1>Payment successful!</h1>
      
      <p>Session ID: {session?.id}</p>
      <p>Payment status: {session?.payment_status}</p>
      <p>Amount: ${session?.amount_total / 100}</p>
    </div>
    </div>
  )
}

export default PurchaseSuccess

const styles={
  message: {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '5px',
  }
}
