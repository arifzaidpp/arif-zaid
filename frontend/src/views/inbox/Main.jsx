// import {
//   Lucide,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownContent,
//   DropdownItem,
// } from "@/base-components";
// import { faker as $f } from "@/utils";
// import classnames from "classnames";
// import { useState, useEffect } from "react";

// function Main() {
//   const [messages, setMessages] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const messagesPerPage = 10;

//   useEffect(() => {
//     // Initialize messages with faker data
//     const generatedMessages = $f().map((faker, index) => ({
//       id: index,
//       senderName: faker.users[0].name,
//       senderPhoto: faker.photos[0],
//       subject: faker.news[0].superShortContent,
//       body: faker.news[0].shortContent,
//       time: faker.times[0],
//       isRead: faker.trueFalse[0],
//       isSelected: false,
//       isStarred: false,
//     }));
//     setMessages(generatedMessages);
//   }, []);

//   const handleSelectAll = () => {
//     const newSelectAll = !selectAll;
//     setSelectAll(newSelectAll);
//     setMessages((prevMessages) =>
//       prevMessages.map((message) => ({
//         ...message,
//         isSelected: newSelectAll,
//       }))
//     );
//   };

//   const handleSelectMessage = (id) => {
//     setMessages((prevMessages) =>
//       prevMessages.map((message) =>
//         message.id === id
//           ? { ...message, isSelected: !message.isSelected }
//           : message
//       )
//     );
//   };

//   const handleStarMessage = (id) => {
//     setMessages((prevMessages) =>
//       prevMessages.map((message) =>
//         message.id === id
//           ? { ...message, isStarred: !message.isStarred }
//           : message
//       )
//     );
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     const totalPages = Math.ceil(
//       filteredMessages.length / messagesPerPage
//     );
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const indexOfLastMessage = currentPage * messagesPerPage;
//   const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;

//   const filteredMessages = messages.filter((message) =>
//     message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     message.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     message.senderName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const currentMessages = filteredMessages.slice(
//     indexOfFirstMessage,
//     indexOfLastMessage
//   );

//   return (
//     <>
//       <div className="grid grid-cols-12 gap-6 mt-8">
//         <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
//           {/* BEGIN: Inbox Menu */}
//           <div className="intro-y box bg-primary p-5 mt-6">
//             <button
//               type="button"
//               className="btn text-slate-600 dark:text-slate-300 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1"
//             >
//               <Lucide icon="Edit3" className="w-4 h-4 mr-2" /> Compose
//             </button>
//             <div className="border-t border-white/10 dark:border-darkmode-400 mt-6 pt-6 text-white">
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 rounded-md bg-white/10 dark:bg-darkmode-700 font-medium"
//               >
//                 <Lucide icon="Mail" className="w-4 h-4 mr-2" /> Inbox
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md"
//               >
//                 <Lucide icon="Star" className="w-4 h-4 mr-2" /> Marked
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md"
//               >
//                 <Lucide icon="Inbox" className="w-4 h-4 mr-2" /> Draft
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md"
//               >
//                 <Lucide icon="Send" className="w-4 h-4 mr-2" /> Sent
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md"
//               >
//                 <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Trash
//               </a>
//             </div>
//             <div className="border-t border-white/10 dark:border-darkmode-400 mt-4 pt-4 text-white">
//               <a href="" className="flex items-center px-3 py-2 truncate">
//                 <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
//                 Custom Work
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
//               >
//                 <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
//                 Important Meetings
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
//               >
//                 <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
//                 Work
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
//               >
//                 <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
//                 Design
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
//               >
//                 <div className="w-2 h-2 bg-danger rounded-full mr-3"></div>
//                 Next Week
//               </a>
//               <a
//                 href=""
//                 className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
//               >
//                 <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New Label
//               </a>
//             </div>
//           </div>
//           {/* END: Inbox Menu */}
//         </div>
//         <div className="col-span-12 lg:col-span-9 2xl:col-span-10">
//           {/* BEGIN: Inbox Filter */}
//           <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
//             <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
//               <Lucide
//                 icon="Search"
//                 className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
//               />
//               <input
//                 type="text"
//                 className="form-control w-full sm:w-64 box px-10"
//                 placeholder="Search mail"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Dropdown
//                 className="inbox-filter absolute inset-y-0 mr-3 right-0 flex items-center"
//                 placement="bottom-start"
//               >
//                 <DropdownToggle
//                   tag="a"
//                   role="button"
//                   className="w-4 h-4 block"
//                   href="#"
//                 >
//                   <Lucide
//                     icon="ChevronDown"
//                     className="w-4 h-4 cursor-pointer text-slate-500"
//                   />
//                 </DropdownToggle>
//                 <DropdownMenu className="inbox-filter__dropdown-menu pt-2">
//                   <DropdownContent tag="div">
//                     <div className="grid grid-cols-12 gap-4 gap-y-3 p-3">
//                       <div className="col-span-6">
//                         <label
//                           htmlFor="input-filter-1"
//                           className="form-label text-xs"
//                         >
//                           From
//                         </label>
//                         <input
//                           id="input-filter-1"
//                           type="text"
//                           className="form-control flex-1"
//                           placeholder="example@gmail.com"
//                         />
//                       </div>
//                       <div className="col-span-6">
//                         <label
//                           htmlFor="input-filter-2"
//                           className="form-label text-xs"
//                         >
//                           To
//                         </label>
//                         <input
//                           id="input-filter-2"
//                           type="text"
//                           className="form-control flex-1"
//                           placeholder="example@gmail.com"
//                         />
//                       </div>
//                       <div className="col-span-6">
//                         <label
//                           htmlFor="input-filter-3"
//                           className="form-label text-xs"
//                         >
//                           Subject
//                         </label>
//                         <input
//                           id="input-filter-3"
//                           type="text"
//                           className="form-control flex-1"
//                           placeholder="Important Meeting"
//                         />
//                       </div>
//                       <div className="col-span-6">
//                         <label
//                           htmlFor="input-filter-4"
//                           className="form-label text-xs"
//                         >
//                           Has the Words
//                         </label>
//                         <input
//                           id="input-filter-4"
//                           type="text"
//                           className="form-control flex-1"
//                           placeholder="Job, Work, Documentation"
//                         />
//                       </div>
//                       <div className="col-span-6">
//                         <label
//                           htmlFor="input-filter-5"
//                           className="form-label text-xs"
//                         >
//                           Doesn't Have
//                         </label>
//                         <input
//                           id="input-filter-5"
//                           type="text"
//                           className="form-control flex-1"
//                           placeholder="Job, Work, Documentation"
//                         />
//                       </div>
//                       <div className="col-span-6">
//                         <label
//                           htmlFor="input-filter-6"
//                           className="form-label text-xs"
//                         >
//                           Size
//                         </label>
//                         <select
//                           id="input-filter-6"
//                           className="form-select flex-1"
//                         >
//                           <option>10</option>
//                           <option>25</option>
//                           <option>35</option>
//                           <option>50</option>
//                         </select>
//                       </div>
//                       <div className="col-span-12 flex items-center mt-3">
//                         <button className="btn btn-secondary w-32 ml-auto">
//                           Create Filter
//                         </button>
//                         <button className="btn btn-primary w-32 ml-2">
//                           Search
//                         </button>
//                       </div>
//                     </div>
//                   </DropdownContent>
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//             <div className="w-full sm:w-auto flex">
//               <button className="btn btn-primary shadow-md mr-2">
//                 Start a Video Call
//               </button>
//               <Dropdown>
//                 <DropdownToggle className="btn px-2 box">
//                   <span className="w-5 h-5 flex items-center justify-center">
//                     <Lucide icon="Plus" className="w-4 h-4" />
//                   </span>
//                 </DropdownToggle>
//                 <DropdownMenu className="w-40">
//                   <DropdownContent>
//                     <DropdownItem>
//                       <Lucide icon="User" className="w-4 h-4 mr-2" /> Contacts
//                     </DropdownItem>
//                     <DropdownItem>
//                       <Lucide icon="Settings" className="w-4 h-4 mr-2" />{" "}
//                       Settings
//                     </DropdownItem>
//                   </DropdownContent>
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//           </div>
//           {/* END: Inbox Filter */}
//           {/* BEGIN: Inbox Content */}
//           <div className="intro-y inbox box mt-5">
//             <div className="p-5 flex flex-col-reverse sm:flex-row text-slate-500 border-b border-slate-200/60">
//               <div className="flex items-center mt-3 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-5 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                 />
//                 <Dropdown className="ml-1" placement="bottom-start">
//                   <DropdownToggle className="w-5 h-5 block" href="#">
//                     <Lucide icon="ChevronDown" className="w-5 h-5" />
//                   </DropdownToggle>
//                   <DropdownMenu className="w-32">
//                     <DropdownContent>
//                       <DropdownItem>All</DropdownItem>
//                       <DropdownItem>None</DropdownItem>
//                       <DropdownItem>Read</DropdownItem>
//                       <DropdownItem>Unread</DropdownItem>
//                       <DropdownItem>Starred</DropdownItem>
//                       <DropdownItem>Unstarred</DropdownItem>
//                     </DropdownContent>
//                   </DropdownMenu>
//                 </Dropdown>
//                 <a
//                   href="#"
//                   className="w-5 h-5 ml-5 flex items-center justify-center"
//                 >
//                   <Lucide icon="RefreshCw" className="w-4 h-4" />
//                 </a>
//                 <a
//                   href="#"
//                   className="w-5 h-5 ml-5 flex items-center justify-center"
//                 >
//                   <Lucide icon="MoreHorizontal" className="w-4 h-4" />
//                 </a>
//               </div>
//               <div className="flex items-center sm:ml-auto">
//               <div className="">
//                 {`Showing ${indexOfFirstMessage + 1} to ${Math.min(
//                   indexOfLastMessage,
//                   filteredMessages.length
//                 )} of ${filteredMessages.length}`}
//               </div>
//               <a
//                 href="#"
//                 className="w-5 h-5 ml-5 flex items-center justify-center"
//                 onClick={handlePreviousPage}
//               >
//                 <Lucide icon="ChevronLeft" className="w-4 h-4" />
//               </a>
//               <a
//                 href="#"
//                 className="w-5 h-5 ml-5 flex items-center justify-center"
//                 onClick={handleNextPage}
//               >
//                 <Lucide icon="ChevronRight" className="w-4 h-4" />
//               </a>
//                 <a
//                   href="#"
//                   className="w-5 h-5 ml-5 flex items-center justify-center"
//                 >
//                   <Lucide icon="Settings" className="w-4 h-4" />
//                 </a>
//             </div>

//           </div>
//           <div className="overflow-x-auto sm:overflow-x-visible">
//             {currentMessages.map((message) => (
//               <div key={message.id} className="intro-y">
//                 <div
//                   className={classnames({
//                     "inbox__item inline-block sm:block text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-darkmode-400/70 border-b border-slate-200/60 dark:border-darkmode-400": true,
//                     "inbox__item--active": message.isSelected,
//                   })}
//                 >
//                   <div className="flex px-5 py-3">
//                     <div className="w-72 flex-none flex items-center mr-5">
//                       <input
//                         className="form-check-input flex-none"
//                         type="checkbox"
//                         checked={message.isSelected}
//                         onChange={() => handleSelectMessage(message.id)}
//                       />
//                       <a
//                         href="#"
//                         className="w-5 h-5 flex-none ml-4 flex items-center justify-center text-slate-400"
//                         onClick={() => handleStarMessage(message.id)}
//                       >
//                         <Lucide
//                           icon={message.isStarred ? "Star" : "Star"}
//                           className={`w-4 h-4 ${message.isStarred
//                             ? "text-yellow-500"
//                             : "text-slate-400"
//                             }`}
//                         />
//                       </a>
//                       <a
//                           href="#"
//                           className="w-5 h-5 flex-none ml-2 flex items-center justify-center text-slate-400"
//                         >
//                           <Lucide icon="Bookmark" className="w-4 h-4" />
//                         </a>
//                       <div className="w-6 h-6 flex-none image-fit relative ml-5">
//                         <img
//                           alt="Sender"
//                           className="rounded-full"
//                           src={message.senderPhoto}
//                         />
//                       </div>
//                       <div className="inbox__item--sender truncate ml-3">
//                         {message.senderName}
//                       </div>
//                     </div>
//                     <div className="w-64 sm:w-auto truncate">
//                       <span className="inbox__item--highlight">
//                         {message.subject}
//                       </span>
//                       {message.body}
//                     </div>
//                     <div className="inbox__item--time whitespace-nowrap ml-auto pl-10">
//                       {message.time}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
//               <div>4.41 GB (25%) of 17 GB used Manage</div>
//               <div className="sm:ml-auto mt-2 sm:mt-0">
//                 Last account activity: 36 minutes ago
//               </div>
//             </div>
//         </div>
//         {/* END: Inbox Content */}
//       </div>
//     </div >
//     </>
//   );
// }

// export default Main;


import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from "@/base-components";
import { faker as $f } from "@/utils";
import classnames from "classnames";
import { useState, useEffect } from "react";

function Main() {
  const [messages, setMessages] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;
  const [selectedMessage, setSelectedMessage] = useState(null); // New state for selected message
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current message

  useEffect(() => {
    // Initialize messages with faker data
    const generatedMessages = $f().map((faker, index) => ({
      id: index,
      senderName: faker.users[0].name,
      senderPhoto: faker.photos[0],
      subject: faker.news[0].superShortContent,
      body: faker.news[0].shortContent,
      time: faker.times[0],
      isRead: faker.trueFalse[0],
      isSelected: false,
      isStarred: false,
    }));
    setMessages(generatedMessages);
  }, []);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setMessages((prevMessages) =>
      prevMessages.map((message) => ({
        ...message,
        isSelected: newSelectAll,
      }))
    );
  };

  const handleSelectMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id
          ? { ...message, isSelected: !message.isSelected }
          : message
      )
    );
  };

  const handleStarMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id
          ? { ...message, isStarred: !message.isStarred }
          : message
      )
    );
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;

  const filteredMessages = messages.filter((message) =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  // Handler to show message details
  const handleShowDetails = (message) => {
    setSelectedMessage(message);
    setCurrentIndex(filteredMessages.findIndex(m => m.id === message.id)); // Set the current index
  };

  // Handler to go back to the message list
  const handleBackToList = () => {
    setSelectedMessage(null);
    setCurrentIndex(0); // Reset current index when going back to the list
  };

  const showPreviousMessage = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    setSelectedMessage(filteredMessages[currentIndex - 1]); // Show previous message
  };

  const showNextMessage = () => {
    setCurrentIndex((prevIndex) => (prevIndex < filteredMessages.length - 1 ? prevIndex + 1 : filteredMessages.length - 1));
    setSelectedMessage(filteredMessages[currentIndex + 1]); // Show next message
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
          {/* BEGIN: Inbox Menu */}
          <div className="intro-y box bg-primary p-5 mt-6">
            <button
              type="button"
              className="btn text-slate-600 dark:text-slate-300 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1"
            >
              <Lucide icon="Edit3" className="w-4 h-4 mr-2" /> Compose
            </button>
            <div className="border-t border-white/10 dark:border-darkmode-400 mt-6 pt-6 text-white">
              <a
                href=""
                className="flex items-center px-3 py-2 rounded-md bg-white/10 dark:bg-darkmode-700 font-medium"
              >
                <Lucide icon="Mail" className="w-4 h-4 mr-2" /> Inbox
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md"
              >
                <Lucide icon="Star" className="w-4 h-4 mr-2" /> Marked
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md"
              >
                <Lucide icon="Inbox" className="w-4 h-4 mr-2" /> Draft
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md"
              >
                <Lucide icon="Send" className="w-4 h-4 mr-2" /> Sent
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md"
              >
                <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Trash
              </a>
            </div>
            <div className="border-t border-white/10 dark:border-darkmode-400 mt-4 pt-4 text-white">
              <a href="" className="flex items-center px-3 py-2 truncate">
                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                Custom Work
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
              >
                <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                Important Meetings
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
              >
                <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                Work
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
              >
                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                Design
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
              >
                <div className="w-2 h-2 bg-danger rounded-full mr-3"></div>
                Next Week
              </a>
              <a
                href=""
                className="flex items-center px-3 py-2 mt-2 rounded-md truncate"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New Label
              </a>
            </div>
          </div>
          {/* END: Inbox Menu */}
        </div>
        <div className="col-span-12 lg:col-span-9 2xl:col-span-10">
          {/* BEGIN: Inbox Filter */}
          <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
            <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
              />
              <input
                type="text"
                className="form-control w-full sm:w-64 box px-10"
                placeholder="Search mail"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Dropdown
                className="inbox-filter absolute inset-y-0 mr-3 right-0 flex items-center"
                placement="bottom-start"
              >
                <DropdownToggle
                  tag="a"
                  role="button"
                  className="w-4 h-4 block"
                  href="#"
                >
                  <Lucide
                    icon="ChevronDown"
                    className="w-4 h-4 cursor-pointer text-slate-500"
                  />
                </DropdownToggle>
                <DropdownMenu className="inbox-filter__dropdown-menu pt-2">
                  <DropdownContent tag="div">
                    <div className="grid grid-cols-12 gap-4 gap-y-3 p-3">
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-1"
                          className="form-label text-xs"
                        >
                          From
                        </label>
                        <input
                          id="input-filter-1"
                          type="text"
                          className="form-control flex-1"
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-2"
                          className="form-label text-xs"
                        >
                          To
                        </label>
                        <input
                          id="input-filter-2"
                          type="text"
                          className="form-control flex-1"
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-3"
                          className="form-label text-xs"
                        >
                          Subject
                        </label>
                        <input
                          id="input-filter-3"
                          type="text"
                          className="form-control flex-1"
                          placeholder="Important Meeting"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-4"
                          className="form-label text-xs"
                        >
                          Has the Words
                        </label>
                        <input
                          id="input-filter-4"
                          type="text"
                          className="form-control flex-1"
                          placeholder="Job, Work, Documentation"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-5"
                          className="form-label text-xs"
                        >
                          Doesn't Have
                        </label>
                        <input
                          id="input-filter-5"
                          type="text"
                          className="form-control flex-1"
                          placeholder="Job, Work, Documentation"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-6"
                          className="form-label text-xs"
                        >
                          Size
                        </label>
                        <select
                          id="input-filter-6"
                          className="form-select flex-1"
                        >
                          <option>10</option>
                          <option>25</option>
                          <option>35</option>
                          <option>50</option>
                        </select>
                      </div>
                      <div className="col-span-12 flex items-center mt-3">
                        <button className="btn btn-secondary w-32 ml-auto">
                          Create Filter
                        </button>
                        <button className="btn btn-primary w-32 ml-2">
                          Search
                        </button>
                      </div>
                    </div>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="w-full sm:w-auto flex">
              <button className="btn btn-primary shadow-md mr-2">
                Start a Video Call
              </button>
              <Dropdown>
                <DropdownToggle className="btn px-2 box">
                  <span className="w-5 h-5 flex items-center justify-center">
                    <Lucide icon="Plus" className="w-4 h-4" />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <Lucide icon="User" className="w-4 h-4 mr-2" /> Contacts
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="Settings" className="w-4 h-4 mr-2" />{" "}
                      Settings
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {/* END: Inbox Filter */}

          {/* BEGIN: Inbox Content */}
          <div className="intro-y inbox box mt-5">
            {/* Display message details if a message is selected */}
            {selectedMessage ? (
              <div className="flex-1 px-2">
                <div className="h-16 flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={handleBackToList}
                      className="flex items-center  px-2 py-1 space-x-0.5 border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-100"
                      title="Back"
                    >
                      <Lucide icon="ArrowLeft" className="h-5 w-5" />
                      <span className="text-sm font-bold">Back</span>
                    </button>
                    <div className="flex items-center">
                      <span className="bg-gray-300 h-6 w-[.5px] mx-3"></span>
                      <div className="flex items-center space-x-2">
                        <button title="Archive" className=" px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-100">
                          <Lucide icon="Archive" className="h-5 w-5" />
                        </button>
                        <button title="Mark As Spam" className=" px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-100">
                          <Lucide icon="Flag" className="h-5 w-5" />
                        </button>
                        <button title="Delete" className=" px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-100">
                          <Lucide icon="Trash" className="h-5 w-5" />
                        </button>
                      </div>
                      <span className="bg-gray-300 h-6 w-[.5px] mx-3"></span>
                      <div className="flex items-center space-x-2">
                        <button title="Mark As Unread" className=" px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-100">
                          <Lucide icon="MailOpen" className="h-5 w-5" />
                        </button>
                        <button title="Add Star" className=" px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-100">
                          <Lucide icon="Star" className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-2 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className={classnames(
                          "bg-gray-200 hover:bg-gray-300 text-gray-700 p-1.5 rounded-lg transition duration-150",
                          { "opacity-50 cursor-not-allowed": currentIndex === 0 } // Add disabled styling
                        )}
                        title="Previous Email"
                        onClick={showPreviousMessage}
                        disabled={currentIndex === 0} // Disable if it's the first message
                      >
                        <Lucide icon="ChevronLeft" className="h-5 w-5" />
                      </button>
                      <button
                        className={classnames(
                          "bg-gray-200 hover:bg-gray-300 text-gray-700 p-1.5 rounded-lg transition duration-150",
                          { "opacity-50 cursor-not-allowed": currentIndex === filteredMessages.length - 1 } // Add disabled styling
                        )}
                        title="Next Email"
                        onClick={showNextMessage}
                        disabled={currentIndex === filteredMessages.length - 1} // Disable if it's the last message
                      >
                        <Lucide icon="ChevronRight" className="h-5 w-5" />
                      </button>
                    </div>

                  </div>
                </div>
                <div className="m-6">
                  <h4 className="text-xl font-bold pb-2 mb-4 border-b-2">{selectedMessage.subject}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={selectedMessage.senderPhoto} className="rounded-full w-8 h-8 border border-gray-500" />
                      <div className="flex flex-col ml-2">
                        <span className="text-sm font-semibold">{selectedMessage.senderName}</span>
                        <span className="text-xs text-gray-400">From: bettygarmon@example.com</span>
                      </div>
                    </div>
                    <span className="text-sm ">{selectedMessage.time}</span>
                  </div>
                  <div className="py-6 pl-2">
                    {selectedMessage.body}
                  </div>

                  <div className="mt-8 pb-6 flex items-center space-x-4">
                    <button className="w-32 flex items-center justify-center space-x-2 py-1.5  border border-gray-400 rounded-lg hover:bg-gray-200">
                      <Lucide icon="Reply" className="h-5 w-5" />
                      <span>Reply</span>
                    </button>
                    <button className="w-32 flex items-center justify-center space-x-2 py-1.5  border border-gray-400 rounded-lg hover:bg-gray-200">
                      <Lucide icon="Share" className="h-6 w-6" />
                      <span>Forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-5 flex flex-col-reverse sm:flex-row text-slate-500 border-b border-slate-200/60">
                  <div className="flex items-center mt-3 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-5 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <Dropdown className="ml-1" placement="bottom-start">
                      <DropdownToggle className="w-5 h-5 block" href="#">
                        <Lucide icon="ChevronDown" className="w-5 h-5" />
                      </DropdownToggle>
                      <DropdownMenu className="w-32">
                        <DropdownContent>
                          <DropdownItem>All</DropdownItem>
                          <DropdownItem>None</DropdownItem>
                          <DropdownItem>Read</DropdownItem>
                          <DropdownItem>Unread</DropdownItem>
                          <DropdownItem>Starred</DropdownItem>
                          <DropdownItem>Unstarred</DropdownItem>
                        </DropdownContent>
                      </DropdownMenu>
                    </Dropdown>
                    <a
                      href="#"
                      className="w-5 h-5 ml-5 flex items-center justify-center"
                    >
                      <Lucide icon="RefreshCw" className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-5 h-5 ml-5 flex items-center justify-center"
                    >
                      <Lucide icon="MoreHorizontal" className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="flex items-center sm:ml-auto">
                    <div className="">
                      {`Showing ${indexOfFirstMessage + 1} to ${Math.min(
                        indexOfLastMessage,
                        filteredMessages.length
                      )} of ${filteredMessages.length}`}
                    </div>
                    <a
                      href="#"
                      className="w-5 h-5 ml-5 flex items-center justify-center"
                      onClick={handlePreviousPage}
                    >
                      <Lucide icon="ChevronLeft" className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-5 h-5 ml-5 flex items-center justify-center"
                      onClick={handleNextPage}
                    >
                      <Lucide icon="ChevronRight" className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-5 h-5 ml-5 flex items-center justify-center"
                    >
                      <Lucide icon="Settings" className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="overflow-x-auto sm:overflow-x-visible">
                  {currentMessages.map((message) => (
                    <div key={message.id} className="intro-y">
                      <div
                        className={classnames({
                          "inbox__item inline-block sm:block text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-darkmode-400/70 border-b border-slate-200/60 dark:border-darkmode-400": true,
                          "inbox__item--active": message.isSelected,
                        })}
                      >
                        <div className="flex px-5 py-3">
                          {/* Message item content (unchanged) */}
                          <div className="w-72 flex-none flex items-center mr-5">
                            <input
                              className="form-check-input flex-none"
                              type="checkbox"
                              checked={message.isSelected}
                              onChange={() => handleSelectMessage(message.id)}
                            />
                            <a
                              href="#"
                              className="w-5 h-5 flex-none ml-4 flex items-center justify-center text-slate-400"
                              onClick={() => handleStarMessage(message.id)}
                            >
                              <Lucide
                                icon={message.isStarred ? "Star" : "Star"}
                                className={`w-4 h-4 ${message.isStarred
                                  ? "text-yellow-500"
                                  : "text-slate-400"
                                  }`}
                              />
                            </a>

                            <div className="w-6 h-6 flex-none image-fit relative ml-5"
                              onClick={() => handleShowDetails(message)}>
                              <img
                                alt="Sender"
                                className="rounded-full"
                                src={message.senderPhoto}
                              />
                            </div>
                            <div className="inbox__item--sender truncate ml-3"
                              onClick={() => handleShowDetails(message)}>
                              {message.senderName}
                            </div>
                          </div>
                          <div className="w-64 sm:w-auto truncate"
                            onClick={() => handleShowDetails(message)}>
                            <span className="inbox__item--highlight">
                              {message.subject}
                            </span>
                            {message.body}
                          </div>
                          <div className="inbox__item--time whitespace-nowrap ml-auto pl-10"
                            onClick={() => handleShowDetails(message)}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
                  <div>4.41 GB (25%) of 17 GB used Manage</div>
                  <div className="sm:ml-auto mt-2 sm:mt-0">
                    Last account activity: 36 minutes ago
                  </div>
                </div>
              </>
            )}
          </div>
          {/* END: Inbox Content */}
        </div>
      </div>
    </>
  );
}

export default Main;
