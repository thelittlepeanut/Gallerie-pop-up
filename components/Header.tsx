"use client";

interface Props {
  onNewAlbum: () => void;
}

export default function Header({ onNewAlbum }: Props) {
  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <span className="text-base font-semibold tracking-wide">
        Ma ville est mon école
      </span>
      <button
        onClick={onNewAlbum}
        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 active:scale-95 transition-all"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Nouvel Album
      </button>
    </header>
  );
}
