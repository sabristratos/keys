@props(['computedPopoverClasses', 'computedArrowClasses', 'computedTitleClasses', 'popoverAttributes', 'triggerAttributes', 'contentAttributes', 'title'])

<div {{ $attributes->merge($popoverAttributes)->merge(['class' => $computedPopoverClasses]) }}>
    @if($title)
        <div id="{{ $id }}-title" class="{{ $computedTitleClasses }}">
            {{ $title }}
        </div>
    @endif

    <div {{ collect($contentAttributes)->map(fn($value, $key) => $key . '="' . $value . '"')->implode(' ') }}>
        {{ $slot }}
    </div>

    @if($arrow)
        <div class="{{ $computedArrowClasses }}" data-popper-arrow></div>
    @endif
</div>

<style>
    /* Popover visibility and animations */
    .keys-popover {
        opacity: 0;
        visibility: hidden;
        transform: scale(0.95) translateZ(0);
        transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                    visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        z-index: 9999;
        backdrop-filter: none;
    }

    .keys-popover[data-show="true"] {
        opacity: 1;
        visibility: visible;
        transform: scale(1) translateZ(0);
        pointer-events: auto;
    }

    .keys-popover[data-show="false"] {
        opacity: 0;
        visibility: hidden;
        transform: scale(0.95) translateZ(0);
        pointer-events: none;
    }

    /* Arrow styling for different placements */
    .keys-popover-arrow {
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        z-index: -1;
    }

    /* Arrow positioning and rotation based on placement */
    .keys-popover[data-placement^="top"] .keys-popover-arrow {
        bottom: -5px;
        transform: rotate(45deg);
    }

    .keys-popover[data-placement^="bottom"] .keys-popover-arrow {
        top: -5px;
        transform: rotate(45deg);
    }

    .keys-popover[data-placement^="left"] .keys-popover-arrow {
        right: -5px;
        transform: rotate(45deg);
    }

    .keys-popover[data-placement^="right"] .keys-popover-arrow {
        left: -5px;
        transform: rotate(45deg);
    }

    /* Arrow centering for main placements */
    .keys-popover[data-placement="top"] .keys-popover-arrow,
    .keys-popover[data-placement="bottom"] .keys-popover-arrow {
        left: 50%;
        margin-left: -4px;
    }

    .keys-popover[data-placement="left"] .keys-popover-arrow,
    .keys-popover[data-placement="right"] .keys-popover-arrow {
        top: 50%;
        margin-top: -4px;
    }

    /* Arrow positioning for start/end variants */
    .keys-popover[data-placement$="-start"] .keys-popover-arrow {
        left: 12px;
    }

    .keys-popover[data-placement$="-end"] .keys-popover-arrow {
        right: 12px;
    }

    .keys-popover[data-placement^="left"][data-placement$="-start"] .keys-popover-arrow,
    .keys-popover[data-placement^="right"][data-placement$="-start"] .keys-popover-arrow {
        top: 12px;
        left: auto;
        right: auto;
    }

    .keys-popover[data-placement^="left"][data-placement$="-end"] .keys-popover-arrow,
    .keys-popover[data-placement^="right"][data-placement$="-end"] .keys-popover-arrow {
        bottom: 12px;
        top: auto;
        left: auto;
        right: auto;
    }

    /* Hover states for triggers */
    [data-popover-trigger="hover"]:hover {
        cursor: pointer;
    }

    [data-popover-trigger="click"] {
        cursor: pointer;
    }

    /* Focus states */
    [data-popover-trigger="focus"]:focus {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
    }

    /* Size-specific max-width constraints */
    .keys-popover[data-size="sm"] {
        max-width: 16rem; /* 256px */
    }

    .keys-popover[data-size="md"] {
        max-width: 24rem; /* 384px */
    }

    .keys-popover[data-size="lg"] {
        max-width: 32rem; /* 512px */
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .keys-popover {
            max-width: calc(100vw - 2rem);
            margin: 0 1rem;
        }

        .keys-popover[data-size="lg"] {
            max-width: calc(100vw - 2rem);
        }
    }

    /* Animation variants for different triggers */
    .keys-popover[data-trigger="hover"] {
        transition-duration: 0.15s;
    }

    .keys-popover[data-trigger="click"] {
        transition-duration: 0.2s;
    }

    .keys-popover[data-trigger="focus"] {
        transition-duration: 0.15s;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .keys-popover {
            transition-duration: 0.05s;
            transform: none;
        }

        .keys-popover[data-show="false"] {
            transform: none;
        }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .keys-popover {
            border-width: 2px;
        }

        .keys-popover-arrow {
            border-width: 2px;
        }
    }

    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
        .keys-popover {
            backdrop-filter: blur(8px);
        }
    }

    /* Focus management for interactive content */
    .keys-popover[data-show="true"] {
        isolation: isolate;
    }

    /* Ensure popover content is scrollable if needed */
    .keys-popover {
        overflow-wrap: break-word;
        word-wrap: break-word;
    }

    .keys-popover[data-size="lg"] {
        max-height: 70vh;
        overflow-y: auto;
    }

    /* Custom scrollbar for large popovers */
    .keys-popover[data-size="lg"]::-webkit-scrollbar {
        width: 6px;
    }

    .keys-popover[data-size="lg"]::-webkit-scrollbar-track {
        background: var(--color-surface);
    }

    .keys-popover[data-size="lg"]::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 3px;
    }

    .keys-popover[data-size="lg"]::-webkit-scrollbar-thumb:hover {
        background: var(--color-muted);
    }

    /* Loading state for async content */
    .keys-popover[data-loading="true"] {
        pointer-events: none;
    }

    .keys-popover[data-loading="true"]::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid var(--color-muted);
        border-top: 2px solid var(--color-brand);
        border-radius: 50%;
        animation: keys-popover-spin 1s linear infinite;
    }

    @keyframes keys-popover-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Backdrop for modal-like behavior (optional) */
    .keys-popover-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        z-index: 9998;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, visibility 0.2s ease;
    }

    .keys-popover-backdrop[data-show="true"] {
        opacity: 1;
        visibility: visible;
    }
</style>