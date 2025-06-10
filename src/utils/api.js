// Configuration API pour production/développement
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const API_BASE_URL = isDevelopment ? 'http://localhost:5001' : '/api'

console.log('Environment:', isDevelopment ? 'development' : 'production')
console.log('API_BASE_URL:', API_BASE_URL)

export const API_ENDPOINTS = {
  chats: `${API_BASE_URL}/chats`,
  notifications: `${API_BASE_URL}/notifications`,
  calls: `${API_BASE_URL}/calls`,
  status: `${API_BASE_URL}/status`
}

// Fonction utilitaire pour les requêtes avec gestion d'erreurs
export async function apiRequest(endpoint, options = {}) {
  try {
    console.log('API Request to:', endpoint)
    
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('API Response:', data)
    return data
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// Fonctions API
export async function getChats() {
  try {
    return await apiRequest(API_ENDPOINTS.chats)
  } catch (error) {
    console.error('Erreur getChats:', error)
    // Retourner des données par défaut en cas d'erreur
    return getDefaultChats()
  }
}

export async function updateChat(chatId, chatData) {
  try {
    return await apiRequest(`${API_ENDPOINTS.chats}/${chatId}`, {
      method: 'PATCH',
      body: JSON.stringify(chatData)
    })
  } catch (error) {
    console.error('Erreur updateChat:', error)
    throw error
  }
}

export async function createUser(userData) {
  try {
    return await apiRequest(API_ENDPOINTS.chats, {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  } catch (error) {
    console.error('Erreur createUser:', error)
    throw error
  }
}

// Données par défaut si l'API ne fonctionne pas
function getDefaultChats() {
  return [
    {
      id: 1,
      name: "Zafe",
      phone: "777867740",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastSeen: "en ligne",
      isOnline: true,
      messages: [
        {
          id: 1,
          text: "Salut ! Comment ça va ?",
          timestamp: new Date().toISOString(),
          sender: "Zafe",
          type: "received"
        }
      ],
      unreadCount: 1
    },
    {
      id: 2,
      name: "Abdallah",
      phone: "778123456",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastSeen: "il y a 5 min",
      isOnline: false,
      messages: [
        {
          id: 1,
          text: "Hey ! Tu es là ?",
          timestamp: new Date(Date.now() - 300000).toISOString(),
          sender: "Abdallah",
          type: "received"
        }
      ],
      unreadCount: 1
    },
    {
      id: 3,
      name: "Ousmane Marra",
      phone: "776543210",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastSeen: "hier",
      isOnline: false,
      messages: [
        {
          id: 1,
          text: "Bonne journée !",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          sender: "Ousmane Marra",
          type: "received"
        }
      ],
      unreadCount: 0
    },
    {
      id: 4,
      name: "Maman Dié ODC",
      phone: "775555555",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastSeen: "en ligne",
      isOnline: true,
      messages: [],
      unreadCount: 0
    },
    {
      id: 5,
      name: "Zeynabe Ba",
      phone: "774444444",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastSeen: "il y a 2h",
      isOnline: false,
      messages: [],
      unreadCount: 0
    }
  ]
}
