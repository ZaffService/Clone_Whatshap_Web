import './style.css'
import { getChats, updateChat } from './utils/api.js'

// Variables globales bien définies
let currentUser = null;
let currentChat = null;
let chats = [];

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', async function() {
  console.log('Application démarrée');
  
  try {
    // Charger les chats
    chats = await getChats();
    console.log('Chats chargés:', chats);
    
    // Initialiser l'interface
    initializeApp();
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    // Utiliser les données par défaut
    initializeApp();
  }
});

function initializeApp() {
  // Votre code d'initialisation ici
  console.log('Interface initialisée');
}

// Exporter les fonctions si nécessaire
window.updateChat = updateChat;
window.getChats = getChats;