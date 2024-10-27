"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Cog6ToothIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  TicketIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

interface Ticket {
  _id: string;
  title: string;
  message: string;
  assignment: string;
  danger_level: number;
  date: string;
  issue_date: string;
  progress: number;
  image: string;
  cost: number;
  opp_cost: number;
}

export const Home: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("tickets");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: string; text: string }[]
  >([]);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  useEffect(() => {
    const fetchAndSetTickets = async () => {
      const fetchedTickets = await fetchTickets();
      setTickets(fetchedTickets);
    };
    fetchAndSetTickets();
  }, []);

  async function fetchTickets() {
    const response = await fetch("/api/getTickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.tickets;
  }

  async function sendMessageToChatBot(message: string) {
    if (message.trim() === "") return;

    const newMessage = { sender: "user", text: message };
    const newChatHistory = [...chatHistory, newMessage];

    try {
      const response = await fetch("/api/ticketChatBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botMessage = {
        sender: "bot",
        text: data.resp,
      };

      setChatHistory([...newChatHistory, botMessage]);
      setInput("");
    } catch (error) {
      console.error("Error sending message to chat bot:", error);
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <main className='w-screen h-screen flex flex-col overflow-y-hidden'>
      <header className='w-screen text-2xl font-black bg-primary p-6 text-white flex flex-row justify-between'>
        <p>Propertunity</p>

        <div
          onClick={async () => await sendMessageToChatBot("YOO")}
          className='flex flex-row space-x-4'
        ></div>
      </header>
      <section className='w-screen h-screen flex flex-row'>
        <div className='h-full bg-gray-200 w-1/12 flex flex-col justify-center items-center cursor-pointer'>
          <div
            className={`${
              selectedIcon === "tickets" ? "bg-primary" : ""
            } w-full flex items-center flex-row justify-center h-1/5`}
            onClick={() => handleIconClick("tickets")}
          >
            <TicketIcon
              className={` size-10 ${
                selectedIcon === "tickets" ? "text-white" : "text-black"
              }`}
            />
          </div>
          <div
            className={`${
              selectedIcon === "inbox" ? "bg-primary" : ""
            } w-full flex items-center flex-row justify-center h-1/5`}
            onClick={() => handleIconClick("inbox")}
          >
            <InboxIcon
              className={`size-10 ${
                selectedIcon === "inbox" ? "text-white" : "text-black"
              }`}
            />
          </div>
          <div
            className={`${
              selectedIcon === "phone" ? "bg-primary" : ""
            } w-full flex items-center flex-row justify-center h-1/5`}
            onClick={() => handleIconClick("phone")}
          >
            <PhoneIcon
              className={`size-10 ${
                selectedIcon === "phone" ? "text-white" : "text-black"
              }`}
            />
          </div>
          <div
            className={`${
              selectedIcon === "settings" ? "bg-primary" : ""
            } w-full flex items-center flex-row justify-center h-1/5`}
            onClick={() => handleIconClick("settings")}
          >
            <Cog6ToothIcon
              className={`size-10 ${
                selectedIcon === "settings" ? "text-white" : "text-black"
              }`}
            />
          </div>
        </div>

        <div className='w-11/12 flex flex-row'>
          <div className='h-full w-7/12 bg-gray-100 p-4 drop-shadow-lg'>
            {/* Search Bar */}
            <div className='bg-gray-300 rounded-md flex items-center p-2 mb-4'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500 mr-2' />
              <input
                type='text'
                placeholder='Search'
                className='bg-gray-300 focus:outline-none text-gray-600 w-full'
              />
            </div>

            {/* Message List */}
            {tickets &&
              tickets.map((ticket) => (
                <div
                  className={`p-4 mb-4 rounded-md ${
                    ticket.danger_level === 3
                      ? "bg-red-500"
                      : ticket.danger_level === 2
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                  key={ticket?._id}
                >
                  {ticket?.message}
                </div>
              ))}
          </div>

          <div className='w-full h-full flex flex-col justify-between bg-gray-100 px-8 py-4'>
            {/* Chat Messages */}
            <div
              className='flex-grow flex flex-col space-y-4 py-4 overflow-y-scroll h-48'
              ref={chatRef}
            >
              <div className='text-center text-gray-500'>Chat Started</div>

              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={` p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-300 text-black self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Message Input Section */}
            <div className=' p-1 rounded-xl flex items-center'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessageToChatBot(input);
                }}
                className='w-full'
              >
                <label htmlFor='message' className='sr-only'>
                  Type your message
                </label>
                <input
                  type='text'
                  id='message'
                  placeholder='Type a message...'
                  className='w-full p-3 text-gray-500 text-right rounded-lg bg-gray-200 focus:outline-none'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
