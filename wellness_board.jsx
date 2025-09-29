import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function App() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ age: "", gender: "", goal: "" });
  const [selectedTip, setSelectedTip] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Sample static data (replace with AI API call)
  const sampleData = {
    profile: { age: 24, gender: "Male", goal: "Better Sleep" },
    tips: [
      {
        title: "Digital Detox Hour",
        short_description: "Avoid screens 1 hour before bedtime.",
        icon: "📵",
        long_explanation:
          "Exposure to screens before sleep can disrupt melatonin production and delay deep rest. Taking a digital detox helps your brain prepare for natural sleep.",
        steps: [
          "Set an alarm to remind yourself to log off devices.",
          "Switch to calming activities like reading or journaling.",
          "Keep your phone out of reach near bedtime."
        ],
        motivation: "Your body deserves a tech-free reset every night."
      },
      {
        title: "Warm Bedtime Drink",
        short_description: "Sip warm herbal tea before bed.",
        icon: "🍵",
        long_explanation:
          "Herbal teas like chamomile or lavender have natural calming effects that relax the nervous system, making it easier to fall asleep.",
        steps: [
          "Brew a caffeine-free herbal tea 30 minutes before bed.",
          "Drink slowly while practicing mindful breathing.",
          "Avoid adding sugar to keep it calming."
        ],
        motivation: "A warm drink signals your body it’s time to rest."
      }
    ]
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSaveFavorite = (tip) => {
    if (!favorites.find((f) => f.title === tip.title)) {
      setFavorites([...favorites, tip]);
      alert("Saved to favorites ✅");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        {step === 1 && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <h1 className="text-xl font-bold mb-2">Enter Your Profile</h1>
            <input
              type="number"
              placeholder="Age"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Your Goal (e.g., Better Sleep)"
              value={profile.goal}
              onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
              className="w-full border rounded p-2"
              required
            />
            <Button type="submit" className="w-full">
              Generate Tips
            </Button>
          </form>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-xl font-bold mb-4">Your Wellness Tips</h1>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {sampleData.tips.map((tip, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md"
                  onClick={() => {
                    setSelectedTip(tip);
                    setStep(3);
                  }}
                >
                  <CardContent className="flex items-center gap-3 p-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h2 className="font-semibold">{tip.title}</h2>
                      <p className="text-sm text-gray-600">
                        {tip.short_description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setStep(4)}
            >
              View Favorites
            </Button>
          </div>
        )}

        {step === 3 && selectedTip && (
          <div>
            <h1 className="text-xl font-bold mb-2 flex items-center gap-2">
              {selectedTip.icon} {selectedTip.title}
            </h1>
            <p className="text-gray-700 mb-3">{selectedTip.long_explanation}</p>
            <ol className="list-decimal list-inside mb-3 space-y-1">
              {selectedTip.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <p className="italic text-green-700">{selectedTip.motivation}</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => handleSaveFavorite(selectedTip)}>
                Save Tip
              </Button>
              <Button variant="outline" onClick={() => setStep(2)}>
                Back to Tips
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-xl font-bold mb-4">Your Favorites</h1>
            {favorites.length === 0 ? (
              <p className="text-gray-600">No favorites saved yet.</p>
            ) : (
              <div className="space-y-3">
                {favorites.map((tip, i) => (
                  <Card key={i}>
                    <CardContent className="flex items-center gap-3 p-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div>
                        <h2 className="font-semibold">{tip.title}</h2>
                        <p className="text-sm text-gray-600">
                          {tip.short_description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <Button variant="outline" className="mt-4 w-full" onClick={() => setStep(2)}>
              Back to Tips
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
