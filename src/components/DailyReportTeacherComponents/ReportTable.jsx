import React, {useState} from 'react';
import { useTable } from 'react-table';
import { ImCancelCircle } from "react-icons/im";
import '../DailyReportTeacherComponents/ReportTable.css';

const ReportTable = ({ columns }) => {
  const [data, setData] = useState([]); // State untuk menyimpan data tabel
  const [formData, setFormData] = useState({}); // State untuk menyimpan data input
  const [showInputs, setShowInputs] = useState(false); // State untuk menampilkan input sheet
  const [file, setFile] = useState(null); // State untuk menyimpan file

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk menutup sheet input data
  const handleCloseSheet = () => {
    setShowInputs(false);
  };

  // Fungsi untuk menambahkan data ke dalam tabel
  const addData = () => {
    // Menentukan nomor otomatis sesuai dengan indeks i
    const newData = { ...formData, number: data.length + 1 };
    setData([...data, newData]); // Menambahkan data baru ke dalam state data
    setFormData({}); // Mereset state formData setelah data ditambahkan
    setFile(null); // Mereset state file setelah data ditambahkan
    setShowInputs(false); // Menyembunyikan input sheet setelah data ditambahkan
  };

  // Fungsi untuk menangani upload file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  // React Table hook untuk membuat tabel
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <div className="table-container">
      {/* Tampilkan tabel */}
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Tampilkan sheet input saat tombol "Add Data" diklik */}
      <div>
        <button onClick={() => setShowInputs(true)} className='add-button'>Add Data</button>
        {showInputs && (
          <div className="sheet-overlay">
            <div className="sheet-container">
              <div className="upper-side-sheet" >
              <h2>Tambah Data Laporan</h2>
              <ImCancelCircle className='cancel-icon'  onClick={handleCloseSheet} />
              </div>
              {/* Nomor otomatis sesuai dengan indeks i */}
              {/*
              <input
                type="text"
                name="number"
                placeholder="Nomor"
                value={data.length + 1} // Nomor otomatis
                readOnly // Set input menjadi hanya baca
              />
        */}
              {/* Sisa input data */}
              <input
                className='input-box'
                type="text"
                name="description"
                placeholder="Deskripsi"
                value={formData.description || ''}
                onChange={handleInputChange}
              />
              <input
                className='input-box'
                type="text"
                name="class"
                placeholder="Kelas"
                value={formData.class || ''}
                onChange={handleInputChange}
              />
              <input
                className='input-box'
                type="text"
                name="start"
                placeholder="Waktu Mulai"
                value={formData.start || ''}
                onChange={handleInputChange}
              />
              <input
                className='input-box'
                type="text"
                name="end"
                placeholder="Waktu Selesai"
                value={formData.end || ''}
                onChange={handleInputChange}
              />
              {/* Tambahkan input untuk upload file */}
              <input type="file" accept="application/pdf" onChange={handleFileUpload} />
              {/* Tambahkan tombol untuk menambahkan data */}
              <button onClick={addData}>Add Data</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportTable;