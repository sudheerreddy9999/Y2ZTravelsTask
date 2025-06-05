"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableItem from "./TravelItem";
import MobileMapOverlay from "../Maps/MobileMapsOverView";
import TravelJson from "../../Jsons/locations.json";
import GoogleMapComponent from "../Maps/GoogleMapComponent";
import Header from "../Header/Header";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

type Place = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  actions: {
    location: boolean;
    pin: boolean;
    edit: boolean;
    delete: boolean;
  };
  tag?: string;
};

export default function SortableContainer() {
  const [items, setItems] = useState<Place[]>(TravelJson.places);
  const [selectedPlace, setSelectedPlace] = useState<Place>(items[0]);
  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
    }
  };

  const handleMapClick = (place: Place) => {
    setSelectedPlace(place);
    if (window.innerWidth < 640) {
      setIsMobileMapOpen(true);
    }
  };

  const handleUpdateDescription = (id: number, newDesc: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, description: newDesc } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex w-full h-screen">
      <div className="sm:w-1/2 overflow-y-auto mx-3 scrollbar-hide">
        <div className="sticky top-0 bg-white z-10">
          <Header />
                  <div className=" m-3 sm:m-6 mt-0">
          <h1 className="text-black font-bold text-2xl">Itinerary</h1>
          <p>Day</p>
        </div>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((place) => (
              <SortableItem
                key={place.id}
                id={place.id}
                place={place}
                onMapClick={() => handleMapClick(place)}
                onDelete={() => handleDelete(place.id)}
                isSelected={selectedPlace.id === place.id}
                onUpdateDescription={handleUpdateDescription}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="hidden sm:block sm:w-1/2">
        <GoogleMapComponent apiKey={apiKey} placeName={selectedPlace.name} />
      </div>
      <MobileMapOverlay
        isOpen={isMobileMapOpen}
        onClose={() => setIsMobileMapOpen(false)}
        placeName={selectedPlace.name}
        apiKey={apiKey}
      />
    </div>
  );
}
