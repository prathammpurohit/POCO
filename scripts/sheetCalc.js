excel_file.addEventListener("change", (event) => {
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
      let len = sheet_data[0].length;
      let dum = new Array(len);
      for (let i = 0; i < len; i++) dum[i] = new Array();
      for (let z = 0; z < sheet_data[0].length; z++) {
        for (let k = 1; k < sheet_data.length; k++)
          dum[z].push(sheet_data[k][z]);
      }
      console.log(dum);
      
    }
    
  };
});
