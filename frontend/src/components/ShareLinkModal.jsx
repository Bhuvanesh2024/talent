import { useState } from "react";
import { CopyIcon, ShareIcon, XIcon, CheckIcon } from "lucide-react";
import toast from "react-hot-toast";

function ShareLinkModal({ isOpen, onClose, sessionId, sessionTitle }) {
  const [copied, setCopied] = useState(false);
  const meetingLink = `${window.location.origin}/session/${sessionId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      toast.success("Meeting link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = meetingLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success("Meeting link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareViaEmail = () => {
    const subject = `Interview Invitation - ${sessionTitle}`;
    const body = `You're invited to join a coding interview session.\n\nSession: ${sessionTitle}\nMeeting Link: ${meetingLink}\n\nClick the link to join the interview.`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShareIcon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Share Interview Link</h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-base-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-base-content/70 mb-1">Session:</p>
          <p className="font-semibold">{sessionTitle}</p>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-base-content/70 mb-2 block">
            Meeting Link:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={meetingLink}
              readOnly
              className="input input-bordered flex-1 text-sm"
            />
            <button
              onClick={handleCopyLink}
              className={`btn ${copied ? 'btn-success' : 'btn-primary'} btn-square`}
              title="Copy link"
            >
              {copied ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <CopyIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleShareViaEmail} className="btn btn-outline flex-1">
            📧 Share via Email
          </button>
          <button onClick={handleCopyLink} className="btn btn-primary flex-1">
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </button>
        </div>

        <div className="mt-6 p-4 bg-info/10 rounded-lg">
          <p className="text-sm text-info">
            💡 <strong>Tip:</strong> Share this link with the candidate to join the interview session.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShareLinkModal;