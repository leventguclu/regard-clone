"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { models, Model } from "@/data/models";

function TryOnContent() {
  const searchParams = useSearchParams();
  const initialClothingUrl = searchParams.get("imageUrl");

  const [clothingImageUrl, setClothingImageUrl] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [showModelSelector, setShowModelSelector] = useState<boolean>(false);

  // Set initial clothing image URL from query params
  useEffect(() => {
    if (initialClothingUrl) {
      setClothingImageUrl(decodeURIComponent(initialClothingUrl));
    }
  }, [initialClothingUrl]);

  const handleSelectModel = (model: Model) => {
    setSelectedModel(model);
    setShowModelSelector(false); // Close selector after selection
  };

  const handleRun = () => {
    // Placeholder action for the Run button
    console.log("Run button clicked!");
    alert("Run process initiated (placeholder)!");
    // Later, this will trigger the iframe content generation
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Virtual Try-On</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
        {/* Clothing Item Display */}
        <div className="border p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-4">Clothing Item</h2>
          {clothingImageUrl ? (
            <div className="relative w-full h-[600px]">
              {" "}
              {/* Fixed height container */}
              <Image
                src={clothingImageUrl}
                alt="Selected Clothing Item"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain" // Use contain to see the whole item
              />
            </div>
          ) : (
            <p>Loading clothing item...</p>
          )}
        </div>

        {/* Model Display */}
        <div className="border p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-4">Model</h2>
          <div className="relative w-full h-[600px] bg-gray-100 flex items-center justify-center rounded mb-4">
            {selectedModel ? (
              <Image
                src={selectedModel.imageUrl}
                alt={selectedModel.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            ) : (
              <p className="text-gray-500">Select a model</p>
            )}
          </div>
          <button
            onClick={() => setShowModelSelector(!showModelSelector)}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            {showModelSelector ? "Close Models" : "Select Model"}
          </button>
        </div>
      </div>

      {/* Model Selector */}
      {showModelSelector && (
        <div className="border p-4 rounded-lg shadow mt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Choose a Model
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {models.map((model) => (
              <div
                key={model.id}
                onClick={() => handleSelectModel(model)}
                className="cursor-pointer border rounded hover:shadow-lg transition-shadow p-2 flex flex-col items-center"
              >
                <div className="relative w-full h-48 mb-2">
                  <Image
                    src={model.imageUrl}
                    alt={model.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-sm text-center">{model.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Run Button (Added Here) */}
      <div className="text-center my-6">
        {" "}
        {/* Centering container */}
        <button
          onClick={handleRun}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow"
        >
          Run
        </button>
      </div>

      {/* Result Section (Placeholder) */}
      <div className="border p-4 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Result</h2>
        <div className="bg-gray-100 h-96 flex items-center justify-center rounded">
          <p className="text-gray-500">
            (iFrame with combined result will go here)
          </p>
        </div>
      </div>
    </div>
  );
}

// Wrap with Suspense because useSearchParams needs it
export default function TryOnPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TryOnContent />
    </Suspense>
  );
}
