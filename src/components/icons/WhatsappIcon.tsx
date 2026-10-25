import { memo } from "react";

interface WhatsappIconProps {
  className?: string;
  size?: number;
}

const WhatsappIcon = memo(function WhatsappIcon({ className = "w-5 h-5", size }: WhatsappIconProps) {
  const sizeStyles = size ? { width: size, height: size } : undefined;

  return (
    <svg
      className={className}
      style={sizeStyles}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2a9.86 9.86 0 0 0-8.3 15.19L2.5 21.7l4.65-1.2A9.96 9.96 0 1 0 12.04 2Zm0 18.1a8.17 8.17 0 0 1-4.15-1.13l-.3-.18-2.76.72.74-2.68-.2-.3a8.22 8.22 0 1 1 6.67 3.57Zm4.5-6.15c-.25-.13-1.5-.74-1.73-.82-.23-.08-.4-.12-.57.12-.17.25-.66.82-.8.99-.15.16-.3.18-.55.06a6.7 6.7 0 0 1-1.97-1.21 7.34 7.34 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49.12-.12.25-.3.37-.45.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.57-1.38-.78-1.89-.2-.5-.41-.43-.57-.44h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.45 1.02 2.62c.13.17 1.77 2.7 4.28 3.79.6.26 1.07.42 1.43.54.6.19 1.15.16 1.58.1.48-.07 1.5-.62 1.71-1.22.21-.6.21-1.12.14-1.22-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  );
});

export default WhatsappIcon;
