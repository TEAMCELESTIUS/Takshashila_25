import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, X, Save, Plus, ShoppingCart, Users, Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  players: string[];
}

export default function Cart() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<{eventId: string; playerIndex: number} | null>(null);
  const [editedName, setEditedName] = useState('');
  const [newPlayerName, setNewPlayerName] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const cartIds = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const loadedEvents = cartIds.map((id: string) => ({
      id,
      title: `Event ${id}`,
      players: JSON.parse(sessionStorage.getItem(id) || '[]')
    }));
    setEvents(loadedEvents);
  }, []);

  const updateSessionStorage = (updatedEvents: Event[]) => {
    const cartIds = updatedEvents.map(event => event.id);
    sessionStorage.setItem('cart', JSON.stringify(cartIds));
    updatedEvents.forEach(event => {
      sessionStorage.setItem(event.id, JSON.stringify(event.players));
    });
  };

  const removeEvent = (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    const cartIds = updatedEvents.map(event => event.id);
    sessionStorage.setItem('cart', JSON.stringify(cartIds));
    sessionStorage.removeItem(eventId);
  };

  const removePlayer = (eventId: string, playerIndex: number) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        const updatedPlayers = event.players.filter((_, index) => index !== playerIndex);
        return { ...event, players: updatedPlayers };
      }
      return event;
    });
    setEvents(updatedEvents);
    updateSessionStorage(updatedEvents);
  };

  const startEditingPlayer = (eventId: string, playerIndex: number, currentName: string) => {
    setEditingPlayer({ eventId, playerIndex });
    setEditedName(currentName);
  };

  const saveEditedPlayer = (eventId: string, playerIndex: number) => {
    if (!editedName.trim()) return;

    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        const updatedPlayers = [...event.players];
        updatedPlayers[playerIndex] = editedName;
        return { ...event, players: updatedPlayers };
      }
      return event;
    });

    setEvents(updatedEvents);
    updateSessionStorage(updatedEvents);
    setEditingPlayer(null);
    setEditedName('');
  };

  const addNewPlayer = (eventId: string) => {
    const playerName = newPlayerName[eventId];
    if (!playerName?.trim()) return;

    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return { ...event, players: [...event.players, playerName] };
      }
      return event;
    });

    setEvents(updatedEvents);
    updateSessionStorage(updatedEvents);
    setNewPlayerName(prev => ({ ...prev, [eventId]: '' }));
  };

  const clearCart = () => {
    const cartIds = events.map(event => event.id);
    cartIds.forEach(id => {
      sessionStorage.removeItem(id);
    });
    sessionStorage.removeItem('cart');
    setEvents([]);
  };

  const handleCheckout = () => {
    if (events.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Checkout successful! Thank you for your registration.');
    clearCart();
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-green-950 to-black/50 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-green-900/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Your Cart</h1>
              <p className="text-white/80">{events.length} {events.length === 1 ? 'event' : 'events'} in cart</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCart}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                         bg-red-950/50 hover:bg-red-900/50 text-white border border-red-900/50
                         transition-colors duration-200"
              >
                <Trash2 size={20} />
                <span>Clear Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl
                         bg-gradient-to-r from-green-900 to-green-800
                         hover:from-green-800 hover:to-green-700 
                         text-white shadow-lg shadow-green-900/50
                         transition-all duration-200 border border-green-700/30"
              >
                <ShoppingCart size={20} />
                <span>Checkout</span>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {events.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-green-900/20 to-black/40 rounded-2xl p-6 mb-6 backdrop-blur-sm shadow-xl
                         border border-green-800/30 hover:border-green-700/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">{event.title}</h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-white/80">
                        <Calendar size={16} />
                        <span>March 15, 2024</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users size={16} />
                        <span>{event.players.length} players</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="text-white hover:text-red-300 transition-colors
                             p-2 hover:bg-red-950/50 rounded-xl"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {event.players.map((player, index) => (
                    <motion.div
                      key={`${event.id}-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-between bg-black/40 rounded-xl p-4
                               border border-green-900/20 hover:border-green-800/30 transition-colors"
                    >
                      {editingPlayer?.eventId === event.id && editingPlayer?.playerIndex === index ? (
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="flex-1 bg-black/60 text-white rounded-lg px-4 py-2 mr-2
                                   focus:outline-none focus:ring-2 focus:ring-green-700"
                          autoFocus
                        />
                      ) : (
                        <span className="text-white font-medium">{player}</span>
                      )}
                      <div className="flex space-x-2">
                        {editingPlayer?.eventId === event.id && editingPlayer?.playerIndex === index ? (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => saveEditedPlayer(event.id, index)}
                            className="text-white hover:text-green-300 transition-colors
                                     p-2 hover:bg-green-900/30 rounded-lg"
                          >
                            <Save size={18} />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => startEditingPlayer(event.id, index, player)}
                            className="text-white hover:text-green-300 transition-colors
                                     p-2 hover:bg-green-900/30 rounded-lg"
                          >
                            <Edit2 size={18} />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removePlayer(event.id, index)}
                          className="text-white hover:text-red-300 transition-colors
                                   p-2 hover:bg-red-950/50 rounded-lg"
                        >
                          <X size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}

                  <div className="flex items-center mt-4">
                    <input
                      type="text"
                      value={newPlayerName[event.id] || ''}
                      onChange={(e) => setNewPlayerName(prev => ({ ...prev, [event.id]: e.target.value }))}
                      placeholder="Add new player..."
                      className="flex-1 bg-black/60 text-white rounded-xl px-4 py-3
                               placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-700
                               border border-green-900/30 focus:border-green-800/40"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addNewPlayer(event.id)}
                      className="ml-3 bg-green-900/30 hover:bg-green-800/40 text-white
                               rounded-xl p-3 transition-colors border border-green-800/30"
                    >
                      <Plus size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {events.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ShoppingCart size={48} className="mx-auto mb-4 text-white/50" />
              <p className="text-xl text-white">Your cart is empty</p>
              <p className="text-white/70 mt-2">Add some events to get started</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}