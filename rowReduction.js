import fs from "fs";
import readline from "readline";



async function rowReduce() {
  const linesArray = await processLineByLine('sampledata.csv');
  if(!linesArray){
    return;
  }

  const len = linesArray.length;

  let index = 0;

  for(let col = 0; col < len; col++){
    if(linesArray[index][col] == 0){
      console.log(linesArray)
    } else {
      linesArray[index] = linesArray[index].map((entry) => entry/linesArray[index][col]);
      console.log("1", linesArray)
      for (let row = 0; row < len; row++){
        if (row != index){
          linesArray[row] = linesArray[row].map((entry, i) => linesArray[row][i] - linesArray[index][i] * linesArray[row][col])
        }
        console.log("rows",linesArray)
      }
      index++;
    }
  }

  console.log(linesArray)
  
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

    linesArray.forEach((row, index) => {
      linesArray[index] = row.map((col) => parseFloat(col))
    })

    return linesArray
  }
  
  rowReduce()

