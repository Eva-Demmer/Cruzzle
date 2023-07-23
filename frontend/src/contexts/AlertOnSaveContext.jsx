import { createContext, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";

export const AlertOnSaveContext = createContext({});

function AlertOnSaveProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const onCloseActionRef = useRef(() => {});

  const contextValue = useMemo(() => {
    return {
      open,
      setOpen,
      severity,
      setSeverity,
      title,
      setTitle,
      message,
      setMessage,
      onCloseAction: onCloseActionRef.current, // Obtenez la valeur actuelle de onCloseAction
      setOnCloseAction: (onCloseAction) => {
        onCloseActionRef.current = onCloseAction; // Mettez à jour la valeur de onCloseAction
      },
    };
  }, [
    open,
    setOpen,
    severity,
    setSeverity,
    title,
    setTitle,
    message,
    setMessage,
  ]);

  return (
    <AlertOnSaveContext.Provider value={contextValue}>
      {children}
    </AlertOnSaveContext.Provider>
  );
}

AlertOnSaveProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertOnSaveProvider;
