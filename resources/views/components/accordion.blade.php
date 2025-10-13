@php
    $spacingClasses = match ($spacing) {
        'none' => 'space-y-0',
        'xs' => 'space-y-1',
        'sm' => 'space-y-2',
        'md' => 'space-y-3',
        'lg' => 'space-y-4',
        'xl' => 'space-y-6',
        default => 'space-y-3'
    };

    $containerClasses = "w-full {$spacingClasses}";
@endphp

<div
    id="{{ $id }}"
    class="{{ $containerClasses }}"
    {{ $attributes->merge($dataAttributes) }}
>
    {{ $slot }}
</div>