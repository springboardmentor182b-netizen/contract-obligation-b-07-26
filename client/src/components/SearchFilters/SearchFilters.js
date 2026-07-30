import "./SearchFilters.css";

function SearchFilters({
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority
}) {

    return (

        <div className="filters-container">

            <div className="left-filters">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search by Title..."
                    className="search-box"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                

                {/* Status */}

                <select
                    className="filter-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >

                    <option value="">All Status</option>

                    <option value="Pending">Pending</option>

                    <option value="In Progress">In Progress</option>

                    <option value="Completed">Completed</option>

                    <option value="Overdue">Overdue</option>

                </select>

                {/* Priority */}

                <select
                    className="filter-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >

                    <option value="">All Priority</option>

                    <option value="High">High</option>

                    <option value="Medium">Medium</option>

                    <option value="Low">Low</option>

                </select>

            </div>

            
        </div>

    );

}

export default SearchFilters;
