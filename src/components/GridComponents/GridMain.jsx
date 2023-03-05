// This is the main part of the grid where we have the List of the Users with their task and date stuff and is using the data.js to take the dummy data

import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { handleTotalPages, setData ,handleDescriptionSort,
  handleLocationSort,
  handleTitleSort} from "../../features/pageSlice";
import CircularProgress from '@mui/material/CircularProgress';

const GridMain = () => {
  let [loading,setLoading]=React.useState(true)
  let dispatch = useDispatch();
  let {
    paginationPage,
    selectPage,
    search,
    data: dummyData,
  } = useSelector((state) => state.store);




  React.useEffect(() => {
    dispatch(handleTotalPages({ pages: Math.ceil(dummyData.length / selectPage) }));
  }, [selectPage]);

  React.useEffect(()=>{
    let start=async ()=>{
      try {
        setLoading(true)
        let {data}=await axios.post("https://searchjobserver.herokuapp.com/JobSearch/crawler/all",{login:"root",password:"root"})
        dispatch(setData({ data: data }));
        setLoading(false)
      } catch (error) {   
        console.log(error)
      }
    }
    start()
  },[])

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  if(loading){
    return  <CircularProgress />
  }




  return (
    <div className="TableDataMain">
      <div>
        <div className="flex-even gridHead">
          <div className="gridHeadSingle" onClick={()=>dispatch(handleTitleSort())}>
            <a>Title</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>
          <div className="gridHeadSingle" onClick={()=>dispatch(handleLocationSort())}>
            <a>Location</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>

          <div className="gridHeadSingle" onClick={()=>dispatch(handleDescriptionSort())}>
            <a >Description</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>

          <div className="gridHeadSingle URL clientDate">
            <a>Url</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>

        </div>

        <div className="headLine"></div>
        <div>
          {dummyData
            .slice(
              paginationPage * selectPage - selectPage,
              paginationPage * selectPage
            )
            .filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((row) => {
              return (
                <div>
                  <div className=" gridBody">
                    <div className="firstColumn" style={{ gap: "20px" }}>
                      <a>{row?.title}</a>
                    </div>

                    <a>{row?.location}</a>
                    <a>{row.description.slice(0,100)}...</a>
                    <a className="clientDate" onClick={()=>openInNewTab(row?.url)}>{row.url}</a>
                  </div>
                  <div className="RowsLine"></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GridMain;
