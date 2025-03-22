import React, { useContext, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { emailContext } from "../App";
import DisplayEmail from "./DisplayEmail";

const SearchResults = ({ searchQuery, setShowSearchResults }) => {
    const { emails } = useContext(emailContext);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const searchResultsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowSearchResults]);

    if (!searchQuery) return null; // Now safe to use after hooks are declared

    const searchWords = searchQuery.toLowerCase().split(" ").filter(Boolean);
    const filteredEmails = emails.filter((email) =>
        searchWords.some(
            (word) =>
                (email.subject && email.subject.toLowerCase().includes(word)) || 
                (email.body && email.body.toLowerCase().includes(word))
        )
    );

    const ViewtheEmail = (email) => {
        setSelectedEmail(email);
    };

    return (
        <div 
            ref={searchResultsRef} 
            className="absolute left-0 w-full max-w-2xl top-full mt-0 bg-white bg-opacity-40 backdrop-blur-lg shadow-lg rounded-lg p-4 z-50 max-h-96 overflow-y-auto"
        >
            <h2 className="text-lg font-bold text-gray-800 mb-2">
                Search Results:
            </h2>

            {filteredEmails.length > 0 ? (
                filteredEmails.map((email) => (
                    // <motion.div
                    //     key={email._id}
                    //     className="bg-gray-100 p-3 my-2 rounded-md shadow cursor-pointer hover:bg-gray-200"
                    //     whileHover={{ scale: 1.02 }}
                    //     onClick={() => ViewtheEmail(email)}
                    // >
                    //     <DisplayEmail email={email} />
                    // </motion.div>
                    // <motion.div
                    //     key={email._id}
                    //     className="bg-gray-100 p-4 my-3 rounded-lg shadow-md cursor-pointer 
                    //             hover:bg-gray-200 transition-all flex items-center justify-between"
                    //     whileHover={{ scale: 1.02 }}
                    //     onClick={() => ViewtheEmail(email)}
                    // >
                    //     <div className="flex items-center gap-4 w-full">
                    //         {/* Icon (if needed) */}
                    //         <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                    //             📧
                    //         </div>

                    //         {/* Email Content */}
                    //         <div className="flex-1">
                    //             <DisplayEmail email={email} />
                    //         </div>
                    //     </div>
                    // </motion.div>
                    <motion.div
                        key={email._id}
                        className="bg-gray-100 p-4 my-3 rounded-lg shadow-md cursor-pointer 
                                hover:bg-gray-200 transition-all flex flex-col items-center text-center w-full"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => ViewtheEmail(email)}
                    >
                        <div className="flex flex-col items-center gap-2 w-full">
                            {/* Icon (Centered) */}
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
                                📧
                            </div>

                            {/* Email Content (Centered) */}
                            <div className="w-full flex flex-col items-center">
                                <DisplayEmail email={email} />
                            </div>
                        </div>
                    </motion.div>


                ))
            ) : (
                <p className="text-gray-500 text-xl text-center">
                    No matching emails found.
                </p>
            )}

            {selectedEmail && <DisplayEmail email={selectedEmail} />}
        </div>
    );
};

export default SearchResults;
