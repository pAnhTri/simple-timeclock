import { read } from "xlsx";

const WorksheetReader = () => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: "binary" });

        // Get the first worksheet
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        console.log(firstSheet);

        for (let i = 12; i < 27; i++) {
          const cell = firstSheet[`A${i}`];
          if (cell && cell.w && cell.w.includes("5/16")) {
            console.log("Row:", i, "Value:", cell.w);
            break;
          }
        }
      } catch (error) {
        console.error("Error reading XLSX file:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <h3>XLSX File Reader</h3>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </>
  );
};

export default WorksheetReader;
