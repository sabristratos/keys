@php
    $livewireAttributes = $attributes->whereStartsWith('wire:');
    $wrapperAttributes = $attributes->whereDoesntStartWith('wire:');

    $selectAttributes = $wrapperAttributes
        ->except(['class'])
        ->merge(array_filter([
            'data-select' => 'true', // Keep original for compatibility
        ], fn($value) => !is_null($value)))
        ->merge($dataAttributes); // Add comprehensive data attributes

    $hiddenInputName = $multiple ? ($name . '[]') : $name;
@endphp

@if($isShorthand())
    <div {{ $wrapperAttributes->only('class') }}>
        <x-keys::label :for="$uniqueId" :required="$required" :optional="$optional">
            {{ $label }}
        </x-keys::label>

        <div class="relative mt-1" {{ $selectAttributes }}>
            @include('keys::partials.select-field', ['livewireAttributes' => $livewireAttributes])
        </div>

        @if($showErrors && !is_null($errors))
            <x-keys::error :messages="$errors" />
        @endif
    </div>
@else
    <div class="relative" {{ $wrapperAttributes->only('class') }} {{ $selectAttributes }}>
        @include('keys::partials.select-field', ['livewireAttributes' => $livewireAttributes])
    </div>
@endif