'use client';

import { useClipboard } from '@/hooks/useClipboard';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  disabled?: boolean;
}

export default function CopyButton({
  text,
  label = '복사',
  copiedLabel = '✓ 복사됨',
  className = '',
  disabled = false,
}: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  const handleClick = async () => {
    if (disabled || !text) return;
    await copy(text);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || !text}
      className={`text-xs text-brand-500 hover:text-brand-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
