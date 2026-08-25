import { useEffect, useState } from 'react';
import { Flag, Send, X } from 'lucide-react';
import { VisitorAvatar } from '../ui/VisitorAvatar';
import {
  createMessage,
  fetchMessages,
  reportItem,
  subscribeToMessages,
} from '../../lib/collab/service';
import { MAX_MESSAGE_LENGTH } from '../../lib/collab/constants';
import type { CollabMessage } from '../../lib/collab/types';

type Props = {
  visitorId: string;
  visitorName: string;
  visitorAvatar: string;
  onClose: () => void;
  onMessagesChange?: (messages: CollabMessage[]) => void;
};

export function VisitorWallOverlay({ visitorId, visitorName, visitorAvatar, onClose, onMessagesChange }: Props) {
  const [messages, setMessages] = useState<CollabMessage[]>([]);
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let active = true;
    fetchMessages().then((items) => {
      if (active) {
        setMessages(items);
        onMessagesChange?.(items);
      }
    });
    const channel = subscribeToMessages(
      (item) => setMessages((current) => {
        const next = current.some((existing) => existing.id === item.id)
          ? current
          : [item, ...current].slice(0, 24);
        onMessagesChange?.(next);
        return next;
      }),
      (item, id) => setMessages((current) => {
        const next = item
          ? current.map((existing) => existing.id === id ? item : existing)
          : current.filter((existing) => existing.id !== id);
        onMessagesChange?.(next);
        return next;
      }),
    );
    return () => {
      active = false;
      channel?.unsubscribe();
    };
  }, [onMessagesChange]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const clean = message.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!clean || sending) return;
    setSending(true);
    const saved = await createMessage(visitorId, visitorName, visitorAvatar, clean);
    setMessages((current) => {
      const next = current.some((item) => item.id === saved.id) ? current : [saved, ...current].slice(0, 24);
      onMessagesChange?.(next);
      return next;
    });
    setMessage('');
    setSending(false);
    if (saved.isLocal) setNotice('Saved only on this device while live saving is unavailable.');
  };

  const handleReport = async (item: CollabMessage) => {
    const reported = await reportItem('message', item.id);
    setNotice(reported ? 'Thanks. The message was sent for review.' : 'This local-only message cannot be reported.');
  };

  return (
    <div className="visitor-wall-overlay" role="dialog" aria-modal="true" aria-labelledby="visitor-wall-title">
      <header>
        <div>
          <p>VISITOR WALL</p>
          <h1 id="visitor-wall-title">Notes from people who stopped by.</h1>
        </div>
        <button type="button" aria-label="Close visitor wall" onClick={onClose}><X /></button>
      </header>

      <div className="visitor-wall-grid">
        {messages.length === 0 ? (
          <p className="visitor-wall-empty-state">Be the first to leave something here.</p>
        ) : messages.map((item) => (
          <article key={item.id}>
            <div>
              <VisitorAvatar displayName={item.ownerName} avatarUrl={item.ownerAvatar} size="xs" />
              <span>{item.ownerName}</span>
              {item.ownerId !== visitorId && (
                <button type="button" aria-label={`Report message from ${item.ownerName}`} onClick={() => void handleReport(item)}><Flag /></button>
              )}
            </div>
            <p>“{item.message}”</p>
            <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</time>
          </article>
        ))}
      </div>

      <form className="visitor-wall-form" onSubmit={handleSubmit}>
        <label htmlFor="visitor-message">Leave a short message</label>
        <div>
          <input
            id="visitor-message"
            value={message}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="A note for the wall…"
          />
          <button type="submit" disabled={!message.trim() || sending}><Send /> Post</button>
        </div>
        <small>{message.length}/{MAX_MESSAGE_LENGTH} · Links are not allowed</small>
      </form>

      {notice && <button type="button" className="visitor-wall-notice" onClick={() => setNotice('')}>{notice} <X /></button>}
    </div>
  );
}

