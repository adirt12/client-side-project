// App.js

import React, {useEffect,useState} from 'react';
import './App.css';
import AddCost from './addCost';
import GetDataByMonthYear from './getDataByMonthYear';
import idb from './idb2'

function App() {
    const [, setDb] = useState(null);

    useEffect(() => {
        const initializeDB = async () => {
            try {
                // Open the IndexedDB costsdb database
                const costDb = await idb.openCostsDB("costsdb", 1);
                setDb(costDb); // Set the database object in state
            } catch (error) {
                console.error("Failed to open database", error);
            }
        };

        initializeDB();
        console.log("i am here")
    }, []);
    return (
        <div className="App">
            <header>
                <h1>HIT Client Project</h1>
            </header>
            <div className="main-content">
                <AddCost />
                <GetDataByMonthYear />
            </div>
            <footer>
                &copy; 2024 My Company. All rights reserved to Adi Levi and Jeki Skif.
            </footer>
        </div>
    );
}

export default App;
