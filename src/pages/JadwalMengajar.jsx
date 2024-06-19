import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';

const periodToJadwal = {
  1: '07.00 - 08.30',
  2: '08.40 - 10.10',
  3: '10.20 - 11.50',
  4: '12.30 - 14.00',
  5: '14.10 - 15.40',
};

const JadwalMengajar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [day, setDay] = useState('Senin');
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teacher_id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post('http://localhost:1337/graphql', {
          query: `
            query getSchedulesForUser($id: ID!) {
              schedules(filters: { teaching: { users_permissions_user: { id: { eq: $id } } } }) {
                data {
                  id
                  attributes {
                    class {
                      data {
                        attributes {
                          nama
                        }
                      }
                    }
                    teaching {
                      data {
                        id
                        attributes {
                          users_permissions_user {
                            data {
                              id
                            }
                          }
                          subject {
                            data {
                              attributes {
                                nama
                              }
                            }
                          }
                        }
                      }
                    }
                    jadwal
                    hari
                  }
                }
              }
            }
          `,
          variables: {
            id: teacher_id,
          },
        });
        const fetchedData = response.data.data.schedules.data;
        setOriginalData(fetchedData);
        setData(fetchedData.filter(item => item.attributes.hari === day));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacher_id, day]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectDay = (selectedDay) => {
    setDay(selectedDay);
    setData(originalData.filter(item => item.attributes.hari === selectedDay));
    setIsDropdownOpen(false);
  };

  return (
    <MainLayout>
      <div className='flex flex-col gap-2'>
        <h1>Jadwal Mengajar</h1>

        <div className="relative flex flex-col w-48 mt-4">
          <div onClick={toggleDropdown} className="flex items-center cursor-pointer p-2">
            <h2 className="mr-2">{day}</h2>
            <IoMdArrowDropdown className="text-gray-600" size={30} />
          </div>
          {isDropdownOpen && (
            <div className="absolute mt-10 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul>
                <li onClick={() => selectDay('Senin')} className="p-2 hover:bg-gray-100 cursor-pointer">Senin</li>
                <li onClick={() => selectDay('Selasa')} className="p-2 hover:bg-gray-100 cursor-pointer">Selasa</li>
                <li onClick={() => selectDay('Rabu')} className="p-2 hover:bg-gray-100 cursor-pointer">Rabu</li>
                <li onClick={() => selectDay('Kamis')} className="p-2 hover:bg-gray-100 cursor-pointer">Kamis</li>
                <li onClick={() => selectDay('Jumat')} className="p-2 hover:bg-gray-100 cursor-pointer">Jumat</li>
              </ul>
            </div>
          )}
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        <div className='mb-3'>
          <table className="table-auto w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Mata Pelajaran</th>
                <th className="px-4 py-2">Jadwal</th>
                <th className="px-4 py-2">Kelas</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 h-[8vh]">{index + 1}</td>
                  <td className="border px-4 py-2 h-[8vh]">{item.attributes.teaching.data.attributes.subject.data.attributes.nama}</td>
                  <td className="border px-4 py-2 h-[8vh]">{periodToJadwal[item.attributes.jadwal]}</td>
                  <td className="border px-4 py-2 h-[8vh]">{item.attributes.class.data.attributes.nama}</td>
                  <td className="border px-4 py-2 h-[8vh] flex justify-center items-center">
                    <Link to={`/details/${item.id}`}>
                      <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Detail
                      </div>
                    </Link>
                    <Link to={`/attendance/${item.id}`}>
                      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                        Absen
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default JadwalMengajar;
