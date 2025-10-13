@php
    // Variant styling - opinionated combinations
    $variantClasses = match ($variant) {
        'elevated' => 'bg-card shadow-md',
        'solid' => 'bg-card border border-border',
        'outline' => 'bg-transparent border border-border',
        default => 'bg-card shadow-md'
    };

    // Size controls padding for all sections
    $paddingClasses = match ($size) {
        'xs' => 'p-2',
        'sm' => 'p-3',
        'md' => 'p-4',
        'lg' => 'p-6',
        'xl' => 'p-8',
        default => 'p-4'
    };

    // Base card classes
    $baseClasses = 'rounded-xl overflow-hidden';

    // Merge all classes
    $cardClasses = "$baseClasses $variantClasses";
@endphp

<div {{ $attributes->merge(['class' => $cardClasses])->merge($dataAttributes) }}>
    @if($header ?? false)
        <div {{ $header->attributes->merge(['class' => "$paddingClasses border-b border-border"]) }}>
            {{ $header }}
        </div>
    @endif

    <div {{ $slot->attributes->merge(['class' => $paddingClasses]) }}>
        {{ $slot }}
    </div>

    @if($footer ?? false)
        <div {{ $footer->attributes->merge(['class' => "$paddingClasses border-t border-border"]) }}>
            {{ $footer }}
        </div>
    @endif
</div>
