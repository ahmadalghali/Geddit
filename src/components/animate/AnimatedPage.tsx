import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function AnimatedPage({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedPage;
