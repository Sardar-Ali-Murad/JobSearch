// This is the First part of the Grid and and the header part

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { handleSearch, clearSearch } from "../../features/pageSlice";
import { useDispatch, useSelector } from "react-redux";

const GridHeader = () => {
  let { search } = useSelector((state) => state.store);
  let [fullIcon, setFullIcon] = React.useState(false);
  let dispatch = useDispatch();

  function cross() {
    setFullIcon(false);
    dispatch(clearSearch());
  }

  return (
    <div className="headersMain">
      <a>Jobs</a>
      <div className="headersIcons">
        {fullIcon ? (
          <label
            htmlFor="copy-button"
            className={`${fullIcon && "labelActive"}`}
          >
            <input
              name="copy-button"
              aria-label="copy-button"
              value={search}
              style={{ height: "5px" }}
              onChange={(e) =>
                dispatch(handleSearch({ search: e.target.value }))
              }
              placeholder="Search Here..."
            />
            <RxCross2 id="icon" onClick={cross} />
          </label>
        ) : (
          <IoSearchOutline
            className="headerSearch"
            onClick={() => setFullIcon(true)}
          />
        )}
      </div>
    </div>
  );
};

export default GridHeader;
