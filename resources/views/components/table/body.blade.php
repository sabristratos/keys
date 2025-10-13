@php
    $bodyClasses = match ($variant) {
        'divided' => 'divide-y divide-border bg-card',
        'bordered' => 'divide-y divide-border bg-card border-t border-border',
        default => 'divide-y divide-border bg-card'
    };
@endphp

<tbody {{ $attributes->merge(['class' => $bodyClasses])->merge($dataAttributes) }}>
    {{ $slot }}
</tbody>