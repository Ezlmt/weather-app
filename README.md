# Weather Application

## Project Overview
This project is a comprehensive weather application that fulfills both Technical Assessment 1 and Technical Assessment 2 requirements. The application provides real-time weather information, forecasts, and allows users to manage weather records through a database.

## Features

### Tech Assessment 1 ✅
- **Location Input**
  - Support multiple location formats:
    - City name
    - ZIP/Postal code
    - GPS coordinates
  - Current location detection using browser geolocation
- **Weather Display**
  - Current temperature
  - Humidity
  - Weather description
  - Real-time data from OpenWeatherMap API
- **5-Day Forecast**
  - Daily temperature forecasts
  - Weather conditions
  - Humidity levels
- **Responsive Design**
  - Clean and intuitive interface
  - Mobile-friendly layout

### Tech Assessment 2 ✅

#### 2.1 CRUD Operations
- **Create** ✅
  - Add weather records with date, temperature, and humidity
  - Input validation for dates and locations
  - Data persistence in database
- **Read** ✅
  - View all stored weather records
  - Historical weather data access
- **Update** ✅
  - Modify existing weather records
  - Validation for updated data
- **Delete** ✅
  - Remove weather records from database

#### 2.2 Data Export ✅
- Export weather records in multiple formats:
  - JSON format
  - CSV format

## Technical Stack
- **Frontend**
  - React
  - TypeScript
  - TailwindCSS
- **API Integration**
  - OpenWeatherMap API
- **State Management**
  - React Query
  - React Hooks
- **Database**
  - Local storage with IndexedDB

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm start
```

## Development Log

### [UTC: 2024-01-17T12:00:00Z]
- Initial project setup
- Implemented basic weather search functionality
- Added current location detection
- Integrated OpenWeatherMap API

### [UTC: 2024-01-17T14:00:00Z]
- Added 5-day forecast feature
- Implemented weather records CRUD operations
- Added data export functionality (JSON, CSV)
- Completed responsive design implementation

## Testing Checklist
- [x] Location search functionality
- [x] Current location detection
- [x] Weather data display
- [x] 5-day forecast display
- [x] Weather records creation
- [x] Weather records viewing
- [x] Weather records updating
- [x] Weather records deletion
- [x] Data export - JSON format
- [x] Data export - CSV format
- [x] Responsive design
- [x] Error handling
- [x] Input validation

## Future Enhancements
1. Integration with additional APIs (Google Maps, YouTube)
2. More export formats (PDF, XML, Markdown)
3. User authentication and personalized weather tracking
4. Weather alerts and notifications
5. Historical weather data visualization

## License
MIT License

## Acknowledgments
- OpenWeatherMap API for weather data
- React community for excellent tools and libraries 