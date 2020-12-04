fetch('http://dummy.restapiexample.com/api/v1/employees')
 .then(response => response.json())
 .then(responseData => {

    /*JSON TO MATRIX*/
    let matrix = [];
    let keys = [];
    responseData.data.forEach(d => {
        let row = [];
        for (const [key, value] of Object.entries(d)) {
            row.push(value);
            keys.push(key);
        }
        matrix.push(row)
    });
    console.log(matrix);


    //DISPLAY TO HTML PAGE

    let region1 =  document.getElementById('region1');
    let table1 = document.createElement('table');

    keys = [...new Set(keys)]
    keys.pop();
    let table1HeadTr = document.createElement('tr');
    keys.forEach(key => {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        table1HeadTr.appendChild(th);
    });

    table1.appendChild(table1HeadTr);
    table1.setAttribute("border", "solid red 1px");
    
    for(let row in matrix) {
        let tr = document.createElement('tr'); 
        matrix[row].pop();
        for(let column in matrix[row]) {
            let td  = document.createElement('td');
            let text = document.createTextNode(matrix[row][column]);
            td.appendChild(text);
            tr.appendChild(td);
        }
        table1.appendChild(tr);
    }
    region1.appendChild(table1);


    /*MATRIX TO JSON*/
    let jsonData = [];
    matrix.forEach(row => {
        let myObject = {}
        keys.forEach((key, i) => myObject[key] = row[i]);
        jsonData.push(myObject);
    });
    let myJsonData = JSON.stringify(jsonData);
    console.log(myJsonData);

    /*DISPLAY TO HTML PAGE*/

    let region2 =  document.getElementById('region2');
    let table2 = document.createElement('table');

    let table2HeadTr = document.createElement('tr');
    keys.forEach(key => {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        table2HeadTr.appendChild(th);
    });

    table2.appendChild(table2HeadTr);
    table2.setAttribute("border", "solid red 1px");
    jsonData.forEach(data => {
        let tr = document.createElement('tr'); 
        table2.appendChild(tr);
        keys.forEach(key => {
            let td  = document.createElement('td');
            let text = document.createTextNode(data[key]);
            td.appendChild(text);
            tr.appendChild(td);
        });
    });
    region2.appendChild(table2);
  });