import { useState } from "react";

export default function useScrollTrigger(threshold = 0) {
  if (typeof window === 'undefined') return false;
  const [offset, setOffset] = useState(0);
  window.addEventListener('scroll', () => {
    setOffset(window.pageYOffset);
  })
  return offset > threshold;
}
