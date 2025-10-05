import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import NavBar from "../components/navBar";
import { useAuth } from "../context/AuthContext";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  location: string;
  eventType: string;
  availableSeats: number;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8080/api/access/user/events", {
        method: "GET",
        credentials: "include", 
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch events");
      }

      const { data } = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
        console.log("Fetched events:", data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      console.error("Fetch error details:", err);
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="pt-16 px-6 lg:pl-72">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Events</h1>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-56 bg-gray-200">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-[#800000]" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-[#800000]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-[#800000]" />
                    <span>{event.availableSeats} seats available</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#800000]" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Events;
