import React, { useState, useEffect } from 'react';
import './WeatherRecords.css';
import { dbService } from '../services/dbService';

interface WeatherRecord {
    id: number;
    date: string;
    temperature: number;
    humidity: number;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

const WeatherRecords: React.FC = () => {
    const [records, setRecords] = useState<WeatherRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [newRecord, setNewRecord] = useState<Omit<WeatherRecord, 'id'>>({
        date: new Date().toISOString().split('T')[0],
        temperature: 0,
        humidity: 0,
        description: ''
    });

    const loadRecords = async () => {
        try {
            setLoading(true);
            const data = await dbService.getWeatherRecords();
            // Ensure all records have IDs
            const recordsWithIds = data.map(record => ({
                ...record,
                id: record.id || 0
            }));
            setRecords(recordsWithIds);
            setError('');
        } catch (err) {
            setError('Failed to load weather records');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecords();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewRecord(prev => ({
            ...prev,
            [name]: name === 'temperature' || name === 'humidity' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dbService.addWeatherRecord(newRecord);
            await loadRecords();
            setNewRecord({
                date: new Date().toISOString().split('T')[0],
                temperature: 0,
                humidity: 0,
                description: ''
            });
        } catch (err) {
            setError('Failed to add record');
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await dbService.deleteWeatherRecord(id);
            await loadRecords();
        } catch (err) {
            setError('Failed to delete record');
            console.error(err);
        }
    };

    const exportToJSON = () => {
        const dataStr = JSON.stringify(records, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'weather-records.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Date', 'Temperature', 'Humidity', 'Description'];
        const csvContent = [
            headers.join(','),
            ...records.map(record => [
                record.id,
                record.date,
                record.temperature,
                record.humidity,
                `"${record.description}"`
            ].join(','))
        ].join('\n');

        const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csvContent);
        const exportFileDefaultName = 'weather-records.csv';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="weather-records">
            <h2>Weather Records</h2>
            
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={newRecord.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="temperature">Temperature (°C)</label>
                    <input
                        type="number"
                        id="temperature"
                        name="temperature"
                        value={newRecord.temperature}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="humidity">Humidity (%)</label>
                    <input
                        type="number"
                        id="humidity"
                        name="humidity"
                        value={newRecord.humidity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newRecord.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add Record</button>
            </form>

            <div className="export-buttons">
                <button onClick={exportToJSON}>Export JSON</button>
                <button onClick={exportToCSV}>Export CSV</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature (°C)</th>
                        <th>Humidity (%)</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={record.id}>
                            <td>{record.date}</td>
                            <td>{record.temperature}</td>
                            <td>{record.humidity}</td>
                            <td>{record.description}</td>
                            <td>
                                <button onClick={() => handleDelete(record.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WeatherRecords; 