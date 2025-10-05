import NavBar from "../components/navBar";
import { Card } from "../components/ui/card";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";

function HomeScreen() {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "March 15, 2024",
      location: "Convention Center",
      time: "9:00 AM",
      image: "/event1.jpg"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "April 20, 2024",
      location: "City Park",
      time: "4:00 PM",
      image: "/event2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="pt-16 px-6 lg:pl-72">
        <h1>{}</h1>
        <h1 className="text-2xl font-bold text-gray-800 my-6">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-[#800000]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-[#800000]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-[#800000]" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomeScreen;
