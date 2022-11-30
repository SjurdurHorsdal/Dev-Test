import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Organizations, Rooms } from '../api/interfaces';

export const ExportToExcelUtil = (data: Organizations[], filename: string) => {
    const normalizedData = data.map((org) => {
        return {
            id: org.id,
            name: org.name,
            createdAt: org.createdAt,
            updatedAt: org.updatedAt,
            rooms: org.rooms.map((room: Rooms) => (room.name)).join(', ')
        }
    });
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExt = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(normalizedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(blob, filename + fileExt);
}