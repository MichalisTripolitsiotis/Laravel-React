import React from "react"

const Search = () => {
    return (
        <div className="input-group">
            <div className="form-outline">
                <input type="search" id="form1" className="form-control" placeholder="Search..." />
            </div>
            <button type="button" className="btn btn-primary">
                Search
            </button>
        </div>
    )
}

export default Search

