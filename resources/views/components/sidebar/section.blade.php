@once
<style>
/* Sidebar Section - Custom CSS that can't be expressed as Tailwind utilities */

/* Remove webkit details marker (pseudo-element can't be styled with Tailwind) */
details[data-keys-sidebar-section] summary::-webkit-details-marker {
    display: none;
}
</style>
@endonce

@php
    $paddingClasses = match ($variant) {
        'compact' => 'py-1',
        default => 'py-2'
    };

    $headingClasses = 'px-4 py-2';

    // Modern ::details-content animation using Tailwind arbitrary selectors
    $animationClasses = $animated
        ? '[&::details-content]:[block-size:0] [&::details-content]:opacity-0 [&::details-content]:overflow-hidden [&::details-content]:transition-all [&::details-content]:transition-discrete [&::details-content]:duration-300 [&::details-content]:ease-out [&:open::details-content]:[block-size:auto] [&:open::details-content]:opacity-100 motion-reduce:[&::details-content]:transition-none'
        : '';
@endphp

@if($collapsible)
    {{-- Collapsible Section using details/summary --}}
    <details
        id="{{ $id }}"
        class="group {{ $paddingClasses }} {{ $animationClasses }}"
        {{ $collapsed ? '' : 'open' }}
        {{ $attributes->merge($dataAttributes) }}
    >
        @if($heading)
            <summary class="{{ $headingClasses }} flex items-center justify-between cursor-pointer list-none select-none transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 lg:[.sidebar-collapsed_&]:hidden">
                <x-keys::text element="span" size="xs" weight="semibold" color="muted" uppercase class="tracking-wider">{{ $heading }}</x-keys::text>

                @if($icon && $collapsible)
                    <x-keys::icon
                        :name="$icon"
                        size="xs"
                        class="transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-open:rotate-180"
                    />
                @endif
            </summary>
        @endif

        <div class="space-y-0.5 px-2 mt-1">
            {{ $slot }}
        </div>
    </details>
@else
    {{-- Non-collapsible Section --}}
    <div
        id="{{ $id }}"
        class="{{ $paddingClasses }}"
        {{ $attributes->merge($dataAttributes) }}
    >
        @if($heading)
            <div class="{{ $headingClasses }} lg:[.sidebar-collapsed_&]:hidden">
                <x-keys::text element="span" size="xs" weight="semibold" color="muted" uppercase class="tracking-wider">{{ $heading }}</x-keys::text>
            </div>
        @endif

        <div class="space-y-0.5 px-2 {{ $heading ? 'mt-1' : '' }}">
            {{ $slot }}
        </div>
    </div>
@endif
