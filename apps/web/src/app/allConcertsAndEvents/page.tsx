'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaMusic, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

type Event = {
  id: number;
  date: string;
  title: string;
  artist: string;
  location: string;
  venue: string;
  genre: string;
  status: 'available' | 'sold out';
};

const events: Event[] = [
  {
    id: 1,
    date: '2025-05-10',
    title: 'The Click 2025 Tour in Singapore',
    artist: 'The Click Five',
    location: 'Singapore',
    venue: 'Capitol Theatre',
    genre: 'Pop Rock',
    status: 'available'
  },
  {
    id: 2,
    date: '2025-05-11',
    title: 'J-hope Tour \'HOPE ON THE STAGE\' in BANGKOK',
    artist: 'J-hope',
    location: 'Bangkok',
    venue: 'Impact Arena, Muang Thong Thani',
    genre: 'K-Pop',
    status: 'available'
  },
  {
    id: 3,
    date: '2025-05-18',
    title: 'BE-FIRST World Tour 2025 "Who is BE-FIRST?"',
    artist: 'BE-FIRST',
    location: 'Taipei',
    venue: 'Zepp New Taipei',
    genre: 'J-Pop',
    status: 'available'
  },
  {
    id: 4,
    date: '2025-05-24',
    title: '2025 BABYMONSTER 1st WORLD TOUR <HELLO MONSTERS> IN SINGAPORE',
    artist: 'BABYMONSTER',
    location: 'Singapore',
    venue: 'Singapore Indoor Stadium',
    genre: 'K-Pop',
    status: 'sold out'
  },
  {
    id: 5,
    date: '2025-05-25',
    title: 'Alexander Stewart: the bleeding hearts tour',
    artist: 'Alexander Stewart',
    location: 'Singapore',
    venue: 'Esplanade Annexe Studio',
    genre: 'Pop',
    status: 'available'
  }
];

const locations = ['All Locations', 'Singapore', 'Bangkok', 'Taipei', 'Hong Kong', 'Daegu'];
const genres = ['All Genres', 'Pop', 'Rock', 'K-Pop', 'J-Pop', 'Hip-Hop', 'Electronic'];

export default function AllConcertsEvents() {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showGenreFilter, setShowGenreFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesDate = !selectedDate || event.date === selectedDate;
    const matchesLocation = selectedLocation === 'All Locations' || event.location === selectedLocation;
    const matchesGenre = selectedGenre === 'All Genres' || event.genre === selectedGenre;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.artist.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDate && matchesLocation && matchesGenre && matchesSearch;
  });

  const uniqueDates = [...new Set(events.map(event => event.date))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Concerts & Events</h1>
        
        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events or artists..."
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Date Filter */}
            <div className="relative w-full md:w-48">
              <button
                onClick={() => setShowDateFilter(!showDateFilter)}
                className="flex items-center justify-between w-full p-2 border rounded-md bg-white"
              >
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-600" />
                  <span>{selectedDate ? formatDate(selectedDate) : 'Date'}</span>
                </div>
                {showDateFilter ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showDateFilter && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  <div 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedDate(null);
                      setShowDateFilter(false);
                    }}
                  >
                    All Dates
                  </div>
                  {uniqueDates.map(date => (
                    <div
                      key={date}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedDate(date);
                        setShowDateFilter(false);
                      }}
                    >
                      {formatDate(date)}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Location Filter */}
            <div className="relative w-full md:w-48">
              <button
                onClick={() => setShowLocationFilter(!showLocationFilter)}
                className="flex items-center justify-between w-full p-2 border rounded-md bg-white"
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-600" />
                  <span>{selectedLocation}</span>
                </div>
                {showLocationFilter ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showLocationFilter && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {locations.map(location => (
                    <div
                      key={location}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationFilter(false);
                      }}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Genre Filter */}
            <div className="relative w-full md:w-48">
              <button
                onClick={() => setShowGenreFilter(!showGenreFilter)}
                className="flex items-center justify-between w-full p-2 border rounded-md bg-white"
              >
                <div className="flex items-center">
                  <FaMusic className="mr-2 text-gray-600" />
                  <span>{selectedGenre}</span>
                </div>
                {showGenreFilter ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showGenreFilter && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {genres.map(genre => (
                    <div
                      key={genre}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedGenre(genre);
                        setShowGenreFilter(false);
                      }}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{filteredEvents.length} RESULTS</h2>
        </div>
        
        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Event Date */}
                <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg min-w-[80px]">
                  <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
                  <span className="text-sm">{formatMonthYear(event.date)}</span>
                </div>
                
                {/* Event Details */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.artist}</p>
                  <p className="text-gray-600 mb-4">
                    {event.location} | {event.venue}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 items-center">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {event.genre}
                    </span>
                    {event.status === 'sold out' ? (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        Sold Out
                      </span>
                    ) : (
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
                        Find Tickets
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Follow Live Nation for News, Presales and Exclusive Deals!</h3>
          <p className="mb-4">Track your favourite artists, pre purchase tickets, and never miss a show!</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition">
            Sign Me Up!
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatMonthYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}