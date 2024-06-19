import React from 'react';
import { useTable } from 'react-table';



export const ReportTableForVice = ({columns, data}) => {
    const{
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
    <table  {...getTableProps()} style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: '1px solid black',
                  background: 'lightgray',
                  padding: '8px',
                  textAlign: 'left',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>

    

    

  
    
  )
}

export default ReportTableForVice
