function base(props, path) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {path}
    </svg>
  )
}

export const PlayIcon = (props) => base(props, <polygon points="6 3 20 12 6 21 6 3" fill="currentColor" stroke="none" />)
export const PauseIcon = (props) => base(props, <g fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></g>)
export const NextIcon = (props) => base(props, <g fill="currentColor" stroke="none"><polygon points="5 4 15 12 5 20 5 4" /><rect x="17" y="4" width="3" height="16" rx="1" /></g>)
export const PrevIcon = (props) => base(props, <g fill="currentColor" stroke="none"><polygon points="19 4 9 12 19 20 19 4" /><rect x="4" y="4" width="3" height="16" rx="1" /></g>)
export const SearchIcon = (props) => base(props, <g><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></g>)
export const HomeIcon = (props) => base(props, <g><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v10h14V10" /></g>)
export const BookIcon = (props) => base(props, <g><path d="M4 5c2-1 5-1 7 0v14c-2-1-5-1-7 0V5z" /><path d="M20 5c-2-1-5-1-7 0v14c2-1 5-1 7 0V5z" /></g>)
export const BookmarkIcon = ({ filled, ...props }) => base(props, <path d="M6 3h12v18l-6-4-6 4V3z" fill={filled ? 'currentColor' : 'none'} />)
export const SettingsIcon = (props) => base(props, <g><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" /></g>)
export const SpeakerIcon = (props) => base(props, <g><path d="M3 10v4h4l5 4V6l-5 4H3z" /><path d="M17 9a4 4 0 0 1 0 6" /></g>)
export const PlusIcon = (props) => base(props, <g><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></g>)
export const MinusIcon = (props) => base(props, <line x1="5" y1="12" x2="19" y2="12" />)
export const LoopIcon = (props) => base(props, <g><path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></g>)
