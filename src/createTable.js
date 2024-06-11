
import React from 'react';
import "./createTable.css"
function CreateTable({ tableData }) {
    return (
        <table className="createTable-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {tableData.map((data, index) => (
                <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.category}</td>
                    <td>{data.sum}</td>
                    <td>{data.description}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CreateTable;

