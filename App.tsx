import React, { useState, useEffect } from 'react';
import './App.css';
import DateSelector from './components/DateSelector';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';

interface DataItem {
  date: string;
  country: string;
  adults: number;
  children: number;
  babies: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);  // Holds the entire dataset
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);  // Holds the filtered data

  // Handle date changes and filter data based on selected date range
  const handleDateChange = (start: Date, end: Date) => {
    const filtered = data.filter((d: DataItem) => {
      const date = new Date(d.date);
      return date >= start && date <= end;
    });
    setFilteredData(filtered);
  };

  // Mock API call to fetch the hotel booking data
  useEffect(() => {
    const fetchData = async () => {
      // Replace with your actual data fetch logic, e.g., API call or file read
      const response = await fetch('/data/hotel_bookings.json');  // Assumed path to the JSON file
      const result: DataItem[] = await response.json();
      setData(result);
      setFilteredData(result);  // Initially show all data
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Hotel Booking Dashboard</h1>
      
      {/* Date Selector Component */}
      <DateSelector onDateChange={handleDateChange} />

      {/* Charts */}
      <div className="charts-container">
        <TimeSeriesChart data={filteredData} />
        <ColumnChart data={filteredData} />
        <div className="sparkline-charts">
          <SparklineChart data={filteredData} title="Adults" type="adults" />
          <SparklineChart data={filteredData} title="Children" type="children" />
        </div>
      </div>
    </div>
  );
};

export default App;
