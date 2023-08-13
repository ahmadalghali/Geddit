import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// const withTransition = (OriginalComponent) => (props) => {
//   return (
//     // <motion.div>
//     <OriginalComponent {...props} />
//     // </motion.div>
//   );
// };

// Fade left animation
//  initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -50 }}
//         transition={{ duration: 0.3 }}

// Fade up
//  initial={{ opacity: 0, y: 5 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.3 }}

// Fade in out animation
// initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.2 }}

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
