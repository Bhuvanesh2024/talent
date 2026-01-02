import { useState } from "react";
import { UserPlusIcon, XIcon, SendIcon, SearchIcon } from "lucide-react";
import toast from "react-hot-toast";

function InviteUserModal({ isOpen, onClose, sessionId, sessionTitle }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const meetingLink = `${window.location.origin}/session/${sessionId}`;

  const handleSendInvitation = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    setIsSending(true);
    
    try {
      const subject = `Interview Invitation - ${sessionTitle}`;
      const defaultMessage = `You're invited to join a coding interview session.\n\nSession: ${sessionTitle}\nMeeting Link: ${meetingLink}\n\nClick the link to join the interview.`;
      const finalMessage = message.trim() || defaultMessage;
      
      const emailBody = `${finalMessage}\n\n---\nThis invitation was sent via TalentIQ Interview Platform`;
      
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);
      
      toast.success(`Invitation sent to ${email}`);
      setEmail("");
      setMessage("");
      onClose();
    } catch (error) {
      toast.error("Failed to send invitation");
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyInviteText = async () => {
    const inviteText = `🎯 Interview Invitation\n\nYou're invited to join: ${sessionTitle}\n\n🔗 Meeting Link: ${meetingLink}\n\n📝 Instructions:\n1. Click the link above\n2. Join the video call\n3. Start coding!\n\nSee you there! 👨‍💻`;
    
    try {
      await navigator.clipboard.writeText(inviteText);
      toast.success("Invitation text copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy invitation text");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserPlusIcon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Invite to Interview</h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-base-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-base-content/70 mb-1">Interview Session:</p>
          <p className="font-semibold">{sessionTitle}</p>
          <p className="text-xs text-base-content/60 mt-1">{meetingLink}</p>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-base-content/70 mb-2 block">
            Candidate Email:
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="candidate@example.com"
              className="input input-bordered w-full pl-10"
            />
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-base-content/70 mb-2 block">
            Custom Message (Optional):
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal message to the invitation..."
            className="textarea textarea-bordered w-full h-24 resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button onClick={handleCopyInviteText} className="btn btn-outline flex-1">
            📋 Copy Invite Text
          </button>
          <button
            onClick={handleSendInvitation}
            disabled={isSending || !email.trim()}
            className="btn btn-primary flex-1 gap-2"
          >
            {isSending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <SendIcon className="w-4 h-4" />
            )}
            Send Invitation
          </button>
        </div>

        <div className="mt-6 p-4 bg-info/10 rounded-lg">
          <p className="text-sm text-info">
            💡 <strong>Tip:</strong> The candidate will receive an email with the meeting link and instructions to join.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InviteUserModal;