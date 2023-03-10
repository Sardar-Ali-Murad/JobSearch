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
  handleDateSort,
} from "../../features/pageSlice";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment/moment";

const GridMain = () => {
  let [loading, setLoading] = React.useState(true);
  let dispatch = useDispatch();
  let {
    paginationPage,
    selectPage,
    search,
    data: dummyData,
  } = useSelector((state) => state.store);

  // This UseEffect is to change the total Pages Logic
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
        let { data } = await axios.get(
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

  // When the User Click the link it will be shown in the new tab
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  if (loading) {
    return <CircularProgress />;
  }

  // The Searching Logic
  // This will for any of the in this way like you search for "wan" and then it will look in the title,description and location tables and come with the row that include the "wan"  keyword
  const keys = ["title", "description", "location", "url"];

  return (
    <div className="TableDataMain">
      <div>
        {/* Here Starts / This is the main heading of the title,description,url,date,location... */}
        <div className="gridHead">
          <div
            className="gridHeadSingle headTitle"
            onClick={() => dispatch(handleTitleSort())}
          >
            <a>Title</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>
          <div
            className="gridHeadSingle  headLocation"
            onClick={() => dispatch(handleLocationSort())}
          >
            <a>Location</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>

          {/* This is the description column that  is removed */}
          {/* 
          <div
            className="gridHeadSingle  headDescription"
            onClick={() => dispatch(handleDescriptionSort())}
          >
            <a>Description</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div> */}

          <div className="gridHeadSingle URL clientDate headUrl">
            <a>Url</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>

          <div
            className="gridHeadSingle lastSeen headLastSeen"
            onClick={() => dispatch(handleDateSort())}
          >
            <a>First Found</a>
            <div className="gridHeadIcons">
              <AiFillCaretUp className="IconUp" />
              <AiFillCaretDown className="IconDown" />
            </div>
          </div>
        </div>
        {/* Here Ends the Headers which is teh first row of the grid title,description... */}

        <div className="headLine"></div>

        {/* Here Starts the main grid data  */}
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
                    {/*  */}
                    <div className="firstColumn">
                      <Highlighter searchText={search}>
                        {row?.title}
                      </Highlighter>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="locationColumn">
                      <Highlighter searchText={search}>
                        {row?.location}
                      </Highlighter>
                    </div>
                    {/*  */}
                    {/*  */}
                    {/* This is the description column that  is removed */}
                    {/* <div className="descriptionColumn">
                      <Highlighter searchText={search}>
                        {row?.description.slice(0, 100)}
                      </Highlighter>...
                    </div> */}
                    {/*  */}
                    {/*  */}
                    <div
                      className="jobsUrl"
                      onClick={() => openInNewTab(row?.url)}
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <Highlighter searchText={search}>{row.url}</Highlighter>
                    </div>
                    {/*  */}

                    <div className="lastSeenData">
                      <a>{moment(row?.addedDate).format("DD/MM/YY")}</a>
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
