// This is the last part of the grid where we have the pagination stuff

import React from "react";
import FormRowSelect from "./FormRowSelect";
import PaginationMain from "./PaginationMain";
import {handleInputPage,handleSelectPage,handleInputForm}  from "../../features/pageSlice"
import { useSelector,useDispatch } from "react-redux";

const GridFooter = () => {
  let dispatch=useDispatch()
  let {selectPage:rowPerPage,paginationPage,totalPages,data}=useSelector((store)=>store.store)
  let [selectPage, setSelectPage] = React.useState(rowPerPage);
  
  function handleChangeSelect(e) {
    setSelectPage(e.target.value);
  }

  function submitInput(event){
    event.preventDefault()
    dispatch(handleInputForm())
  }


  let [InputPage, setInputPage] = React.useState(1);
  function handleChangeInput(e) {
    setInputPage(e.target.value)
  }

  React.useEffect(()=>{
     dispatch(handleSelectPage({page:selectPage}))
    },[selectPage])
    
    React.useEffect(()=>{
      dispatch(handleInputPage({page:InputPage}))
  },[InputPage])

  let list = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];



  return (
    <div className="tableFooterMain">
      <p>Showing {paginationPage} to {totalPages} of {data.length} entries</p>
      <div>
        <PaginationMain/>
      </div>
        <FormRowSelect
          value={selectPage}
          handleChange={handleChangeSelect}
          name="page"
          list={list}
        />

      <form className="pageInputMain" onSubmit={submitInput}>
      <label>
        <p>Go To </p>  
        </label>
        <input
          type="Text"
          value={InputPage}
          name="page"
          onChange={handleChangeInput}
          className="pageInput"
        />
      </form>

    </div>
  );
};

export default GridFooter;
