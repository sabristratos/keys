
@php
    $itemClasses = 'group flex items-center w-full px-2 py-2 text-sm transition-colors duration-150 rounded-md cursor-pointer';

    // Item background state (with checked state)
    $itemStateClasses = $disabled
        ? 'text-text-muted cursor-not-allowed opacity-50'
        : 'text-text hover:bg-hover';

    $itemCheckedClasses = !$disabled ? match ($color) {
        'brand' => 'has-[:checked]:bg-brand-subtle has-[:checked]:text-brand',
        'success' => 'has-[:checked]:bg-success-subtle has-[:checked]:text-success',
        'warning' => 'has-[:checked]:bg-warning-subtle has-[:checked]:text-warning',
        'danger' => 'has-[:checked]:bg-danger-subtle has-[:checked]:text-danger',
        'info' => 'has-[:checked]:bg-info-subtle has-[:checked]:text-info',
        'neutral' => 'has-[:checked]:bg-card has-[:checked]:text-text-muted',
        default => 'has-[:checked]:bg-brand-subtle has-[:checked]:text-brand'
    } : '';

    $iconClasses = 'flex-shrink-0 mr-3';
    $contentClasses = 'flex-1 min-w-0 ml-3';
    $labelTextClasses = 'block text-sm font-medium text-heading';
@endphp

<label {{ $attributes->merge(['class' => "$itemClasses $itemStateClasses $itemCheckedClasses"])->merge($labelAttributes)->merge($dataAttributes) }}>
    @if($hasIcon())
        <x-keys::icon :name="$icon" size="sm" class="{{ $iconClasses }}" />
    @endif

    {{-- Hidden native checkbox input --}}
    <input {{ $attributes->merge(['class' => 'absolute opacity-0 w-0 h-0'])->merge($checkboxAttributes) }}>

    {{-- Custom visual checkbox using shared indicator partial --}}
    @include('keys::partials.checkbox-indicator', [
        'size' => 'sm',
        'color' => $color,
        'disabled' => $disabled,
        'hasError' => false
    ])

    <div class="{{ $contentClasses }}">
        <span class="{{ $labelTextClasses }}">
            {{ $slot }}
        </span>
    </div>
</label>
