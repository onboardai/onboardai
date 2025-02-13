import React, { useState, useEffect, useRef } from "react";
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
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  get_bo_message,
  get_bos,
  messageClear,
  send_message_to_bo,
  updateMessageSeller,
} from "../../store/Reducers/sellerChatReducer";
import { formatDistanceToNow, parseISO } from "date-fns";
import { toast } from "react-hot-toast";
import SidebarSeller from "../compo/SidebarSeller";

const socket = io("wss://back-agox.onrender.com");

const AAChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { bos, messages, currentBO, successMessage } = useSelector(
    (state) => state.sellerChat
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");

  const { boId } = useParams();

  useEffect(() => {
    if (userInfo) {
      socket.emit("add_seller", userInfo._id, userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(get_bos(userInfo._id));
    }
  }, [userInfo]);

  useEffect(() => {
    if (boId) {
      dispatch(get_bo_message(boId));
    }
  }, [boId]);

  const truncateText = (text, limit) =>
    text.length <= limit ? text : text.slice(0, limit) + "...";

  const send = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        send_message_to_bo({
          senderId: userInfo._id,
          text,
          receiverId: boId,
          name: userInfo.agencyInfo.name,
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
      socket.emit("send_seller_message", messages[messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("bo_message", (msg) => {
      setReceiverMessage(msg);
    });
  });

  useEffect(() => {
    if (receiverMessage) {
      if (
        boId === receiverMessage.senderId &&
        userInfo._id === receiverMessage.receiverId
      ) {
        dispatch(updateMessageSeller(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Sent a message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

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
          <SidebarSeller onClose={() => setIsSidebarOpen(false)} />
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
                  {bos?.map((b, i) => (
                    <Link
                      key={i}
                      to={`/seller/dashboard/chat/${b.fdId}`}
                      className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                    >
                      <img
                        src={b.image}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600"
                      />

                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">
                            {truncateText(b.name, 25)}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col h-screen">
                {boId ? (
                  <>
                    <Link
                      to={`/bo/profile/${currentBO?.businessInfo?.username}`}
                      className="border-b border-gray-200 p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={currentBO?.businessInfo?.businessLogo[0]}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600"
                        />
                        <div className="ml-3">
                          <h2 className="font-medium text-gray-900">
                            {currentBO?.businessInfo?.name}
                          </h2>
                        </div>
                      </div>
                    </Link>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div className="text-center">
                        <img
                          src={currentBO?.businessInfo?.businessLogo[0]}
                          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-gray-600 text-xl"
                        />
                        <h2 className="text-xl font-medium text-gray-900 mt-2">
                          {currentBO?.businessInfo?.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          This is the very beginning of your direct message with{" "}
                          {currentBO?.businessInfo?.name}
                        </p>
                      </div>

                      <div className="text-center text-sm text-gray-500 my-2">
                        Today
                      </div>

                      {messages?.map((m, i) => {
                        const timeAgo = formatDistanceToNow(
                          parseISO(m.createdAt),
                          {
                            addSuffix: true,
                          }
                        );

                        if (m.senderId !== boId) {
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
                        } else {
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
                        }
                      })}
                      <div ref={messagesEndRef} />
                    </div>

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

export default AAChat;
