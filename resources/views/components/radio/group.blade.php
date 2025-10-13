@php
    // Label size classes based on group size
    $labelSizeClasses = match ($size) {
        'xs' => 'text-xs',
        'sm' => 'text-sm',
        'md' => 'text-base',
        'lg' => 'text-lg',
        'xl' => 'text-xl',
        default => 'text-base'
    };

    $labelClasses = "font-medium text-text mb-2 {$labelSizeClasses}";

    // Description classes
    $descriptionSizeClasses = match ($size) {
        'xs' => 'text-xs',
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-sm',
        'xl' => 'text-base',
        default => 'text-sm'
    };

    $descriptionClasses = "text-text-muted mb-3 {$descriptionSizeClasses}";

    // Layout classes for radio items
    $layoutClasses = match ($layout) {
        'stacked' => 'flex flex-col gap-3',
        'inline' => 'flex flex-wrap gap-3',
        'grid' => 'grid grid-cols-1 md:grid-cols-2 gap-3',
        default => 'flex flex-col gap-3'
    };

    // Variant-specific wrapper classes
    $variantWrapperClasses = match ($variant) {
        'segmented' => 'bg-overlay p-1 rounded-xl border border-border relative',
        'pills' => '',
        'buttons' => '',
        'cards' => '',
        default => ''
    };

    // For segmented variant, override layout to inline
    if ($variant === 'segmented') {
        $layoutClasses = 'flex flex-wrap gap-1';
    }

    // Child styling classes using Tailwind arbitrary variants
    $childStylingClasses = match ($variant) {
        'segmented' => '[&>[data-keys-group-target]]:relative [&>[data-keys-group-target]]:flex [&>[data-keys-group-target]]:items-center [&>[data-keys-group-target]]:justify-center [&>[data-keys-group-target]]:px-4 [&>[data-keys-group-target]]:py-1.5 [&>[data-keys-group-target]]:rounded-lg [&>[data-keys-group-target]]:font-medium [&>[data-keys-group-target]]:leading-tight [&>[data-keys-group-target]]:transition-all [&>[data-keys-group-target]]:duration-200 [&>[data-keys-group-target]]:cursor-pointer [&>[data-keys-group-target]]:text-text-muted [&>[data-keys-group-target]:hover]:text-text [&>[data-keys-group-target]:has(:checked)]:bg-card [&>[data-keys-group-target]:has(:checked)]:text-text [&>[data-keys-group-target]:has(:checked)]:font-semibold [&_[data-radio-indicator]]:hidden',
        'pills' => '[&>[data-keys-group-target]]:inline-flex [&>[data-keys-group-target]]:items-center [&>[data-keys-group-target]]:gap-2 [&>[data-keys-group-target]]:px-3 [&>[data-keys-group-target]]:py-1 [&>[data-keys-group-target]]:rounded-full [&>[data-keys-group-target]]:border [&>[data-keys-group-target]]:border-border [&>[data-keys-group-target]:hover]:border-brand [&>[data-keys-group-target]:has(:checked)]:border-brand [&>[data-keys-group-target]:has(:checked)]:bg-brand/10 [&>[data-keys-group-target]]:transition-all [&>[data-keys-group-target]]:duration-200 [&>[data-keys-group-target]]:cursor-pointer [&_[data-radio-indicator]]:hidden',
        'buttons' => '[&>[data-keys-group-target]]:inline-flex [&>[data-keys-group-target]]:items-center [&>[data-keys-group-target]]:justify-center [&>[data-keys-group-target]]:gap-2 [&>[data-keys-group-target]]:px-4 [&>[data-keys-group-target]]:py-2 [&>[data-keys-group-target]]:rounded-lg [&>[data-keys-group-target]]:border [&>[data-keys-group-target]]:border-border [&>[data-keys-group-target]]:bg-surface [&>[data-keys-group-target]:hover]:bg-hover [&>[data-keys-group-target]:has(:checked)]:bg-brand [&>[data-keys-group-target]:has(:checked)]:text-brand-foreground [&>[data-keys-group-target]:has(:checked)_span]:!text-brand-foreground [&>[data-keys-group-target]:has(:checked)]:border-brand [&>[data-keys-group-target]]:transition-all [&>[data-keys-group-target]]:duration-200 [&>[data-keys-group-target]]:cursor-pointer [&>[data-keys-group-target]]:font-medium [&>[data-keys-group-target]]:shadow-sm [&_[data-radio-indicator]]:hidden',
        default => ''
    };
@endphp

<div {{ $attributes->merge($dataAttributes) }}>
    {{-- Label --}}
    @if($hasLabel())
        <x-keys::label :for="null" :required="$required" :optional="$optional">
            {{ $label }}
        </x-keys::label>
    @endif

    {{-- Description --}}
    @if($hasDescription())
        <p id="{{ $getDescriptionId() }}" class="{{ $descriptionClasses }}">
            {{ $description }}
        </p>
    @endif

    {{-- Radio Group Container --}}
    <div class="{{ $variantWrapperClasses }}" @foreach($ariaAttributes as $key => $val) {{ $key }}="{{ $val }}" @endforeach>
        @if($variant === 'segmented')
            {{-- Sliding indicator for segmented variant (radios only) --}}
            <div
                data-radio-indicator
                class="absolute inset-y-1 left-0 bg-overlay rounded-lg shadow-md transition-all duration-300 pointer-events-none"
                aria-hidden="true"
                style="opacity: 0; width: 0;"
            ></div>
        @endif

        {{-- Radio items container --}}
        <div class="{{ $layoutClasses }} {{ $variant === 'segmented' ? 'relative z-10' : '' }} {{ $childStylingClasses }}">
            {{ $slot }}
        </div>
    </div>

    {{-- Error messages --}}
    @if($showErrors && !is_null($errors))
        <x-keys::error :messages="$errors" class="mt-2" />
    @endif
</div>
