// Configuration API avec variables explicites
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return ''
  
  const hostname = window.location.hostname
  const isDev = hostname === 'localhost' || hostname === '127.0.0.1'
  
  return isDev ? 'http://localhost:5001' : '/api'
}

const API_BASE_URL = getApiBaseUrl()

export const API_ENDPOINTS = {
  chats: `${API_BASE_URL}/chats`,
  notifications: `${API_BASE_URL}/notifications`,
  calls: `${API_BASE_URL}/calls`,
  status: `${API_BASE_URL}/status`
}

// Données par défaut
const DEFAULT_CHATS = [
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
    messages: [],
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

export async function getChats() {
  try {
    if (typeof window === 'undefined') {
      return DEFAULT_CHATS
    }
    
    const response = await fetch(API_ENDPOINTS.chats)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur getChats:', error)
    return DEFAULT_CHATS
  }
}

export async function updateChat(chatId, chatData) {
  try {
    if (typeof window === 'undefined') {
      return chatData
    }
    
    const response = await fetch(`${API_ENDPOINTS.chats}?id=${chatId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chatData)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erreur updateChat:', error)
    return chatData
  }
}

export async function createUser(userData) {
  try {
    if (typeof window === 'undefined') {
      return userData
    }
    
    const response = await fetch(API_ENDPOINTS.chats, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erreur createUser:', error)
    return userData
  }
}

export async function updateUserStatus(userId, isOnline) {
  try {
    const response = await fetch(`${API_ENDPOINTS.chats}/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isOnline: isOnline,
        lastSeen: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du statut');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur updateUserStatus:', error);
    throw error;
  }
}

export async function addMessage(chatId, message) {
  try {
    const response = await fetch(`${API_ENDPOINTS.chats}/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du message');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur addMessage:', error);
    throw error;
  }
}

export async function getMessages(chatId) {
  try {
    const response = await fetch(`${API_ENDPOINTS.chats}/${chatId}/messages`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des messages');
    }
    
    const chat = await response.json();
    return chat.messages || [];
    
  } catch (error) {
    console.error('Erreur getMessages:', error);
    return [];
  }
}
