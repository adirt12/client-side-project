
const idb= {

    db:null,

    openCostsDB: async (dbName, dbVersion) => {
        if (!idb.db) {
            idb.db = await new Promise((resolve, reject) => {
                const DBOpenRequest = window.indexedDB.open(dbName, dbVersion);

                DBOpenRequest.onupgradeneeded = (e) => {
                    const db = e.target.result;
                    db.createObjectStore('costs', {keyPath: 'id', autoIncrement: true});
                };

                DBOpenRequest.onsuccess = (e) => {
                    console.log("open success");
                    resolve(e.target.result); // Resolve with the database object
                };

                DBOpenRequest.onerror = (e) => {
                    console.log("failed to open");
                    reject(e.target.error); // Reject with the error
                };
            });
        }
        return idb;
    },

    addCost:async({name, sum, category, description}) => {
        const request = await idb.openCostsDB("costsdb",1);
        //const request = await window.indexedDB.open("costsdb",1);

        return new Promise((resolve, reject) => {
            //request.onsuccess = (e) => {
            //const db = request.target.result;
            const transaction = request.db.transaction(['costs'], 'readwrite');
            const objectStore = transaction.objectStore('costs');

            const currentDate = new Date();
            const dateTime = currentDate.toLocaleString();

            // const day = new Date(dateTime).getDate();
            const month = new Date(dateTime).getMonth() + 1;
            const year = new Date(dateTime).getFullYear();

            //alert(`dateTime : ${dateTime} , day : ${day} , month : ${month} , year : ${year} `)

            const requestAdd = objectStore.add({
                name: name,
                sum : sum,
                category: category,
                description: description,
                month: month,
                year: year
            });

            requestAdd.onsuccess = () => {
                console.log("Cost added successfully");
                resolve("Cost added successfully");
            };

            requestAdd.onerror = () => {
                console.log("Error adding cost");
                reject("Error adding cost");
            };
            //}
        });
    },

    getDataByMonth:async(month, year) => {
        return new Promise((resolve, reject) => {
            const tableData = [];
            const request = window.indexedDB.open("costsdb",1);
            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction("costs", "readwrite");
                const objectStore = transaction.objectStore("costs");

                const request = objectStore.getAll();

                request.onsuccess = function (e) {
                    e.target.result.forEach(function (data) {
                        if (
                            JSON.stringify(data.month) === month &&
                            JSON.stringify(data.year) === year
                        ) {
                            tableData.push(data);
                        }
                    });
                    resolve(tableData);
                };
            };

            request.onerror = (e) => {
                reject("Failed to fetch data");
            };
        });
    }
};


//window.idb =idb;
export default idb;
