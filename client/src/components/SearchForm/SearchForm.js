import React from "react";
// import "./style.css";

function SearchForm({ handleSearchChange, search }) {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="search"></label>
                <input
                    onChange={handleSearchChange}
                    value={search}
                    name="search"
                    type="text"
                    className="form-control searchBox"
                    placeholder="Search Restaurants here..."
                    id="search"
                />
            </div>
        </form>
    );
}

export default SearchForm;