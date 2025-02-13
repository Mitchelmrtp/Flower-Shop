import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "<b>ENVÍOS PARA HOY 📦</b> <u>compra hasta las 2:00 pm</u>",
  "<b>DELIVERY A LIMA Y CALLAO</b> <u>ver tarifario de delivery</u>",
  "<b>LLÁMANOS al +51 970112431</b> <u>uwuwuwuwwuwuwuw</u>"
];

export default function AnimatedBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showNextMessage, setShowNextMessage] = useState(false);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    container: 0,
    text: 0,
    boldText: 0
  });
  const duration = 15;
  const transitionGap = 100;
  // Factor para ajustar cuándo aparece el siguiente mensaje (0.8 significa 80% del recorrido)
  const triggerFactor = 0.85;

  useEffect(() => {
    const measureDimensions = () => {
      if (containerRef.current) {
        const container = containerRef.current.offsetWidth;
        
        // Medir texto completo
        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.whiteSpace = 'nowrap';
        tempDiv.innerHTML = messages[currentIndex];
        document.body.appendChild(tempDiv);
        const text = tempDiv.offsetWidth;
        
        // Medir texto en negrita
        const boldMatch = messages[currentIndex].match(/<b>(.*?)<\/b>/);
        if (boldMatch) {
          const boldTemp = document.createElement('div');
          boldTemp.style.visibility = 'hidden';
          boldTemp.style.position = 'absolute';
          boldTemp.style.whiteSpace = 'nowrap';
          boldTemp.innerHTML = boldMatch[0];
          document.body.appendChild(boldTemp);
          const boldText = boldTemp.offsetWidth;
          document.body.removeChild(boldTemp);
          setDimensions({ container, text, boldText });
        }
        
        document.body.removeChild(tempDiv);
        setIsInitialized(true);
      }
    };

    measureDimensions();
    window.addEventListener('resize', measureDimensions);
    return () => window.removeEventListener('resize', measureDimensions);
  }, [currentIndex]);

  useEffect(() => {
    if (isInitialized) {
      // Calcular el tiempo para que el texto llegue al punto de activación
      const totalDistance = dimensions.text + transitionGap;
      const triggerDistance = totalDistance * triggerFactor;
      const triggerTime = (duration * triggerDistance) / totalDistance;
      
      const showNextTimeout = setTimeout(() => {
        setShowNextMessage(true);
      }, triggerTime * 1000);

      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % messages.length);
        setShowNextMessage(false);
      }, duration * 1000);

      return () => {
        clearTimeout(showNextTimeout);
        clearInterval(interval);
      };
    }
  }, [isInitialized, dimensions]);

  const nextIndex = (currentIndex + 1) % messages.length;

  if (!isInitialized) {
    return (
      <div 
        ref={containerRef}
        className="bg-custom-btn text-white py-2 overflow-hidden relative w-full h-10 flex items-center"
      >
        <div className="absolute whitespace-nowrap text-base sm:text-xl md:text-1xl lg:text-2xl font-semibold">
          &nbsp;
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="bg-custom-btn text-white py-2 overflow-hidden relative w-full h-10 flex items-center"
    >
      <AnimatePresence>
        {/* Mensaje actual */}
        <motion.div
          key={`message-${currentIndex}`}
          initial={{ x: dimensions.container }}
          animate={{ x: -(dimensions.text + transitionGap) }}
          transition={{
            duration,
            ease: "linear",
            repeat: 0
          }}
          className="absolute whitespace-nowrap text-base sm:text-xl md:text-1xl lg:text-2xl font-semibold"
          dangerouslySetInnerHTML={{ __html: messages[currentIndex] }}
        />

        {/* Siguiente mensaje */}
        {showNextMessage && (
          <motion.div
            key={`message-${nextIndex}`}
            initial={{ x: dimensions.container + transitionGap }}
            animate={{ x: -(dimensions.text + transitionGap) }}
            transition={{
              duration,
              ease: "linear",
              repeat: 0
            }}
            className="absolute whitespace-nowrap text-base sm:text-xl md:text-1xl lg:text-2xl font-semibold"
            dangerouslySetInnerHTML={{ __html: messages[nextIndex] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}