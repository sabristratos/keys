@php
    // Compute values needed for rendering
    $elementType = $isLink() ? ($disabled ? 'span' : 'a') : 'button';
    $slotContent = $slot->toHtml();
    $isIconOnly = $isIconOnly($slotContent);
    $isMultiState = $isMultiState();
    $dataAttributes = array_merge(
        $getDataAttributes(),
        $getDataAttributesForSlot($slotContent)
    );

    // Base classes for all buttons
    $baseClasses = 'inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer';
    $baseClasses .= ' transition-all duration-150 ease-linear';
    $baseClasses .= ' focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus';
    $baseClasses .= ' *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:transition-all *:data-icon:duration-150';

    // Common classes shared by all button variants
    $commonClasses = 'active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

    // Build color-specific variant classes
    $colorClasses = match ($color) {
        'primary' => match ($variant) {
            'solid' => 'bg-brand shadow-xs text-brand-foreground hover:bg-brand-hover active:bg-brand-active',
            'outlined' => 'bg-transparent text-brand border border-brand hover:bg-brand hover:text-brand-foreground',
            'ghost' => 'bg-transparent text-brand hover:bg-brand/10 active:bg-brand/20',
            'subtle' => 'bg-brand-subtle text-brand hover:bg-brand-subtle-hover active:bg-brand-subtle-active',
            default => 'bg-brand shadow-xs text-brand-foreground hover:bg-brand-hover active:bg-brand-active',
        },

        'secondary' => match ($variant) {
            'solid' => 'bg-accent text-text border border-border hover:bg-accent-hover active:bg-accent-active',
            'outlined' => 'bg-transparent text-text border border-border hover:bg-accent active:bg-accent-hover',
            'ghost' => 'bg-transparent text-text hover:bg-accent active:bg-accent-hover',
            'subtle' => 'bg-accent text-text hover:bg-accent-hover active:bg-accent-active',
            default => 'bg-accent text-text border border-border hover:bg-accent-hover active:bg-accent-active',
        },

        'danger' => match ($variant) {
            'solid' => 'bg-danger shadow-xs text-danger-foreground hover:bg-danger-hover active:bg-danger-active',
            'outlined' => 'bg-transparent text-danger border border-danger hover:bg-danger hover:text-danger-foreground',
            'ghost' => 'bg-transparent text-danger hover:bg-danger/10 active:bg-danger/20',
            'subtle' => 'bg-danger-subtle text-danger hover:bg-danger-subtle-hover active:bg-danger-subtle-active',
            default => 'bg-danger shadow-xs text-danger-foreground hover:bg-danger-hover active:bg-danger-active',
        },

        'warning' => match ($variant) {
            'solid' => 'bg-warning shadow-xs text-warning-foreground hover:bg-warning-hover active:bg-warning-active',
            'outlined' => 'bg-transparent text-warning border border-warning hover:bg-warning hover:text-warning-foreground',
            'ghost' => 'bg-transparent text-warning hover:bg-warning/10 active:bg-warning/20',
            'subtle' => 'bg-warning-subtle text-warning hover:bg-warning-subtle-hover active:bg-warning-subtle-active',
            default => 'bg-warning shadow-xs text-warning-foreground hover:bg-warning-hover active:bg-warning-active',
        },

        'success' => match ($variant) {
            'solid' => 'bg-success shadow-xs text-success-foreground hover:bg-success-hover active:bg-success-active',
            'outlined' => 'bg-transparent text-success border border-success hover:bg-success hover:text-success-foreground',
            'ghost' => 'bg-transparent text-success hover:bg-success/10 active:bg-success/20',
            'subtle' => 'bg-success-subtle text-success hover:bg-success-subtle-hover active:bg-success-subtle-active',
            default => 'bg-success shadow-xs text-success-foreground hover:bg-success-hover active:bg-success-active',
        },

        'info' => match ($variant) {
            'solid' => 'bg-info shadow-xs text-info-foreground hover:bg-info-hover active:bg-info-active',
            'outlined' => 'bg-transparent text-info border border-info hover:bg-info hover:text-info-foreground',
            'ghost' => 'bg-transparent text-info hover:bg-info/10 active:bg-info/20',
            'subtle' => 'bg-info-subtle text-info hover:bg-info-subtle-hover active:bg-info-subtle-active',
            default => 'bg-info shadow-xs text-info-foreground hover:bg-info-hover active:bg-info-active',
        },

        default => match ($variant) {
            'solid' => 'bg-brand shadow-xs text-brand-foreground hover:bg-brand-hover active:bg-brand-active',
            'outlined' => 'bg-transparent text-brand border border-brand hover:bg-brand hover:text-brand-foreground',
            'ghost' => 'bg-transparent text-brand hover:bg-brand/10 active:bg-brand/20',
            'subtle' => 'bg-brand-subtle text-brand hover:bg-brand-subtle-hover active:bg-brand-subtle-active',
            default => 'bg-brand shadow-xs text-brand-foreground hover:bg-brand-hover active:bg-brand-active',
        },
    };

    $variantClasses = "$commonClasses $colorClasses";

    $sizeClasses = $isIconOnly
        ? match ($size) {
            'xs' => 'p-1 text-xs rounded-md',
            'sm' => 'p-1.5 text-sm rounded-lg',
            'md' => 'p-2 text-sm rounded-lg',
            'lg' => 'p-2.5 text-base rounded-xl',
            'xl' => 'p-3.5 text-lg rounded-2xl',
            default => 'p-2 text-sm rounded-lg'
        }
        : match ($size) {
            'xs' => 'px-2 py-0.5 text-xs rounded-sm',
            'sm' => 'px-2.5 py-1 text-sm rounded-md',
            'md' => 'px-3.5 py-1.5 text-sm rounded-md',
            'lg' => 'px-5 py-2 text-base rounded-lg',
            'xl' => 'px-7 py-2.5 text-lg rounded-lg',
            default => 'px-3.5 py-1.5 text-sm rounded-md'
        };

    // Disabled classes moved to commonClasses (line 19) - this variable is now redundant but kept for compatibility
    $disabledClasses = '';

    // Loading state classes no longer needed - loading state handled by disabled classes
    $loadingClasses = '';

    $iconSize = $isIconOnly
        ? match ($size) {
            'xs' => 'sm',
            'sm' => 'md',
            'md' => 'md',
            'lg' => 'lg',
            'xl' => 'xl',
            default => 'md'
        }
        : match ($size) {
            'xs' => 'xs',
            'sm' => 'sm',
            'md' => 'sm',
            'lg' => 'md',
            'xl' => 'lg',
            default => 'sm'
        };

@endphp

<{{ $elementType }}
    @if($elementType === 'button') type="{{ $type }}" @endif
    {{ $attributes->class([
        $baseClasses,
        $variantClasses,
        $sizeClasses,
        $disabledClasses,
        $loadingClasses,
    ]) }}
    @foreach($dataAttributes as $key => $value)
        {{ $key }}="{{ $value }}"
    @endforeach
    @if($elementType === 'a') href="{{ $href }}" @endif
    @if($elementType === 'button' && ($disabled || $loading)) disabled @endif
    @if($elementType === 'button' && $popovertarget) popovertarget="{{ $popovertarget}}" @endif
    data-keys-group-target
>
    @if($loading)
        <x-keys::loading :animation="$loadingAnimation" :size="$iconSize" class="mr-2" />
    @elseif($iconLeft && !$loading)
        @if($isMultiState)
            <div class="relative {{ $isIconOnly ? '' : 'mr-2' }} flex-shrink-0">
                <x-keys::icon
                    :name="$iconLeft"
                    :size="$iconSize"
                    class="button-icon-default transition-all duration-200"
                />

                @if($iconToggle)
                    <x-keys::icon
                        :name="$iconToggle"
                        :size="$iconSize"
                        class="button-icon-toggle absolute inset-0 opacity-0 transition-all duration-200"
                    />
                @endif

                @if($iconSuccess)
                    <x-keys::icon
                        :name="$iconSuccess"
                        :size="$iconSize"
                        class="button-icon-success absolute inset-0 opacity-0 transition-all duration-200 text-success"
                    />
                @endif
            </div>
        @else
            <x-keys::icon :name="$iconLeft" :size="$iconSize" class="{{ $isIconOnly ? '' : 'mr-2' }}" />
        @endif
    @endif

    @unless($isIconOnly)
        <span data-text="true" class="px-0.5 transition-all duration-150">{{ $slot }}</span>
    @endunless

    @if($iconRight && !$loading && !$isIconOnly)
        <x-keys::icon :name="$iconRight" :size="$iconSize" class="ml-2" />
    @endif
</{{ $elementType }}>
