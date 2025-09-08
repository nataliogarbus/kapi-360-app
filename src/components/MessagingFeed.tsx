import { Tables } from '@/lib/database.types';

// Define the Message type from the database schema
type Message = Tables<'messages'>;

interface MessagingFeedProps {
  messages: Message[];
}

export default function MessagingFeed({ messages }: MessagingFeedProps) {
  return (
    <div className="space-y-6">
      {messages.map((message) => {
        // FIXME: The logic to determine the sender is a placeholder.
        // The original 'author_role' property does not exist on the message object.
        const isKapiSender = false; 

        return (
          <div 
            key={message.id}
            className={`flex items-start gap-4 ${isKapiSender ? '' : 'flex-row-reverse'}`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white`}>
              {isKapiSender ? 'K' : 'U'}
            </div>
            <div className={`w-full max-w-xl p-4 rounded-lg shadow-md ${isKapiSender ? 'bg-gray-800' : 'bg-indigo-900/80'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">
                  {isKapiSender ? 'Equipo Kapi' : 'Tú'}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(message.created_at).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
