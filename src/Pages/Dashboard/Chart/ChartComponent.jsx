import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Axios } from '../../../Api/axios';
import { baseUrl } from '../../../Api/Api';
import './chart.css';
import { useTranslation } from 'react-i18next';

const ChartComponent = () => {
  const [data, setData] = useState(null);
  const {i18n } = useTranslation();
  console.log(i18n.resolvedLanguage)
  const lan = i18n.resolvedLanguage;

  useEffect(() => {
    Axios.get(`${baseUrl}/dashboard-info`)
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const barData = Object.entries(data.table_counts)
    .filter(([key]) => !['password_reset_tokens', 'personal_access_tokens', 'terminology_categories', 'updates'].includes(key))
    .map(([key, value]) => ({
      name: key,
      count: value
    }));

  const pieDataFiles = [
    { name: 'Classifications', value: data.classifications_files_count },
    { name: 'Recents', value: data.recants_files_count },
    { name: 'Offices', value: data.offices_files_count }
  ];

  const pieDataUsers = [
    { name: 'Users', value: data.users_count },
    { name: 'Admins', value: data.admins_count }
  ];

  const COLORS = ['#004B1D', '#57886A', '#AEC4B6', '#ED7200'];

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    chartsWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    },
    barChartContainer: {
      width: '100%',
      marginBottom: '40px',
    },
    pieChartsContainer: {
      width: '100%',
      textAlign: 'center', // Center the pie charts
    },
    pieChartContainer: {
      width: '100%', // Full width by default
      marginBottom: '40px',
    },
    '@media (min-width: 768px)': {
      pieChartsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      pieChartContainer: {
        width: '45%', // Adjusted width for larger screens
        marginBottom: '0',
      },
    },
  };

  return (
    <>
      {lan === 'en' ? <div style={styles.container}>
        <div style={styles.chartsWrapper}>
          <div style={styles.barChartContainer}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={barData}
                margin={{
                  top: 5, right: 5, left: 40, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 12,
                    fontStyle: 'italic'
                  }}
                  label={{ value: 'Entities', position: 'insideBottom', offset: -5 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ED7200" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.pieChartsContainer}>
            <div style={styles.pieChartContainer}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieDataFiles}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataFiles.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="top" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={styles.pieChartContainer}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieDataUsers}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#82ca9d"
                    dataKey="value"
                  >
                    {pieDataUsers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="top" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>:
       <div style={styles.chartsWrapper} className='jj'>
       <div style={styles.barChartContainer}>
         <ResponsiveContainer width="100%" height={400}>
           <BarChart
             data={barData}
             margin={{
               top: 5, right: 5, left: 40, bottom: 5,
             }}
           >
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis
               dataKey="name"
               tick={{
                 fontSize: 12,
                 fontStyle: 'italic'
               }}
               label={{ value: 'Entities', position: 'insideBottom', offset: -5 }}
             />
             <YAxis />
             <Tooltip />
             <Legend />
             <Bar dataKey="count" fill="#ED7200" />
           </BarChart>
         </ResponsiveContainer>
       </div>
       <div style={styles.pieChartsContainer}>
         <div style={styles.pieChartContainer}>
           <ResponsiveContainer width="100%" height={250}>
             <PieChart>
               <Pie
                 data={pieDataFiles}
                 cx="50%"
                 cy="50%"
                 labelLine={false}
                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                 outerRadius={80}
                 fill="#8884d8"
                 dataKey="value"
               >
                 {pieDataFiles.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <Legend verticalAlign="top" height={36} />
             </PieChart>
           </ResponsiveContainer>
         </div>
         <div style={styles.pieChartContainer}>
           <ResponsiveContainer width="100%" height={250}>
             <PieChart>
               <Pie
                 data={pieDataUsers}
                 cx="50%"
                 cy="50%"
                 labelLine={false}
                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                 outerRadius={80}
                 fill="#82ca9d"
                 dataKey="value"
               >
                 {pieDataUsers.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <Legend verticalAlign="top" height={36} />
             </PieChart>
           </ResponsiveContainer>
         </div>
       </div>
     </div>
      
      }
    </>
  );
};

export default ChartComponent;
