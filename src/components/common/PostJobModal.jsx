// Updated PostJobModal.jsx
import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

Modal.setAppElement('#root'); // Set this to your app root element

export default function PostJobModal({ isOpen, onRequestClose, applicant, onContinue }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
      >
        {applicant ? (
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={applicant.avatar}
                alt={`${applicant.first_name} ${applicant.last_name}`}
                className="w-24 h-24 rounded-full mb-4 shadow-lg border-4 border-blue-50"
              />
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {applicant.first_name} {applicant.last_name}
            </h3>
            <p className="text-gray-600 mb-4">{applicant.email}</p>

            <div className="bg-blue-50 rounded-lg p-4 text-left mb-6">
              <h4 className="text-sm font-semibold text-blue-600 mb-2">Cover Letter Preview</h4>
              <p className="text-gray-600 text-sm line-clamp-3">{applicant.coverLetter}</p>
            </div>

            <button
              onClick={onContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Awesome! Continue
            </button>
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent mb-4"></div>
            <p className="text-gray-600">Creating application...</p>
          </div>
        )}
      </motion.div>
    </Modal>
  );
}