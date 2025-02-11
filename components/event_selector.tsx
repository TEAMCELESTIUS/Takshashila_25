"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import styles from "./event_selector.module.css"
import Image from 'next/image'
import EventCard from './eventCard'

interface EventItem {
  id: string
  title: string
  description: string
  category: 'Technical' | 'Non-Technical' | 'Pro-Shows' | 'All'
  venue?: string
  date: string
  image: string
  registerLink?: string
}

const Events: React.FC = () => {
  const [active, setActive] = useState<string>('All')
  const [isVinylExpanded, setIsVinylExpanded] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const vinylRef = useRef<HTMLDivElement>(null)
  const [waveKey, setWaveKey] = useState(0)
  const soundBarRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const categories = ['All', 'Technical', 'Non-Technical', 'Pro-Shows']

  const events: EventItem[] = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: `event-${i + 1}`,
      title: `Event ${i + 1}`,
      description: "Join us for an amazing experience filled with excitement and entertainment. This event promises to be unforgettable!",
      category: (['Technical', 'Non-Technical', 'Pro-Shows'] as const)[i % 3],
      venue: `Venue ${Math.floor(i / 10) + 1}`,
      date: new Date(2024, Math.floor(i / 5), (i % 28) + 1).toLocaleDateString(),
      image: '/images/coke_zero.jpg',
      registerLink: "#"
    }))
  }, [])

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
          ref={el => soundBarRefs.current[index] = el}
          style={{
            '--i': index,
            '--random-height': initialHeight,
            animationDuration: `${0.9 + Math.random() * 0.6}s`,
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

  return (
    <div className={styles.container}>
      <div 
        className={styles.vinylWrapper}
        onMouseEnter={() => {
          if (!isMobile) {
            setIsVinylExpanded(true)
            resetWaveAnimation()
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsVinylExpanded(false)
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

      <div className={styles.eventGrid}>
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.venue}
            image={event.image}
            description={event.description}
            registrationLink={event.registerLink}
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

export default Events 