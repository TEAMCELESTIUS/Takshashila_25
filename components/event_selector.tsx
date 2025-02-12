"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import styles from "./event_selector.module.css"
import Image from 'next/image'
import EventCard from './eventCard'

interface Event {
  id: number
  title: string
  description: string
  category: 'Technical' | 'Non-Technical' | 'Workshops' | 'All'
  venue?: string
  date: string
  image: string
  registerLink?: string
}

interface EventsdiscProps {
  events: Event[];
}

const Eventsdisc: React.FC<EventsdiscProps> = ({ events }) => {
  const [active, setActive] = useState<string>('All')
  const [isVinylExpanded, setIsVinylExpanded] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const vinylRef = useRef<HTMLDivElement>(null)
  const [waveKey, setWaveKey] = useState(0)
  const soundBarRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isVinylHovered, setIsVinylHovered] = useState(false)
  const vinylWrapperRef = useRef<HTMLDivElement>(null)

  const categories = useMemo(() => ['All', 'Technical', 'Non-Technical', 'Workshops'], [])

  const filteredEvents = events.filter(event => 
    active === 'All' ? true : event.category === active
  )

  const getRandomHeight = useCallback(() => {
    const baseHeight = 0.1 + Math.random() * 0.9;
    const multiplier = Math.random() < 0.4 ? 2.2 : 1;
    return baseHeight * multiplier;
  }, []);

  const preloadLogo = () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/tk-logo.svg';
    document.head.appendChild(link);
  };

  useEffect(() => {
    setIsClient(true);
    preloadLogo();
    const setDiameter = () => {
      if (vinylRef.current) {
        const width = vinylRef.current.offsetWidth
        const height = vinylRef.current.offsetHeight
        const diameter = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
        document.documentElement.style.setProperty("--diameter", `${diameter}px`)
      }
    }

    setDiameter()
    window.addEventListener("resize", setDiameter)

    return () => {
      window.removeEventListener("resize", setDiameter)
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const soundBars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, index) => {
      const initialHeight = getRandomHeight();
      return (
        <div
          key={index}
          className={styles.soundBar}
          ref={el => { soundBarRefs.current[index] = el; }}
          style={{
            '--i': index,
            '--random-height': initialHeight,
            animationDuration: `${2.0 + Math.random() * 1.0}s`,
            transform: `scaleY(${Math.random() * 0.1 + 0.05})`,
          } as React.CSSProperties}
          onAnimationIteration={() => {
            const el = soundBarRefs.current[index];
            if (el) {
              el.style.setProperty('--random-height', String(getRandomHeight()));
            }
          }}
        />
      );
    });
  }, [getRandomHeight]);

  useEffect(() => {
    return () => {
      soundBarRefs.current = [];
    };
  }, []);

  const resetWaveAnimation = useCallback(() => {
    setWaveKey(prev => prev + 1)
  }, [])

  const handleCategorySelect = (category: string) => {
    setActive(category)
  }

  const orderedCategories = useMemo(() => {
    const activeIndex = categories.indexOf(active);
    const before = categories.slice(0, activeIndex);
    const after = categories.slice(activeIndex + 1);
    return [categories[activeIndex], ...before, ...after];
  }, [active, categories]);

  // Update vinyl position on scroll
  useEffect(() => {
    if (vinylWrapperRef.current) {
      // Keep it fixed at 50% of viewport height
      vinylWrapperRef.current.style.position = 'fixed';
      vinylWrapperRef.current.style.top = '50%';
      vinylWrapperRef.current.style.transform = 'translateY(-50%)';
    }
  }, []); // Only run once on mount

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div 
        ref={vinylWrapperRef}
        className={styles.vinylWrapper}
        onMouseEnter={() => {
          if (!isMobile) {
            setIsVinylExpanded(true)
            setIsVinylHovered(true)
            resetWaveAnimation()
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsVinylExpanded(false)
            setIsVinylHovered(false)
          }
        }}
        onClick={() => {
          if (isMobile) {
            setIsVinylExpanded(!isVinylExpanded)
            resetWaveAnimation()
          }
        }}
      >
        <div 
          className={`${styles.vinyl} ${isVinylExpanded ? styles.expanded : ''}`}
          ref={vinylRef}
        >
          <div className={styles.vinylInner}>
            <div className={styles.logoContainer}>
              <Image 
                src="/images/tk-logo.svg"
                alt="TK Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className={styles.staticCategories}>
          {orderedCategories.map((category, index) => {
            const positionClass = category === active ? 'middle' : index < orderedCategories.indexOf(active) ? 'above' : 'below';
            return (
              <div key={category} className={`${styles.staticCategory} ${styles[positionClass]}`}>
                {category}
              </div>
            );
          })}
        </div>

        {isVinylExpanded && (
          <div className={styles.categoriesContainer}>
            <div className={styles.categories}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`${styles.category} ${active === category ? styles.active : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.blurOverlay} />
      <div key={waveKey} className={styles.soundWave}>
        {soundBars}
      </div>

      <div className={`${styles.eventGrid} ${isVinylHovered ? styles.behindVinyl : ''}`}>
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            isVinylHovered={isVinylHovered}
            title={event.title}
            date={event.date}
            location={event.venue || 'TBA'}
            image={event.image}
            description={event.description}
            registrationLink={event.registerLink || 'TBA' }
            category={event.category}
          />
        ))}
      </div>

      {selectedEvent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            <div className={styles.eventMeta}>
              <p>Venue: {selectedEvent.venue}</p>
              <p>Date: {selectedEvent.date}</p>
            </div>
            {/* Add map and video components here */}
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Eventsdisc