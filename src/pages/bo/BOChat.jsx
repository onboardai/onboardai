import React, { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Star,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Search,
  Menu,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  add_friend,
  messageClear,
  send_message,
  updateMessageBO,
} from "../../store/Reducers/boChatReducer";
import { formatDistanceToNow, parseISO } from "date-fns";
import { toast } from "react-hot-toast";
import Sidebar from "../compo/Sidebar";
import RedirectBOToCreate from "../function/RedirectBOToCreate";

const socket = io("wss://back-agox.onrender.com");

const BOChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.boAuth);
  const { fb_messages, currentFd, my_friends, loader, successMessage } =
    useSelector((state) => state.boChat);

  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messages = [
    {
      id: 1,
      name: "Jan Mayer",
      time: "12 mins ago",
      preview: "We want to invite you for a qui...",
    },
    {
      id: 2,
      name: "Joe Bartmann",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
    {
      id: 3,
      name: "Ally Wales",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
    {
      id: 4,
      name: "James Gardner",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
    {
      id: 5,
      name: "Allison Geidt",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
    {
      id: 6,
      name: "Ruben Culhane",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
    {
      id: 7,
      name: "Lydia Diaz",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
    {
      id: 8,
      name: "James Dokidis",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
    {
      id: 9,
      name: "Angelina Swann",
      time: "3:40 PM",
      preview: "Hey thanks for your interview...",
    },
  ];

  useEffect(() => {
    if (userInfo) {
      socket.emit("add_boUser", userInfo._id, userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(
        add_friend({
          sellerId: sellerId || "",
          userId: userInfo._id,
        })
      );
    }
  }, [sellerId, userInfo]);

  const truncateText = (text, limit) =>
    text.length <= limit ? text : text.slice(0, limit) + "...";

  const send = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        send_message({
          userId: userInfo._id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  const messagesEndRef = useRef(null);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (successMessage) {
      socket.emit("send_bo_message", fb_messages[fb_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceiverMessage(msg);
    });
  });

  useEffect(() => {
    if (receiverMessage) {
      if (
        sellerId === receiverMessage.senderId &&
        userInfo._id === receiverMessage.receiverId
      ) {
        dispatch(updateMessageBO(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Sent a message");
        dispatch(messageClear);
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    if (userInfo) {
      if (!userInfo?.businessInfo) {
        navigate("/bo/create/");
      }
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md justify-end"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`lg:sticky lg:top-0 lg:h-screen fixed lg:static inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50 lg:z-0`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
        <div className="flex-1">
          {userInfo ? (
            <div className="flex w-full bg-white">
              {/* Message List */}
              <div className="w-full md:w-[380px] border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
                  {/* <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div> */}
                </div>
                <div className="overflow-y-auto h-[calc(100vh-137px)]">
                  {my_friends?.map((f, i) => (
                    <Link
                      key={i}
                      to={`/bo/dashboard/chat/${f.fdId}`}
                      className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                    >
                      <img
                        src={f.image}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600"
                      />

                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">
                            {truncateText(f.name, 25)}
                          </h3>
                          {/* <span className="text-sm text-gray-500">{message.time}</span> */}
                        </div>
                        {/* <p className="text-sm text-gray-500 truncate">
                    {message.preview}
                  </p> */}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Chat View */}
              <div className="flex-1 flex flex-col h-screen">
                {sellerId ? (
                  <>
                    {/* Chat Header */}
                    <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={currentFd?.image}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600"
                        />
                        <div className="ml-3">
                          <h2 className="font-medium text-gray-900">
                            {currentFd?.name}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages (Now Fully Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {/* Beginning of Chat */}
                      <div className="text-center">
                        <img
                          src={currentFd?.image}
                          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-gray-600 text-xl"
                        />
                        <h2 className="text-xl font-medium text-gray-900 mt-2">
                          {currentFd?.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          This is the very beginning of your direct message with{" "}
                          {currentFd?.name}
                        </p>
                      </div>

                      {/* Date Divider */}
                      <div className="text-center text-sm text-gray-500 my-2">
                        Today
                      </div>

                      {fb_messages?.map((m, i) => {
                        const timeAgo = formatDistanceToNow(
                          parseISO(m.createdAt),
                          {
                            addSuffix: true,
                          }
                        );

                        if (currentFd?.fdId !== m.receiverId) {
                          return (
                            <div key={i} className="flex justify-start">
                              <div className="max-w-[70%]">
                                <div className="bg-gray-100 rounded-lg p-4 mt-2">
                                  <p className="text-gray-800">{m.message}</p>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {timeAgo}
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={i} className="flex justify-end">
                              <div className="max-w-[70%]">
                                <div className="bg-blue-600 text-white rounded-lg p-4">
                                  <p>{m.message}</p>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 text-right">
                                  {timeAgo}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="border-t border-gray-200 p-4">
                      <form
                        onSubmit={send}
                        className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2"
                      >
                        <button className="text-gray-400 hover:text-blue-600">
                          <Paperclip size={20} />
                        </button>
                        <input
                          type="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Reply message"
                          className="flex-1 mx-4 outline-none text-gray-600"
                        />
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={send}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Send size={20} />
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="pt-16 pl-16">
                    <span>select a chat</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-gray-600 text-lg font-medium">Loading...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BOChat;

{
  /* Sidebar functionality */
}
// import React, { useState } from 'react';
// import { MessageSquare, Star, MoreVertical, Paperclip, Smile, Send, Search, Menu, X } from 'lucide-react';

// const MessageList = ({ isOpen, onClose }) => {
//   const messages = [
//     { id: 1, name: 'Jan Mayer', time: '12 mins ago', preview: 'We want to invite you for a qui...' },
//     { id: 2, name: 'Joe Bartmann', time: '3:40 PM', preview: 'Hey thanks for your interview...' },
//     { id: 3, name: 'Ally Wales', time: '3:40 PM', preview: 'Hey thanks for your interview...' },
//     { id: 4, name: 'James Gardner', time: '3:40 PM', preview: 'Hey thanks for your interview...' },
//     { id: 5, name: 'Allison Geidt', time: '3:40 PM', preview: 'Hey thanks for your interview...' },
//     { id: 6, name: 'Ruben Culhane', time: '3:40 PM', preview: 'Hey thanks for your interview...' },
//     { id: 7, name: 'Lydia Diaz', time: '3:40 PM', preview: 'Hey thanks for your interview...' },
//     { id: 8, name: 'James Dokidis', time: '3:40 PM', preview: 'Hey thanks for your interview...' },
//     { id: 9, name: 'Angelina Swann', time: '3:40 PM', preview: 'Hey thanks for your interview...' },
//   ];

//   return (
//     <div className={`fixed md:relative w-[300px] md:w-[380px] h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-serif font-bold text-gray-800">Messages</h1>
//           <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
//             <X size={24} />
//           </button>
//         </div>
//         <div className="mt-4 relative">
//           <input
//             type="text"
//             placeholder="Search messages"
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>
//       </div>
//       <div className="overflow-y-auto h-[calc(100vh-137px)]">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
//             onClick={onClose}
//           >
//             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
//               AB
//             </div>
//             <div className="ml-3 flex-1">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-medium text-gray-900">{message.name}</h3>
//                 <span className="text-sm text-gray-500">{message.time}</span>
//               </div>
//               <p className="text-sm text-gray-500 truncate">{message.preview}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ChatView = ({ onOpenSidebar }) => {
//   return (
//     <div className="flex-1 flex flex-col h-screen">
//       <div className="border-b border-gray-200 p-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <button onClick={onOpenSidebar} className="mr-3 md:hidden text-gray-500 hover:text-gray-700">
//             <Menu size={24} />
//           </button>
//           <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
//             AB
//           </div>
//           <div className="ml-3">
//             <h2 className="font-medium text-gray-900">Jan Mayer</h2>
//             <p className="text-sm text-gray-500">Recruiter at Nomad</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4 text-gray-400">
//           <button className="hover:text-blue-600"><Star size={20} /></button>
//           <button className="hover:text-blue-600"><MoreVertical size={20} /></button>
//         </div>
//       </div>

//       <div className="p-4 bg-gray-50 border-b border-gray-200">
//         <div className="flex items-center justify-center">
//           <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl">
//             AB
//           </div>
//         </div>
//         <div className="text-center mt-2">
//           <h2 className="text-xl font-medium text-gray-900">Jan Mayer</h2>
//           <p className="text-gray-500">Recruiter at Nomad</p>
//           <p className="text-sm text-gray-500 mt-1">This is the very beginning of your direct message with Jan Mayer</p>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <div className="text-center text-sm text-gray-500 my-2">Today</div>

//         <div className="max-w-[70%]">
//           <div className="bg-gray-100 rounded-lg p-4">
//             <p className="text-gray-800">Hey Jake, I wanted to reach out because we saw your work contributions and were impressed by your work.</p>
//           </div>
//           <div className="bg-gray-100 rounded-lg p-4 mt-2">
//             <p className="text-gray-800">We want to invite you for a quick interview</p>
//           </div>
//           <div className="text-sm text-gray-500 mt-1">12 mins ago</div>
//         </div>

//         <div className="flex justify-end">
//           <div className="max-w-[70%]">
//             <div className="bg-blue-600 text-white rounded-lg p-4">
//               <p>Hi Jan, sure I would love to. Thanks for taking the time to see my work!</p>
//             </div>
//             <div className="text-sm text-gray-500 mt-1 text-right">12 mins ago</div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-200 p-4">
//         <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2">
//           <button className="text-gray-400 hover:text-blue-600">
//             <Paperclip size={20} />
//           </button>
//           <input
//             type="text"
//             placeholder="Reply message"
//             className="flex-1 mx-4 outline-none text-gray-600"
//           />
//           <div className="flex items-center space-x-2">
//             <button className="text-gray-400 hover:text-blue-600">
//               <Smile size={20} />
//             </button>
//             <button className="text-gray-400 hover:text-blue-600">
//               <Send size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex w-full bg-white">
//       <MessageList isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//       <ChatView onOpenSidebar={() => setIsSidebarOpen(true)} />
//     </div>
//   );
// };

// export default App;
