import { useState } from "react";
import { Heart } from "lucide-react";
import { hasUserLiked, toggleProjectLike } from "../../lib/projectLikes";
interface ProjectLikeButtonProps {
  slug: string;
  projectName?: string;
  variant?: "default" | "compact" | "badge";
  className?: string;
}
export function ProjectLikeButton({
  slug,
  projectName = "project",
  className = "",
}: ProjectLikeButtonProps) {
  const [liked, setLiked] = useState(() => hasUserLiked(slug));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const like = async () => {
    setPending(true);
    setError("");
    try {
      const result = await toggleProjectLike(slug);
      setLiked(result.isLiked);
    } catch {
      setError("Unable to save your preference. Try again.");
    } finally {
      setPending(false);
    }
  };
  return (
    <div className={className}>
      <button
        className="button"
        onClick={like}
        disabled={pending || liked}
        aria-pressed={liked}
        aria-label={`Appreciate ${projectName}`}
      >
        <Heart size={16} fill={liked ? "currentColor" : "none"} />
        {pending
          ? "Saving…"
          : liked
            ? "Liked on this device"
            : "Appreciate this project"}
      </button>
      {error && <p role="status">{error}</p>}
    </div>
  );
}
