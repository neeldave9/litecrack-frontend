import React from 'react'
import Error from '../pages/Error'; 

function NetworkError() {
  return (
    <Error
    name="Network Error"
    type="500"
    description="There was error fetching data from the server. Please try again later."
  />
  )
}

export default NetworkError; 