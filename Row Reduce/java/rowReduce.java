import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class rowReduce {

  public static int calculateLines(String fileName) {
    BufferedReader reader;
    int numRows = 0;

    try {
      reader = new BufferedReader(new FileReader(fileName));
      String line = reader.readLine();

      while (line != null) {
        numRows++;
        // read next line
        line = reader.readLine();
      }

      reader.close();

    } catch (IOException e) {
      e.printStackTrace();
    }

    return numRows;
  }

  public static void main(String[] args) {
    String fileName = "sampledata.csv";

    int numberOfLines = calculateLines(fileName);

    String[] linesArray = new String[numberOfLines];

    BufferedReader reader;

    try {
      reader = new BufferedReader(new FileReader(fileName));
      String line = reader.readLine();

      for (int i = 0; i < numberOfLines; i++) {
        linesArray[i] = line;
        // read next line
        line = reader.readLine();
      }

      reader.close();

    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println(linesArray[2]);
  }
}
