import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import PageButton from '../components/pageButton/pageButton';
import axios from 'axios';

const DataGuru = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [TableItems, setTableItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // Fetch data from GraphQL API
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.post('http://localhost:1337/graphql', {
                    query: `
                    query getTeachers{
                        usersPermissionsUsers(filters: {accountType: {eq: "teacher"}}){
                          data{
                            attributes{
                              nama
                              teaching{
                                data{
                                  attributes{
                                    subject{
                                      data{
                                        attributes{
                                          nama
                                        }
                                      }
                                    }
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
                const teachersData = response.data.data.usersPermissionsUsers.data.map(user => ({
                    namaGuru: user.attributes.nama,
                    mataPelajaran: user.attributes.teaching.data.attributes.subject.data.attributes.nama,
                }));

                setTableItems(teachersData);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
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
            item.namaGuru.toLowerCase().includes(newValue.toLowerCase())
        );

        setItemsForPage(filteredItems.slice(0, itemsPerPage));
        setCurrentPage(1); // Reset to the first page of the filtered results
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const namaGuru = event.target.namaGuru.value;
        const mataPelajaran = event.target.mataPelajaran.value;
        const kelas = event.target.kelas.value;

        const newItem = {
            namaGuru,
            mataPelajaran,
            kelas
        };

        setTableItems([...TableItems, newItem]);
        setIsAdding(false);
    };

    return (
        <MainLayout>
            <>
                <div className='flex flex-col gap-5 w-full'>
                    <h1>Data Guru</h1>
                    <div className='flex w-full'>
                        <input
                            placeholder='Cari Nama Guru'
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="border rounded px-4 py-2"
                        />
                        {/* <button onClick={handleAddClick} className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Tambah Data Guru +
                        </button> */}
                    </div>

                    <div>
                        <table className="table-auto w-full">
                            <thead className="bg-orange-500 text-white">
                                <tr>
                                    <th className="px-4 py-2">No</th>
                                    <th className="px-4 py-2">Nama Guru</th>
                                    <th className="px-4 py-2">Mata Pelajaran</th>
                                    {/* <th className="px-4 py-2">Aksi</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {itemsForPage.map((item, index) => (
                                    <tr key={index} className="text-center border">
                                        <td className="px-4 py-2">{startIndex + index + 1}</td>
                                        <td className="px-4 py-2">{item.namaGuru}</td>
                                        <td className="px-4 py-2">{item.mataPelajaran}</td>
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
        // <MainLayout>
        //     {isAdding ? (
        //         <div className="bg-white rounded flex flex-col">
        //             <h2 className="mb-4 font-bold text-lg">Tambah Data Guru</h2>
        //             <form onSubmit={handleFormSubmit}>
        //                 <div className="mb-4">
        //                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaGuru">
        //                         Nama Guru
        //                     </label>
        //                     <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' id="namaGuru" />
        //                 </div>
        //                 <div className="mb-4">
        //                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mataPelajaran">
        //                         Mata Pelajaran
        //                     </label>
        //                     <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' id="mataPelajaran" />
        //                 </div>
        //                 <div className="flex items-center justify-between">
        //                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        //                         Simpan
        //                     </button>
        //                     <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={() => setIsAdding(false)}>
        //                         Kembali
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     ) : (
        //         <>
        //             <div className='flex flex-col gap-5 w-full'>
        //                 <h1>Data Guru</h1>
        //                 <div className='flex w-full'>
        //                     <input
        //                         placeholder='Cari Nama Guru'
        //                         value={searchTerm}
        //                         onChange={handleInputChange}
        //                         className="border rounded px-4 py-2"
        //                     />
        //                     <button onClick={handleAddClick} className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
        //                         Tambah Data Guru +
        //                     </button>
        //                 </div>

        //                 <div>
        //                     <table className="table-auto w-full">
        //                         <thead className="bg-orange-500 text-white">
        //                             <tr>
        //                                 <th className="px-4 py-2">No</th>
        //                                 <th className="px-4 py-2">Nama Guru</th>
        //                                 <th className="px-4 py-2">Mata Pelajaran</th>
        //                                 <th className="px-4 py-2">Aksi</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {itemsForPage.map((item, index) => (
        //                                 <tr key={index} className="text-center border">
        //                                     <td className="px-4 py-2">{startIndex + index + 1}</td>
        //                                     <td className="px-4 py-2">{item.namaGuru}</td>
        //                                     <td className="px-4 py-2">{item.mataPelajaran}</td>
        //                                     {/* <td className="px-4 py-2">
        //                                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
        //                                         <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Hapus</button>
        //                                     </td> */}
        //                                 </tr>
        //                             ))}
        //                         </tbody>
        //                     </table>
        //                 </div>
        //                 <div>
        //                     <PageButton currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        //                 </div>
        //             </div>
        //         </>
        //     )}
        // </MainLayout>
    );
};

export default DataGuru;
