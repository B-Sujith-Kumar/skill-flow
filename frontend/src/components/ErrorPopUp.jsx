import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

const ErrorPopUp = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Transition
      show={visible}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`fixed top-4 right-4 bg-${
          type === "success" ? "green" : "red"
        }-500 text-white px-4 py-2 rounded-md shadow-md`}
      >
        {message}
      </div>
    </Transition>
  );
};

export default ErrorPopUp;
