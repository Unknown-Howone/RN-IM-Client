const sqlite = require('react-native-sqlite-storage')

let sql = `CREATE TABLE IF NOT EXISTS t(namee TEXT,age  INT)`
function openCB() {}
function errorCB(err) {}

let db = sqlite.openDatabase("test.db", "1.0", "Test Database", 200000,openCB ,errorCB)
db.transaction((tx) => {
    tx.executeSql(sql,
        [],
        (tx, results) => {
            // alert("create")
        }
    )
},)

let sql1 = `insert into t values ("howone",20)`
db.transaction((tx) => {
    tx.executeSql(sql1,
        [],
        (tx, results) => {
            alert("insert")
        }
    )
},)

let sql2 = `select * from t`
db.transaction((tx) => {
    tx.executeSql(sql2,
        [],
        (tx, results) => {
            alert(results.rows.item(0).namee)
            alert(results.rows.item(0).age)
        }
    )
},)
