"use client";

import React, { useEffect, useState } from "react";
import { LightBulbIcon, PlusIcon } from "@heroicons/react/24/solid";
import CategoryCard from "@/app/components/CategoryCard";
import CategoryModal from "@/app/components/CategoryModal";
import {
  categoryScores,
  categoryScores2,
  aiSuggestions,
  aiSuggestions2,
} from "@/constants/dummyData";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("building1");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    title: "",
    score: 0,
  });

  const navigate = useRouter();
  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

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
      <header className='w-full bg-primary p-6 text-white flex justify-between items-center'>
        <p className='text-2xl font-black'>Propertunity</p>

        <div className='flex items-center space-x-4'>
          <p className='text-lg font-medium'>Hello, Property Manager!</p>
          <img
            src='https://via.placeholder.com/40'
            alt='User Profile'
            className='w-10 h-10 rounded-full object-cover'
          />
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300'
            onClick={() => navigate.push("/")}
          >
            Logout
          </button>
        </div>
      </header>

      <section className='w-full h-full flex overflow-y-hidden'>
        {/* Sidebar */}
        <div className='h-full bg-gray-200 w-2/12 flex flex-col justify-center items-center font-semibold'>
          {["Building 1", "Building 2", "Building 3"].map((building, idx) => (
            <div
              key={idx}
              className={`w-full flex items-center justify-center h-1/5 cursor-pointer shadow-sm ${
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

        <div className='w-10/12 h-full flex flex-col bg-gray-100 overflow-y-scroll pb-20'>
          <p className='text-lg font-semibold my-3 mx-6'>Home</p>
          <div className='flex flex-col lg:flex-row justify-evenly items-center space-y-6 lg:space-y-0 lg:space-x-4 bg-white shadow-xl rounded-lg mx-6 p-6'>
            <div
              className={`w-full lg:w-1/2 flex flex-col items-center p-6 rounded-lg shadow-md ${
                mainScore >= 80
                  ? "bg-green-50"
                  : mainScore >= 50
                  ? "bg-yellow-50"
                  : "bg-red-50"
              }`}
            >
              <CategoryCard
                nobg={true}
                title='Building Health'
                score={mainScore}
              />
              <p className='mt-4 text-lg font-semibold text-gray-700'>
                Overall Health Score
              </p>
            </div>
            <div className='flex flex-col w-1/2 items-center h-full'>
              <p className='text-center my-6 mb-10 text-lg font-semibold flex-row flex justify-center items-center gap-3'>
                <LightBulbIcon className='size-6 text-yellow-400 ' />
                SUGGESTIONS
              </p>
              <div className='grid grid-cols-2 gap-6'>
                {selectedIcon == "building1" &&
                  aiSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className='flex items-center justify-center p-4 h-full bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer'
                    >
                      <p className='text-center text-gray-800 font-medium'>
                        {suggestion.suggestion}
                      </p>
                    </div>
                  ))}

                {selectedIcon == "building2" &&
                  aiSuggestions2.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className='flex items-center justify-center p-4 h-full bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer'
                    >
                      <p className='text-center text-gray-800 font-medium'>
                        {suggestion.suggestion}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
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
                      handleCategoryClick(
                        category.title.toLowerCase(),
                        category.score
                      )
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
                      handleCategoryClick(
                        category.title.toLowerCase(),
                        category.score
                      )
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
          onClose={() => setModalVisible(false)}
        />
      )}
    </main>
  );
};

export default Dashboard;
