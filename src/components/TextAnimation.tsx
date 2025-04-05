import React, { useState, useEffect, useRef } from 'react';

interface TextAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
  cursorColor?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  loop?: boolean;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
  className = '',
  cursorColor = '#16a34a',
  showCursor = true,
  onComplete,
  loop = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isTypingPaused, setIsTypingPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    const currentText = texts[textIndex];
    
    // Function to handle the typing/deleting animation
    const handleTyping = () => {
      if (isTypingPaused) {
        // If paused, schedule next action after delay
        timeoutRef.current = window.setTimeout(() => {
          setIsTypingPaused(false);
          setIsDeleting(true);
        }, delayBetween);
        return;
      }
      
      // Typing mode
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          // Continue typing
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          // Text fully typed, pause before deleting
          setIsTypingPaused(true);
        }
      } 
      // Deleting mode
      else {
        if (displayText.length > 0) {
          // Continue deleting
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          // Text fully deleted, move to next text
          setIsDeleting(false);
          setTextIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % texts.length;
            
            // If we've gone through all texts and loop is false, stop
            if (nextIndex === 0 && !loop) {
              if (onComplete) onComplete();
              return prevIndex; // Stay on last text
            }
            
            return nextIndex;
          });
        }
      }
    };
    
    // Set timeout for next animation frame
    timeoutRef.current = window.setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : isTypingPaused ? 0 : typingSpeed
    );
    
    // Clean up timeout on unmount or text change
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isDeleting, textIndex, isTypingPaused, texts, typingSpeed, deletingSpeed, delayBetween, loop, onComplete]);
  
  return (
    <span className={`inline-flex ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <span
          className="animate-pulse opacity-75 ml-0.5"
          style={{ color: cursorColor }}
        >
          |
        </span>
      )}
    </span>
  );
};

export default TextAnimation; 