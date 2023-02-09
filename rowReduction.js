import fs from "fs";
import readline from "readline";



async function rowReduce() {
  // First load the array
  const linesArray = await processLineByLine('sampledata.csv');
  if(!linesArray){
    return;
  }

  // Find the number of rows and columns of the non-augmented matrix
  const numRows = linesArray.length;
  const numColumns = linesArray[0].length - 1;

  // This will be the row of the current pivot
  let pivotRow = 0;

  // Go through each column of the non-augmented matrix
  for(let col = 0; col < numColumns; col++){
    console.log(col);
    // Check if this is an acceptable pivot by not being 0
    if(linesArray[pivotRow][col] == 0){
      let row = pivotRow + 1;
      // Search through the rows for a pivot
      while(row < numRows){
        if(linesArray[row][col] == 0) {
          row++
        } else {
          break
        }
      }
      // If there is not a pivot in this column then go to the next column
      if (row == numRows){
        continue;
      }
      // Otherwise, there is a pivot so we need to swap
      const tempLine = linesArray[pivotRow];
      linesArray[pivotRow] = linesArray[row];
      linesArray[row] = tempLine;
    } 
    console.log("post swap", linesArray);
    // Now make the pivot equal to 1
    linesArray[pivotRow] = linesArray[pivotRow].map((entry) => entry/linesArray[pivotRow][col]);
    console.log("pivot is 1", linesArray)
    // Go through the rest of the column and make the values 0 by adding rows together
    for (let row = 0; row <numRows; row++){
      // Add multiple of one row to another as long as it's not the fixed row
      if (row != pivotRow){
        linesArray[row] = linesArray[row].map((entry, i) => linesArray[row][i] - linesArray[pivotRow][i] * linesArray[row][col])
      }
      console.log("rows",linesArray)
    }
    pivotRow++;
    
  }

  console.log("Row reduced echelon form", linesArray)
  
  
  
}



async function processLineByLine(filename) {
    const csvFile = fs.createReadStream(filename);
  
    const lines = readline.createInterface({
      input: csvFile,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    const linesArray = [];
    for await (const line of lines) {
     linesArray.push(line.split(','));
    }

    linesArray.forEach((row, pivotRow) => {
      linesArray[pivotRow] = row.map((col) => parseFloat(col))
    })

    return linesArray
  }
  
  rowReduce()

