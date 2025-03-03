"use client";
import { useEffect, useState } from "react";

export default function Scraper() {
  const [views, setViews] = useState(3827);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/scraper");
        const data = await response.json();
        if (response.ok) {
          setViews(data.views);
          console.log("Updated Views:", data.views);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
      setLoading(false);
    }, 2000); // Runs every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">GitHub Page Views</h1>
      <p className="text-xl mt-4">
        Current Views: <span className="font-semibold">{views}</span>
      </p>
      {loading && <p className="text-gray-500 mt-2">Updating...</p>}
    </div>
  );
}
