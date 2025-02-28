import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.8 }}
      onClick={() => navigate(-1)}
      aria-label="뒤로가기 버튼"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z"
          fill="#1E1E1E"
        />
      </svg>
    </motion.button>
  );
}

export default BackButton;
