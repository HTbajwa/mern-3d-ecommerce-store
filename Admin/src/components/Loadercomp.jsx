import React from 'react'
import {ClipLoader} from "react-spinners"
import {css} from '@emotion/react'
const Loadercomp = ({size}) => {
    let color="blue"
    const override=css`borderColor:"red",`
  return (
    <ClipLoader
    className='centerlo'
    color={color}
    loading={true}
    size={size ? size : 80}
    cssOverride={override}
    aria-label='Loading Spinner'
    data-testid="loader"
    
    
    />

   
  )
}

export default Loadercomp