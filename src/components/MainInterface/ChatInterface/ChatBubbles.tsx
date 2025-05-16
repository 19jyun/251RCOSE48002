import React from "react";
import "../../../styles/MainInterface/common/ChatBubbles.css";
import { ChatBubbleProps } from "../../../types/message"
import { formatTimestamp } from "../../../utils/ChatInterfaceUtils/dateUtils";

const defaultProfileImage = "/maleprofile.png";

const getSenderName = (sender: ChatBubbleProps["sender"]) => {
  return [sender.first_name, sender.last_name].filter(Boolean).join(" ");
};

const ProfileImage: React.FC<{
  sender: ChatBubbleProps["sender"];
  onClick?: () => void;
}> = ({ sender, onClick }) => (
  <div className="chat-bubble-profile" onClick={onClick}>
    <img src={defaultProfileImage} alt={sender.first_name + sender.last_name} />
  </div>
);

const BubbleContent: React.FC<ChatBubbleProps & { name: string }> = ({
  message,
  timestamp,
  isCurrentUser,
  showProfile,
  isSelectable,
  isSelected,
  onSelect,
  name,
}) => (
  <div className="chat-bubble-container">
    <div
      className={`chat-bubble ${isCurrentUser ? "right" : "left"} ${isSelectable ? "selectable" : ""}`}
      onClick={isSelectable ? onSelect : undefined}
    >
      {isSelectable && (
        <div className={`chat-bubble-selector ${isSelected ? "selected" : ""}`} />
      )}
      <div className="chat-bubble-content">
        {(!isCurrentUser && showProfile) && (
          <div className="chat-bubble-sender">{name}</div>
        )}
        <div className="chat-bubble-message">{message}</div>
        {timestamp && (
          <div className="chat-bubble-timestamp">{formatTimestamp(timestamp)}</div>
        )}
      </div>
    </div>
  </div>
);

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  timestamp,
  isCurrentUser,
  showProfile,
  onProfileClick,
  isSelectable,
  isSelected,
  onSelect,
}) => {
  const name = getSenderName(sender);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const data = { message, sender, timestamp };
    e.dataTransfer.setData("application/json", JSON.stringify(data));
  };

  const handleProfileClick = () => {
    if (onProfileClick) onProfileClick(sender);
  };

  return (
    <div
      className={`chat-bubble-wrapper ${isCurrentUser ? "align-right" : "align-left"}`}
      draggable={sender.id === "search-bot"}
      onDragStart={handleDragStart}
    >
      {showProfile && !isCurrentUser && (
        <ProfileImage sender={sender} onClick={handleProfileClick} />
      )}
      <BubbleContent
        {...{
          message,
          sender,
          timestamp,
          isCurrentUser,
          showProfile,
          isSelectable,
          isSelected,
          onSelect,
          name,
        }}
      />
    </div>
  );
};

export default ChatBubble;