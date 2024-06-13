import idb from "./idb2";
import React, { useState } from "react";
import  "./addCost.css"

function AddCost() {
    const [nameDish, setNameDish] = useState('');
    const [priceDish, setPriceDish] = useState('');
    const [categoryDish, setCategoryDish] = useState('');
    const [descriptionDish, setDescriptionDish] = useState('');


    const categories = ['FOOD', 'HEALTH', 'EDUCATION', 'TRAVEL', 'HOUSING', 'OTHER'];
    const handleAddData = () => {
        if(nameDish !== '' && priceDish !== '' && categoryDish !== '' && descriptionDish !== '' ) {
            idb.addCost({name:nameDish,sum:priceDish,category:categoryDish,description:descriptionDish});
            setNameDish('');
            setPriceDish('');
            setCategoryDish('');
            setDescriptionDish('');
        }else{
            alert("Some data is wrong");
        }
    };

    const handleChange = (e) => {
        const input = e.target.value;
        const regex = /^[0-9]*$/;
        if (regex.test(input)) {
            setPriceDish(input);
        }
    };

    return (
        <div className="addCost-container">
            <h2 className="addCost-header">New Item</h2>
            <label className="addCost-label">
                Name:
                <input className="addCost-input" onChange={(e) => {
                    setNameDish(e.target.value)
                }} name="name" value={nameDish}/>
            </label>
            <label className="addCost-label">
                Price:
                <input className="addCost-input" onChange={(e) => handleChange(e)} name="price" value={priceDish}/>
            </label>
            <label className="addCost-label">
                Category:
                <select className="addCost-input" onChange={(e) => {
                    setCategoryDish(e.target.value)
                }} name="category" value={categoryDish}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </label>
            <label className="addCost-label">
                Description:
                <input className="addCost-input" onChange={(e) => {
                    setDescriptionDish(e.target.value)
                }} name="description" value={descriptionDish}/>
            </label>

            <button className="addCost-button" onClick={handleAddData}>Add Data</button>
        </div>
    );
}


export default AddCost;
