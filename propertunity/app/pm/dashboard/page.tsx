"use client";

import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import CategoryCard from "@/app/components/CategoryCard";
import CategoryModal from "@/app/components/CategoryModal";
import { dummySuggestions } from "@/constants/dummyData";

export const Home: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("building1");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    title: "",
    score: 0,
  });

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  const categoryScores = [
    { title: "Plumbing", score: 80 },
    { title: "Electrical", score: 86 },
    { title: "Carpentry", score: 60 },
    { title: "HVAC", score: 86 },
    { title: "Appliances", score: 76 },
  ];

  const categoryScores2 = [
    { title: "Plumbing", score: 20 },
    { title: "Electrical", score: 66 },
    { title: "Carpentry", score: 30 },
    { title: "HVAC", score: 46 },
    { title: "Appliances", score: 56 },
  ];

  const handleCategoryClick = (
    categoryTitle: string,
    categoryScore: number
  ) => {
    setSelectedCategory({ title: categoryTitle, score: categoryScore });
    setModalVisible(true);
  };

  const calculateAverageScore = (
    scores: { title: string; score: number }[]
  ) => {
    const totalScore = scores.reduce(
      (acc, category) => acc + category.score,
      0
    );
    return Math.round(totalScore / scores.length);
  };

  const mainScore =
    selectedIcon === "building1"
      ? calculateAverageScore(categoryScores)
      : selectedIcon === "building2"
      ? calculateAverageScore(categoryScores2)
      : 0;

  return (
    <main className='w-screen h-screen flex flex-col'>
      {/* Header */}
      <header className='w-screen text-2xl font-black bg-primary p-6 text-white flex flex-row justify-between'>
        <p className=''>Propertunity</p>
        <img
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/98803ebf9c6a020ec2109cd98dc700fdd46181390409afc05f9f9b33517df39b?placeholderIfAbsent=true&apiKey=d61eac4b8283404b9101a9dc30f948de'
          alt='User icon'
          className='object-contain shrink-0 aspect-square w-[25px]'
        />
      </header>

      <section className='w-full h-full flex overflow-y-hidden'>
        {/* Sidebar */}
        <div className='h-full bg-gray-200 w-2/12 flex flex-col justify-center items-center font-semibold'>
          {["Building 1", "Building 2", "Building 3"].map((building, idx) => (
            <div
              key={idx}
              className={`w-full flex items-center justify-center h-1/5 cursor-pointer ${
                selectedIcon === `building${idx + 1}`
                  ? "bg-primary text-white"
                  : "text-black"
              }`}
              onClick={() => handleIconClick(`building${idx + 1}`)}
            >
              {building}
            </div>
          ))}
          <div
            className={`w-full flex items-center justify-center h-1/5 cursor-pointer ${
              selectedIcon === "building4"
                ? "bg-green-700 text-white"
                : "text-black"
            }`}
            onClick={() => handleIconClick("building4")}
          >
            <PlusIcon className='w-6 h-6' />
          </div>
        </div>

        {/* Main Content */}
        <div className='w-10/12 h-full flex flex-col bg-gray-100 overflow-y-scroll pb-20'>
          <p className='text-lg font-semibold my-3 mx-6'>Home</p>
          {/* Health Score Section */}
          <div className='flex justify-evenly items-center space-x-4 bg-white shadow-lg mx-6'>
            <CategoryCard nobg={true} title='Building' score={mainScore} />

            {/* Carousel Section using Mantine */}
            {dummySuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className=' flex items-center justify-center h-full my-10 bg-gray-50 rounded-lg text-black'
              >
                <p className=' w-1/2  '>
                  {suggestion.icon} {suggestion.suggestion}
                </p>
              </div>
            ))}
          </div>

          {/* Categories Section */}
          <div className='h-full p-6'>
            <p className='text-lg font-semibold mb-3'>Categories</p>
            <div className='grid grid-cols-3 gap-10  h-full'>
              {selectedIcon == "building1" &&
                categoryScores.map((category, idx) => (
                  <CategoryCard
                    key={idx}
                    title={category.title}
                    score={category.score}
                    onClick={() =>
                      handleCategoryClick(category.title, category.score)
                    }
                  />
                ))}

              {selectedIcon == "building2" &&
                categoryScores2.map((category, idx) => (
                  <CategoryCard
                    key={idx}
                    title={category.title}
                    score={category.score}
                    onClick={() =>
                      handleCategoryClick(category.title, category.score)
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalVisible && (
        <CategoryModal
          title={selectedCategory.title}
          score={selectedCategory.score}
          onClose={() => setModalVisible(false)} // Close modal on button click
        />
      )}
    </main>
  );
};

export default Home;
