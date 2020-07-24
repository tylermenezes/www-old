import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const BookFrame = styled.div`
  width: 100%;
  height: 40em;
  border: none;
`;

export default ({ slug }) => {
  const holder = useRef(null);
  const [hasCalendlyLoaded, setHasCalendlyLoaded] = useState(false);

  const typeOfWindow = typeof window; // For static analysis

  useEffect(() => {
    if (window && !window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://calendly.com/assets/external/widget.js';
      script.addEventListener('load', () => {
        setHasCalendlyLoaded(true);
      });
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = 'https://calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.body.appendChild(link);

      return () => {
        document.head.removeChild(script);
        document.body.removeChild(link);
      }
    }
  }, [typeOfWindow]);

  useEffect(() => {
    console.log('useEffect', typeOfWindow, window?.Calendly, hasCalendlyLoaded);
    if (window?.Calendly && holder) {
      console.log('starting up calendly');
      window.Calendly.initInlineWidget({
        url: `https://calendly.com/${slug}`,
        parentElement: holder.current,
        prefill: {},
        utm: {}
      });
    }
  }, [typeOfWindow, window?.Calendly, hasCalendlyLoaded, holder, slug]);

  return (
    <BookFrame ref={holder} />
  );
}
