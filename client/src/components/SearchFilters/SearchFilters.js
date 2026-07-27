import "./SearchFilters.css";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function SearchFilters({ search, setSearch, status, setStatus, priority, setPriority }) {
	return /* @__PURE__ */ _jsx("div", {
		className: "filters-container",
		children: /* @__PURE__ */ _jsxs("div", {
			className: "left-filters",
			children: [
				/* @__PURE__ */ _jsx("input", {
					type: "text",
					placeholder: "Search by Title...",
					className: "search-box",
					value: search,
					onChange: (e) => setSearch(e.target.value)
				}),
				/* @__PURE__ */ _jsxs("select", {
					className: "filter-select",
					value: status,
					onChange: (e) => setStatus(e.target.value),
					children: [
						/* @__PURE__ */ _jsx("option", {
							value: "",
							children: "All Status"
						}),
						/* @__PURE__ */ _jsx("option", {
							value: "Pending",
							children: "Pending"
						}),
						/* @__PURE__ */ _jsx("option", {
							value: "In Progress",
							children: "In Progress"
						}),
						/* @__PURE__ */ _jsx("option", {
							value: "Completed",
							children: "Completed"
						}),
						/* @__PURE__ */ _jsx("option", {
							value: "Overdue",
							children: "Overdue"
						})
					]
				}),
				/* @__PURE__ */ _jsxs("select", {
					className: "filter-select",
					value: priority,
					onChange: (e) => setPriority(e.target.value),
					children: [
						/* @__PURE__ */ _jsx("option", {
							value: "",
							children: "All Priority"
						}),
						/* @__PURE__ */ _jsx("option", {
							value: "High",
							children: "High"
						}),
						/* @__PURE__ */ _jsx("option", {
							value: "Medium",
							children: "Medium"
						}),
						/* @__PURE__ */ _jsx("option", {
							value: "Low",
							children: "Low"
						})
					]
				})
			]
		})
	});
}


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
