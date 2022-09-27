import { useState, useCallback, useMemo } from "react";
import { connexion } from "../contexts/Connected";


function MyApp({ Component, pageProps }) {

  const [connected, setConnected] = useState(false)
  
  const toggleValue = useCallback(
    () => {
      setConnected(c => !c);
    },
    [],
  )

  const value = useMemo(() => {
    return {
      value: connected,
      toggleValue
    }
  }, [toggleValue, connected])
  

  return (
    <connexion.Provider value={value}>
      <Component {...pageProps}  />
    </connexion.Provider>
  )
}

export default MyApp
