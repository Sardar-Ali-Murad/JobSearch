// This is the main part of the grid where we have the List of the Users with their task and date stuff and is using the data.js to take the dummy data

import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import axios from "axios";
import { Highlighter } from "highlight-react-text";
import { useSelector, useDispatch } from "react-redux";
import {
  handleTotalPages,
  setData,
  handleDescriptionSort,
  handleLocationSort,
  handleTitleSort,
} from "../../features/pageSlice";
import CircularProgress from "@mui/material/CircularProgress";

const GridMain = () => {
  let [loading, setLoading] = React.useState(true);
  let dispatch = useDispatch();
  let {
    paginationPage,
    selectPage,
    search,
    data: dummyData,
  } = useSelector((state) => state.store);

  React.useEffect(() => {
    dispatch(
      handleTotalPages({ pages: Math.ceil(dummyData.length / selectPage) })
    );
  }, [selectPage]);

  // TFetching Data from the data base
  React.useEffect(() => {
    let start = async () => {
      try {
        setLoading(true);
        let { data } = await axios.post(
          "https://searchjobserver.herokuapp.com/JobSearch/crawler/all",
          { login: "root", password: "root" }
        );
        dispatch(setData({ data: data }));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    start();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  if (loading) {
    return <CircularProgress />;
  }

  // The Searching Logic
  // This will for any of the in this way like you search for "wan" and then it will look in the title,description and location tables and come with the row that include the "wan"  keyword
  const keys = ["title", "description", "location","url"];

  return (
    <div className="TableDataMain">
      <div>
        <div className="gridHead">
          <div
            className="gridHeadSingle"
            onClick={() => dispatch(handleTitleSort())}
          >
            <a>Title</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>
          <div
            className="gridHeadSingle locationColumn"
            onClick={() => dispatch(handleLocationSort())}
          >
            <a>Location</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>

          <div
            className="gridHeadSingle descriptionColumn"
            onClick={() => dispatch(handleDescriptionSort())}
          >
            <a>Description</a>
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
            .filter((item) =>
              keys.some((key) =>
                item[key].toLowerCase().includes(search.toLowerCase())
              )
            )
            .slice(
              paginationPage * selectPage - selectPage,
              paginationPage * selectPage
            )
            .map((row) => {
              return (
                <div className="gridWrapper">
                  <div className=" gridBody">
                    <div className="firstColumn">
                      {/* <a className="coloumsEnteries">{row?.title}</a> */}
                      <Highlighter searchText={search}>
                        {row?.title}
                      </Highlighter>
                    </div>

                    {/* <a className="coloumsEnteries">{row?.location}</a> */}
                    <div className="locationColumn">
                    <Highlighter searchText={search}>
                        {row?.location}
                      </Highlighter>
                    </div>
                    {/* <a className="coloumsEnteries">
                      {row.description.slice(0, 100)}...
                    </a> */}
                    <div className="descriptionColumn">
                     <Highlighter searchText={search}>
                        {row?.description.slice(0,100)}
                      </Highlighter>
                    </div>
                    {/* <a
                      className="clientDate coloumsEnteries"
                      onClick={() => openInNewTab(row?.url)}
                      >
                      {row.url}
                    </a> */}
                     
                    <div className="clientDate" onClick={() => openInNewTab(row?.url)}>
                    <Highlighter searchText={search} >
                       {row.url}
                     </Highlighter>
                    </div>

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
