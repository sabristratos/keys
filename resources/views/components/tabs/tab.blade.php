@php
    $baseClasses = 'relative z-10 flex items-center justify-center gap-2 font-medium leading-tight transition-colors duration-200 cursor-pointer rounded-lg';

    $sizeClasses = match ($attributes->get('data-size') ?? 'md') {
        'sm' => 'px-3 py-1 text-xs',
        'md' => 'px-4 py-1.5 text-sm',
        'lg' => 'px-5 py-2 text-base',
        default => 'px-4 py-1.5 text-sm'
    };

    // Pills variant uses white text on active tab for contrast with brand background
    if ($variant === 'pills') {
        $stateClasses = $active
            ? 'text-brand-foreground font-semibold'
            : 'text-text-muted hover:text-text';
    } else {
        $stateClasses = $active
            ? 'text-text font-semibold'
            : 'text-text-muted hover:text-text';
    }

    $tabClasses = trim("$baseClasses $sizeClasses $stateClasses");
@endphp

<button
    type="button"
    {{ $attributes->merge(['class' => $tabClasses])->merge($dataAttributes) }}
    role="tab"
    aria-selected="{{ $active ? 'true' : 'false' }}"
    tabindex="{{ $active ? '0' : '-1' }}"
    @if($disabled) disabled @endif
>
    @if($hasIcon())
        <x-keys::icon :name="$icon" class="w-4 h-4 flex-shrink-0" />
    @endif

    {{ $slot }}
</button>
