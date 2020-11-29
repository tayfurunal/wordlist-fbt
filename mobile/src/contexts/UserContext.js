import React, { createContext, useState } from 'react'

const UserContext = createContext()
const UserDispatchContext = createContext()

export default ({ children }) => {
  const [user, setUser] = useState()
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserDispatchContext }
