import "./SearchFilters.css";

function SearchFilters() {

    return (

        <div className="filters-container">

            <div className="left-filters">

                <input
                    type="text"
                    placeholder="Search..."
                    className="search-box"
                />
		
		<select className="filter-select">
                    <option>All Owners</option>
                    <option>Olivia</option>
                    <option>Emma</option>
                    <option>Isabella</option>
                </select>

                <select className="filter-select">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>

                <select className="filter-select">
                    <option>All Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>

                

            </div>

            <div className="right-count">

                3 of 20 obligations

            </div>

        </div>

    );

}

export default SearchFilters;