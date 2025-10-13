
@php
    $baseClasses = 'inline-flex items-center gap-0.5 font-mono font-medium leading-none select-none border shadow-sm';

    $sizeClasses = match ($size) {
        'xs' => 'text-[10px] px-1 py-0.5 rounded',
        'sm' => 'text-[11px] px-1.5 py-0.5 rounded',
        'md' => 'text-xs px-2 py-1 rounded-md',
        default => 'text-[11px] px-1.5 py-0.5 rounded'
    };

    $variantClasses = match ($variant) {
        'muted' => 'bg-accent/50 text-accent-foreground/60 border-border/50',
        default => 'bg-accent text-accent-foreground border-border'
    };
@endphp

<kbd {{ $attributes->merge(['class' => "$baseClasses $sizeClasses $variantClasses"])->merge($dataAttributes) }}>
    {{ $keys }}
</kbd>
