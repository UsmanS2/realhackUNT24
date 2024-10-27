import React, { useState } from 'react';
import {
  BeakerIcon,
  Cog6ToothIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  TicketIcon,
} from '@heroicons/react/24/solid';

const messages = [
  {
    id: 1,
    content: 'I need assistance with renewing my lease. Can someone help me out?',
    sender: 'user',
    status: 'red',
  },
  {
    id: 2,
    content: 'The heating in my apartment isn’t working. Please send maintenance.',
    sender: 'user',
    status: 'yellow',
  },
  {
    id: 3,
    content: 'How can I update my payment method for rent?',
    sender: 'user',
    status: 'green',
  },
  {
    id: 4,
    content: 'My mailbox key isn’t working. How can I get a replacement?',
    sender: 'user',
    status: 'green',
  },
  {
    id: 5,
    content: 'Is there a way to check my utility usage online?',
    sender: 'user',
    status: 'green',
  },
];

export const PMDashboard: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>('tickets');

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  return (
    <main className="w-screen h-screen flex flex-col">
      <header className="w-screen text-2xl font-black bg-green-700 p-6 text-white flex flex-row justify-between">
        <p>CBRE</p>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/98803ebf9c6a020ec2109cd98dc700fdd46181390409afc05f9f9b33517df39b?placeholderIfAbsent=true&apiKey=d61eac4b8283404b9101a9dc30f948de"
          alt="User icon"
          className="object-contain shrink-0 aspect-square w-[25px]"
        />
      </header>
      <section className="w-screen h-screen flex flex-row">
        <div className="h-full bg-gray-200 w-1/12 flex flex-col justify-center items-center cursor-pointer">
          <div
            className={`${
              selectedIcon === 'tickets' ? 'bg-green-700' : ''
            } w-full flex items-center flex-row justify-center h-1/5`}
            onClick={() => handleIconClick('tickets')}
          >
            <TicketIcon
              className={` size-10 ${selectedIcon === 'tickets' ? 'text-white' : 'text-black'}`}
            />
          </div>
          <div
            className={`${
              selectedIcon === 'inbox' ? 'bg-green-700' : ''
            } w-full flex items-center flex-row justify-center h-1/5`}
            onClick={() => handleIconClick('inbox')}
          >
            <InboxIcon
              className={`size-10 ${selectedIcon === 'inbox' ? 'text-white' : 'text-black'}`}
            />
          </div>
          <div
            className={`${
              selectedIcon === 'phone' ? 'bg-green-700' : ''
            } w-full flex items-center flex-row justify-center h-1/5`}
            onClick={() => handleIconClick('phone')}
          >
            <PhoneIcon
              className={`size-10 ${selectedIcon === 'phone' ? 'text-white' : 'text-black'}`}
            />
          </div>
          <div
            className={`${
              selectedIcon === 'settings' ? 'bg-green-700' : ''
            } w-full flex items-center flex-row justify-center h-1/5`}
            onClick={() => handleIconClick('settings')}
          >
            <Cog6ToothIcon
              className={`size-10 ${selectedIcon === 'settings' ? 'text-white' : 'text-black'}`}
            />
          </div>
        </div>

        <div className="w-11/12 flex flex-row">
          <div className="h-full w-7/12 bg-gray-100 p-4 drop-shadow-lg">
            {/* Search Bar */}
            <div className="bg-gray-300 rounded-md flex items-center p-2 mb-4">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-300 focus:outline-none text-gray-600 w-full"
              />
            </div>

            {/* Message List */}
            {messages.map((message) => (
              <div
                className={`p-4 mb-4 rounded-md ${
                  message.status === 'red'
                    ? 'bg-red-400'
                    : message.status === 'yellow'
                      ? 'bg-yellow-300'
                      : 'bg-green-500'
                }`}
                key={message.id}
              >
                {message.content}
              </div>
            ))}
          </div>

          <div className="w-full h-full flex flex-col justify-between bg-gray-100 px-8 py-4">
            {/* Chat Header */}
            <div className="text-center text-gray-500">Chat Started</div>

            {/* Chat Messages */}
            <div className="flex-grow flex flex-col space-y-4 py-4">
              {/* Chatbot Message */}
              <div className="flex">
                <div className="bg-gray-300 p-4 rounded-lg w-1/3">Hello! How can I assist you?</div>
              </div>

              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-green-500 p-4 rounded-lg w-1/4">
                  I need help with my account.
                </div>
              </div>

              {/* Chatbot Message */}
              <div className="flex">
                <div className="bg-gray-300 p-4 rounded-lg w-1/3">
                  Sure! Please provide your account number.
                </div>
              </div>
            </div>

            {/* Message Input Section */}
            <div className="bg-gray-300 p-4 rounded-xl flex items-center">
              <form className="w-full">
                <label htmlFor="message" className="sr-only">
                  Type your message
                </label>
                <input
                  type="text"
                  id="message"
                  placeholder="MESSAGE"
                  className="w-full p-3 text-gray-500 text-right rounded-lg bg-gray-200 focus:outline-none"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
