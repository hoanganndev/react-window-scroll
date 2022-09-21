import { useEffect, useState } from "react";

export const useIntersection = (ref, index) => {
  const [visible, setVisible] = useState({});
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      setVisible({ ...visible, entry: entry.isIntersecting, index: index });
    });
    observer.observe(ref.current);
  }, []);
  return { visible, setVisible };
};
