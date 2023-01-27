import fs from "fs";
import readline from "readline";



async function rowReduce() {
  const linesArray = await processLineByLine('sampledata.csv');
  if(!linesArray){
    return;
  }

  const len = linesArray.length;

  if(len > 0) {
    let index = 0
    let currentRow = linesArray[index];
    while(currentRow[0] == 0){
      index++;
      currentRow = linesArray[index]
    }
    linesArray[index] = linesArray[index].map((col) => col/linesArray[index][0])
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

