'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/database.types';
import MessagingFeed from './MessagingFeed';

// Define the Message type from the database schema
type Message = Tables<'messages'>;

interface RealtimeMessagesProps {
  serverMessages: Message[];
  projectId: string;
}

export default function RealtimeMessages({ serverMessages, projectId }: RealtimeMessagesProps) {
  const [messages, setMessages] = useState(serverMessages);
  const supabase = createClient();

  useEffect(() => {
    // This syncs the state if the server-rendered messages change for any reason
    setMessages(serverMessages);
  }, [serverMessages]);

  useEffect(() => {
    const channel = supabase
      .channel(`realtime-messages:${projectId}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          
          // To avoid duplicates, check if the message already exists
          setMessages((currentMessages) => {
            if (currentMessages.find(m => m.id === newMessage.id)) {
              return currentMessages;
            }
            return [...currentMessages, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, projectId]);

  return <MessagingFeed messages={messages} />;
}
