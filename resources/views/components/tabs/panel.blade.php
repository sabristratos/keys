@php
    $panelClasses = $active ? '' : 'hidden';
@endphp

<div
    {{ $attributes->merge(['class' => $panelClasses])->merge($dataAttributes) }}
    role="tabpanel"
    tabindex="0"
>
    {{ $slot }}
</div>
