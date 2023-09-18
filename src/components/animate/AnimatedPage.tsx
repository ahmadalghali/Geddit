import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// Adds Fade In-Out transition to applied pages
function AnimatedPage({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;
