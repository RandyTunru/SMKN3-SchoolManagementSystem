import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import PageButton from '../components/pageButton/pageButton';
import axios from 'axios';

const sortClasses = (classA, classB) => {
    const parseClass = (kelas) => {
        const parts = kelas.split(' ');
        const grade = parts[0]; // "X", "XI", etc.
        const major = parts[1]; // "RPL"
        const section = parts[2]; // "A", "B", etc.

        // Convert the Roman numerals to numbers for comparison
        const romanToNum = {
            'X': 10,
            'XI': 11,
            'XII': 12
        };

        return {
            grade: romanToNum[grade],
            major,
            section
        };
    };

    const classAParsed = parseClass(classA);
    const classBParsed = parseClass(classB);

    if (classAParsed.grade !== classBParsed.grade) {
        return classAParsed.grade - classBParsed.grade;
    } else if (classAParsed.major !== classBParsed.major) {
        return classAParsed.major.localeCompare(classBParsed.major);
    } else {
        return classAParsed.section.localeCompare(classBParsed.section);
    }
};

const DataSiswa = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [TableItems, setTableItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // Fetch data from GraphQL API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                    query getStudents{
                        students{
                          data{
                            id
                            attributes{
                              nama
                              class{
                                data{
                                  attributes{
                                    nama
                                    grade
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    `,
                });

                console.log(response)
                const studentsData = response.data.data.students.data.map(student => ({
                    namaSiswa: student.attributes.nama,
                    kelas: student.attributes.class.data.attributes.nama,
                    grade: student.attributes.class.data.attributes.grade
                })).sort((studentA, studentB) => sortClasses(studentA.kelas, studentB.kelas));

                console.log(studentsData);

                setTableItems(studentsData);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    // Calculate the total pages based on TableItems length
    const totalPages = Math.ceil(TableItems.length / itemsPerPage);

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, TableItems.length);

    // Slice the TableItems array to get the items for the current page
    const [itemsForPage, setItemsForPage] = useState(TableItems.slice(startIndex, endIndex));

    // Recalculate itemsForPage whenever TableItems or currentPage changes
    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, TableItems.length);
        setItemsForPage(TableItems.slice(start, end));
    }, [TableItems, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSearchTerm(newValue);

        const filteredItems = TableItems.filter((item) =>
            item.namaSiswa.toLowerCase().includes(newValue.toLowerCase())
        );

        setItemsForPage(filteredItems.slice(0, itemsPerPage));
        setCurrentPage(1); // Reset to the first page of the filtered results
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const namaSiswa = event.target.namaSiswa.value;
        const kelas = event.target.kelas.value;

        const newItem = {
            namaSiswa,
            kelas
        };

        setTableItems([...TableItems, newItem]);
        setIsAdding(false);
    };

    return (
        <MainLayout>
            <>
                <div className='flex flex-col gap-5 w-full'>
                    <h1>Data Siswa</h1>
                    <div className='flex w-full'>
                        <input
                            placeholder='Cari Nama Siswa'
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="border rounded px-4 py-2"
                        />
                        {/* <button onClick={handleAddClick} className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Tambah Data Siswa +
                        </button> */}
                    </div>

                    <div>
                        <table className="table-auto w-full">
                            <thead className="bg-orange-500 text-white">
                                <tr>
                                    <th className="px-4 py-2">No</th>
                                    <th className="px-4 py-2">Nama Siswa</th>
                                    <th className="px-4 py-2">Kelas</th>
                                    <th className="px-4 py-2">Grade</th>
                                    {/* <th className="px-4 py-2">Aksi</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {itemsForPage.map((item, index) => (
                                    <tr key={index} className="text-center border">
                                        <td className="px-4 py-2">{startIndex + index + 1}</td>
                                        <td className="px-4 py-2">{item.namaSiswa}</td>
                                        <td className="px-4 py-2">{item.kelas}</td>
                                        <td className="px-4 py-2">{item.grade}</td>
                                        {/* <td className="px-4 py-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Hapus</button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <PageButton currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </>
        </MainLayout>
    );
};

export default DataSiswa;
