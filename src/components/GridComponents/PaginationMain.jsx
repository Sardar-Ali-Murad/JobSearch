// This is advance Pagination Component in which we can tell how many pages we want and is divided in the two parts for the simplicity and is using the PaginationSub.jsx and this PaginationMain.jsx is in the GridFooter.jsx 

import React, { useState, useEffect } from 'react';
import Pagination from './PaginationSub'
import { useSelector,useDispatch } from 'react-redux';
import {handlePaginationPage} from "../../features/pageSlice"

function PaginationMain() {
  let dispatch=useDispatch()
  let {paginationPage}=useSelector((state)=>state.store)
  const [currentPage, setCurrentPage] = useState(paginationPage)
  
  React.useEffect(()=>{
    dispatch(handlePaginationPage({page:currentPage}))
  },[currentPage])
 


  return (
    <div className="container mt-5">
      <Pagination  setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default PaginationMain;