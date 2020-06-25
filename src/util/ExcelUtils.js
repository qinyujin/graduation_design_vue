/* eslint-disable no-unused-vars */
import xlsx from "xlsx";
export function readStudentFile(file) {
  console.log("a");
  return new Promise(resolve => {
    let students = [];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = event => {
      console.log("b");
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
        if (!isNaN(r.__EMPTY)) {
          let stu = {
            number: r.__EMPTY,
            name: r.__EMPTY_1,
            score: r.__EMPTY_9
          };
          students.push(stu);
        }
      });
    };
    return resolve(students);
  });
}
