export interface ChatPerson {
    id: string
    name: string
    age: number
    avatar: string
    isOnline: boolean
    lastMessage: string
    timestamp: string
    unreadCount?: number
  }
  
  export interface Message {
    id: string
    content: string
    sender: "user" | "ai"
    timestamp: Date
    isTyping?: boolean
  }
  
  export const chatPersons: ChatPerson[] = [
    {
      id: "1",
      name: "Rina",
      age: 23,
      avatar: "/custom/avatar1.png?height=40&width=40",
      isOnline: true,
      lastMessage: "What can I get for you to start with?",
      timestamp: "2m ago",
    },
    {
      id: "2",
      name: "Sofia",
      age: 25,
      avatar: "/custom/avatar2.png?height=40&width=40",
      isOnline: true,
      lastMessage: "Thanks for the wonderful evening!",
      timestamp: "1h ago",
    },
   
  ]
  
  export const initialMessages: Message[] = [
    
    {
      id: "1",
      content: "You have booked Rina to be your private hostess at her club.",
      sender: "ai",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "2",
      content: "What can I get for you to start with? Do you want a drink or some special attention?",
      sender: "ai",
      timestamp: new Date(Date.now() - 180000),
    },
  ]
  
  export const aiResponses = [
    "Perfect choice! I'll make sure you have the best experience tonight. Let me get that ready for you right away.",
    "I love your style! That sounds like exactly what we need to make this evening unforgettable.",
    "I know just the thing. You're going to love what I have in mind for us.",
    "Great idea! I'll take care of everything. Just sit back, relax, and let me handle the details.",
    "You have excellent taste! I'll make sure everything is perfect for our time together.",
    "That's a wonderful idea! I can see you know how to enjoy the finer things in life.",
    "I was hoping you'd ask for that. It's one of my specialties.",
    "I'm so glad you mentioned that. I have something very special in mind for you.",
    "Perfect timing! I was just thinking the same thing. Let me take care of you properly.",
    "You read my mind! That's exactly what I was going to suggest. You have great instincts.",
    "I love a person who knows what they want. Consider it done, and I'll add a little extra surprise.",
    "That sounds divine! I'll make sure every detail is perfect for our time together.",
    "Excellent choice! I can tell you have sophisticated taste. This is going to be amazing.",
    "I'm excited to make that happen for you. You're going to love what I have planned.",
    "That's exactly what I was hoping you'd say. I have some ideas that will blow your mind.",
  ]
  
  export const initialSuggestions = [
    {
      id: "1",
      text: "I'd love to start off with a drink. What do you recommend?",
    },
    {
      id: "2",
      text: "Tell me more about the club's atmosphere",
    },
   
  ]
  
  export const getRandomAiResponse = (): string => {
    return aiResponses[Math.floor(Math.random() * aiResponses.length)]
  }
  