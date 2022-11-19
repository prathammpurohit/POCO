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
      let len = sheet_data[0].length;
      let dum = new Array(len);
      for (let i = 0; i < len; i++) dum[i] = new Array();
      for (let z = 0; z < sheet_data[0].length; z++) {
        for (let k = 1; k < sheet_data.length; k++)
          dum[z].push(sheet_data[k][z]);
      }
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
      var xValues = dum[1];
      var yValues = dum[2];

      new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              fill: false,
              lineTension: 0,
              backgroundColor: "#6C4AB6",
              borderColor: "#8D72E1 ",
              data: yValues,
            },
          ],
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [{ ticks: { min: 0, max:1000} }],
          },
        },
      });
      new Chart("myChart2", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: '#6C4AB6',
            data: yValues
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: ""
          }
        }
      });
    }
    excel_file.value = sheet_name;
  };
});
