"use client";

import { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  type: "alert" | "confirm" | "prompt";
  onConfirm?: (value?: string) => void;
  confirmText?: string;
  cancelText?: string;
  placeholder?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  placeholder = "",
}: ModalProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === "prompt") {
      onConfirm?.(inputValue);
    } else {
      onConfirm?.();
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && type !== "prompt") {
      handleConfirm();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        {message && <p className="text-gray-400 mb-6">{message}</p>}

        {/* Prompt Input */}
        {type === "prompt" && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all mb-6"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleConfirm();
              }
            }}
          />
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          {type !== "alert" && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors font-medium"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`px-6 py-2.5 rounded-lg font-bold transition-colors ${
              type === "confirm" && confirmText.toLowerCase().includes("deny")
                ? "bg-rose-500 hover:bg-rose-600 text-white"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
