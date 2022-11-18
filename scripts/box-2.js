const excel_file = document.getElementById("excel_file");

excel_file.addEventListener("change", (event) => {
  if (
    ![
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ].includes(event.target.files[0].type)
  ) {
    document.getElementById("excel_data").innerHTML =
      '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';

    excel_file.value = "";

    return false;
  }

  let reader = new FileReader();

  reader.readAsArrayBuffer(event.target.files[0]);

  reader.onload = function (event) {
    let data = new Uint8Array(reader.result);

    let work_book = XLSX.read(data, { type: "array" });

    let sheet_name = work_book.SheetNames;

    let sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {
      header: 1,
    });

    if (sheet_data.length > 0) {
      let table_output = '<table class="table table-striped table-bordered">';
 
      for (let row = 0; row < sheet_data.length; row++) {
        table_output += "<tr>";

        for (let cell = 0; cell < sheet_data[row].length; cell++) {
          if (row === 0) {
            table_output += "<th>" + sheet_data[row][cell] + "</th>";
          } else {
            table_output += "<td>" + sheet_data[row][cell] + "</td>";
          }

        }

        table_output += "</tr>";
      }

      table_output += "</table>";
      

      document.getElementById("excel_data").innerHTML = table_output;
      document.getElementById("excel_data").style.backgroundColor = "#B9E0FF";
    }
    excel_file.value = sheet_name;
  };
});
