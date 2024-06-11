import React, { useState } from "react";
import idb from "./idb2";
import CreateTable from "./createTable";
import "./GetDataByMonthYear.css"
function GetDataByMonthYear() {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState([]);

    const fetchData =async () => {
            const data = await idb.getDataByMonth(month, year);
        if(data.length > 0) {
            setShowTable(data.length > 0);
            setTableData(data);
        }
        else{
            setShowTable(false);
            alert("Error: can't find data" );
        }
    };

    return (
        <div className="getData-container">
            <h2 className="getData-header">My Report</h2>
            <label className="getData-label">
                Month:
                <input
                    className="getData-input"
                    type="number"
                    min="1"
                    max="12"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
            </label>
            <label className="getData-label">
                Year:
                <input
                    className="getData-input"
                    type="number"
                    min="1970"
                    max={new Date().getFullYear()}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </label>
            <button className="getData-button" onClick={() => {
                fetchData();
            }}>Get Data
            </button>
            {showTable && <CreateTable className="getData-table" tableData={tableData}/>}
        </div>
    );
}

export default GetDataByMonthYear;
