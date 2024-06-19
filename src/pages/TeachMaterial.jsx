import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { MainLayout } from '../layout/MainLayout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const grades = [10, 11, 12];

function TeachMaterial() {
  const [rpps, setRPPs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const fetchRPP = async () => {
    try {
      const response = await axios.post('http://localhost:1337/graphql', {
        query: `
          query getRPPs ($id: ID!){
            rpps (filters: {users_permissions_user: {id : {eq : $id}}}){
              data {
                id
                attributes {
                  grade
                  rpp {
                    data {
                      id
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: localStorage.getItem('id')
        }
      });
      console.log(response);
      setRPPs(response.data.data.rpps.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRPP();
  }, []);

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleEditReport = (item, grade) => {
    setIsEditing(true);
    if (item) {
      console.log(item);
      setEditData(item);
    }
    setSelectedGrade(grade);
  };

  const refreshData = () => {
    fetchRPP();
  };

  return (
    <MainLayout>
      <div className='flex flex-col gap-2'>
        {isEditing ? (
          <div
            className="fixed top-0 left-0 z-40 bg-black/50 w-[100vw] h-[100vh] flex justify-center items-center"
            onClick={() => setIsEditing(false)}
          >
            <div className='bg-white rounded-md w-[50%] h-[50%] px-5 py-2 flex justify-center items-center' onClick={handleStopPropagation}>
              <form
                className="bg-white rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const formData = new FormData(form);
                  if (editData) {
                    formData.append("refId", editData.id);
                    console.log(formData.get('refId'));
                    await axios.post(`http://localhost:1337/api/upload?id=${editData.attributes.rpp.data[0].id}`, formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    });
                    refreshData();
                    setEditData(null);
                  } else {
                    var teacherReport = null;
                    try {
                      console.log(localStorage.getItem('id'));
                      const response = await axios.post('http://localhost:1337/api/rpps', {
                        data: {
                          grade: selectedGrade,
                          users_permissions_user: parseInt(localStorage.getItem('id'), 10)
                        },
                      });
                      teacherReport = response.data.data;
                      console.log(teacherReport);
                    } catch (err) {
                      console.log(err);
                    }
                    formData.append("refId", teacherReport.id);
                    console.log(formData.get('refId'));
                    await axios.post('http://localhost:1337/api/upload', formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    });
                    refreshData();
                  }
                  setIsEditing(false);
                }}
              >
                <input type='hidden' name='ref' value="api::rpp.rpp"></input>
                <input type='hidden' name='refId'></input>
                <input type='hidden' name='field' value="rpp"></input>
                <input type='file' name='files' onClick={handleStopPropagation}></input>
                <input type="submit"></input>
              </form>
            </div>
          </div>
        ) : null}

        <h1>Daftar Kelas</h1>
        <div className='mb-3'>
          <table className="table-auto w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2 w-[50%]">Kelas</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((item, index) => {
                const data = rpps.filter(rpp => rpp.attributes.grade === item);
                console.log(data);
                return (
                  <tr key={item}>
                    <td className="border px-4 py-2 h-[8vh]">{index + 1}</td>
                    <td className="border px-4 py-2 h-[8vh]">{"Kelas " + item}</td>
                    {data.length === 0 ? (
                      <td className="border px-4 py-2 h-[8vh] flex justify-center items-center">
                        <button 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[100%]"
                          onClick={() => handleEditReport(null, item)}>
                          Tambah RPP
                        </button>
                      </td>
                    ) : (
                      <td className="border px-4 py-2 h-[8vh]">
                        <button 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[40%] text-sm"
                          onClick={() => handleEditReport(data[0], item)}>
                          Ubah RPP
                        </button>
                        <Link to={`http://localhost:1337${data[0].attributes.rpp.data[0].attributes.url}`}>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[10%] w-[50%] text-sm">
                            Buka RPP
                          </button>
                        </Link>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}

export default TeachMaterial;
