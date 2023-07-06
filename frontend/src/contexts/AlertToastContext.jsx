import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AlertToastContext = createContext({});

function AlertToastProvider({ children }) {
  const [alertAdminOpen, setAlertAdminOpen] = useState(false);
  const [alertAdminMessage, setAlertAdminMessage] = useState("Success");

  const contextValue = useMemo(() => {
    return {
      alertAdminOpen,
      setAlertAdminOpen,
      alertAdminMessage,
      setAlertAdminMessage,
    };
  }, [
    alertAdminOpen,
    setAlertAdminOpen,
    alertAdminMessage,
    setAlertAdminMessage,
  ]);

  return (
    <AlertToastContext.Provider value={contextValue}>
      {children}
    </AlertToastContext.Provider>
  );
}

AlertToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertToastProvider;
