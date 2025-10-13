@php
    $wireOnlyAttributes = $attributes->whereStartsWith('wire:');
    $isLivewireEnabled = $wireOnlyAttributes->isNotEmpty();

    if ($isLivewireEnabled) {
        $dataAttributes = array_merge($dataAttributes, [
            'data-livewire-enabled' => 'true',
            'data-livewire-mode' => 'true',
        ]);
        $wireModel = $wireOnlyAttributes->whereStartsWith('wire:model')->first();
        if ($wireModel) {
            $dataAttributes['data-wire-model'] = $wireModel;
            $dataAttributes['data-livewire-property'] = $wireModel;
        }
    }

    $shorthandSpacing = ($isShorthand && $label) ? ' mt-1' : '';

    // Wrapper gets all visual styling for group selector targeting
    $wrapperVisualClasses = 'relative bg-input border border-border rounded-md transition-colors duration-200 hover:border-neutral-300 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20';

    // Button is just transparent click overlay
    $buttonClasses = 'absolute inset-0 cursor-pointer';

    $sizeClasses = match ($size) {
        'sm' => 'min-h-[32px] text-sm',
        'lg' => 'min-h-[42px] text-base',
        default => 'min-h-[38px] text-sm'
    };

    $paddingClasses = match ($size) {
        'sm' => 'px-3 py-1.5',
        'md' => 'px-3 py-2',
        'lg' => 'px-4 py-2.5',
        default => 'px-3 py-2'
    };

    $widthClasses = match ($width) {
        'auto' => 'w-auto',
        'xs' => 'w-20',
        'sm' => 'w-32',
        'md' => 'w-48',
        'lg' => 'w-64',
        'xl' => 'w-80',
        '2xl' => 'w-96',
        'fit' => 'w-fit',
        'full' => 'w-full',
        default => 'w-full'
    };

    $hasErrorBool = $hasError;

    if ($disabled) {
        $stateClasses = 'opacity-50 cursor-not-allowed bg-card text-text-muted';
    } elseif ($hasErrorBool) {
        $stateClasses = 'border-danger focus-within:border-danger focus-within:ring-danger/20 text-text';
    } else {
        $stateClasses = 'text-text';
    }
    $iconSize = match ($size) { 'sm' => 'xs', 'lg' => 'md', default => 'sm' };

    $datePickerAttributes = $attributes->whereDoesntStartWith('wire:')
        ->except(['class'])
        ->merge($dataAttributes)
        ->merge([
            'data-keys-date-picker-config' => json_encode($calendarData),
            'class' => trim("$wrapperVisualClasses $widthClasses $stateClasses$shorthandSpacing")
        ]);

    $overlayClasses = trim("$sizeClasses $paddingClasses");
    $inputClasses = "block w-full rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-1 px-3 py-2 $sizeClasses $stateClasses";
@endphp

{{-- Conditional outer wrapper --}}
@if($isShorthand)
    <div {{ $attributes->only('class') }}>
        @if($label)
            <x-keys::label :for="$id" :required="$required" :optional="$optional">
                {{ $label }}
            </x-keys::label>
        @endif
        <div {{ $datePickerAttributes }}>
@else
    <div {{ $attributes->only('class')->merge($datePickerAttributes) }}>
@endif

    {{-- SHARED CONTENT - NO DUPLICATION --}}

    {{-- Hidden input for form submission --}}
    <input type="hidden"
           name="{{ $name }}"
           value="{{ $getSubmitValue() }}"
           data-date-picker-value
           @if($required ?? false) required @endif
           {{ $wireOnlyAttributes ?? collect() }}>

    @if(!$inline)
        {{-- Popover mode --}}
        <div wire:ignore>
            <x-keys::popover
                :id="'date-picker-dropdown-' . $id"
                placement="bottom-start"
                :manual="false"
            >
                <x-slot name="trigger">
                    <div class="relative">
                        @if($customTrigger)
                            {{-- Custom trigger slot --}}
                            <div class="cursor-pointer" data-date-picker-trigger>
                                {!! $customTrigger !!}
                            </div>
                        @else
                            {{-- Default trigger --}}
                            <button
                                type="button"
                                id="{{ $id }}"
                                popovertarget="date-picker-dropdown-{{ $id }}"
                                class="{{ $buttonClasses }}"
                                data-popover-trigger="date-picker-dropdown-{{ $id }}"
                                data-date-picker-trigger
                                role="combobox"
                                aria-expanded="false"
                                aria-haspopup="dialog"
                                {{ $disabled ? 'disabled aria-disabled=true' : '' }}
                                {{ $required ? 'aria-required=true' : '' }}
                            >
                                <span class="sr-only" data-date-picker-value>
                                    @if($formattedValue)
                                        {{ $formattedValue }}
                                    @else
                                        {{ $placeholder ?: __('keys-ui::keys-ui.datepicker.placeholder') }}
                                    @endif
                                </span>
                            </button>

                            {{-- Visual overlay --}}
                            <div class="relative flex items-center justify-between pointer-events-none {{ $overlayClasses }}">
                                {{-- Left side: Icon + Value --}}
                                <div class="flex items-center gap-2.5 flex-1 min-w-0">
                                    @if($iconLeft)
                                        <div class="text-text-muted pointer-events-none">
                                            <x-keys::icon :name="$iconLeft" :size="$iconSize" />
                                        </div>
                                    @endif

                                    <span class="date-picker-value truncate pointer-events-none text-text" data-date-picker-display>
                                        @if($formattedValue)
                                            {{ $formattedValue }}
                                        @else
                                            <span class="text-text-muted">{{ $placeholder ?: __('keys-ui::keys-ui.datepicker.placeholder') }}</span>
                                        @endif
                                    </span>
                                </div>

                                {{-- Right side: Clear + Calendar Icon --}}
                                <div class="flex items-center gap-2.5">
                                    @if($clearable && !$disabled)
                                        <x-keys::button
                                            type="button"
                                            variant="ghost"
                                            size="xs"
                                            class="opacity-0 pointer-events-auto transition-opacity duration-150"
                                            data-date-picker-clear
                                            aria-label="Clear date"
                                        >
                                            <x-keys::icon name="heroicon-o-x-mark" size="xs" />
                                        </x-keys::button>
                                    @endif

                                    @if($showCalendarIcon && !$iconRight)
                                        <div class="text-text-muted pointer-events-none">
                                            <x-keys::icon
                                                name="heroicon-o-calendar"
                                                :size="$iconSize"
                                                class="date-picker-icon transition-transform duration-200"
                                            />
                                        </div>
                                    @elseif($iconRight)
                                        <div class="text-text-muted pointer-events-none">
                                            <x-keys::icon :name="$iconRight" :size="$iconSize" />
                                        </div>
                                    @endif
                                </div>
                            </div>
                        @endif
                    </div>
                </x-slot>

                <div class="w-auto min-w-full max-w-lg">
                    <x-keys::calendar
                        :value="$value"
                        :minDate="$minDate"
                        :maxDate="$maxDate"
                        :disabledDates="$disabledDates"
                        :size="$size"
                        :disabled="$disabled"
                        :isRange="$isRange"
                        :startDate="$startDate"
                        :endDate="$endDate"
                        :monthsToShow="$monthsToShow"
                        :quickSelectors="$quickSelectorsData"
                        data-date-picker-calendar="true"
                    />
                </div>
            </x-keys::popover>
        </div>
    @else
        {{-- Inline mode - Calendar always visible --}}

        {{-- Selected date/range display --}}
        @if($formattedValue)
            <div class="flex items-center justify-between px-4 py-2 bg-card border border-border-subtle rounded-md mb-3">
                <div class="flex items-center gap-2">
                    <x-keys::icon name="heroicon-o-calendar" size="sm" class="text-brand" />
                    <span class="text-sm font-medium text-text" data-date-picker-display>{{ $formattedValue }}</span>
                </div>
                @if($clearable && !$disabled)
                    <x-keys::button
                        type="button"
                        variant="ghost"
                        size="xs"
                        icon="heroicon-o-x-mark"
                        class="text-text-muted hover:text-danger"
                        data-date-picker-clear
                        aria-label="{{ $isRange ? __('keys-ui::keys-ui.datepicker.clear_range') : __('keys-ui::keys-ui.datepicker.clear') }}"
                    />
                @endif
            </div>
        @endif

        {{-- Calendar component --}}
        <x-keys::calendar
            :value="$value"
            :minDate="$minDate"
            :maxDate="$maxDate"
            :disabledDates="$disabledDates"
            :size="$size"
            :disabled="$disabled"
            :isRange="$isRange"
            :startDate="$startDate"
            :endDate="$endDate"
            :monthsToShow="$monthsToShow"
            :quickSelectors="$quickSelectorsData"
            :fullWidth="true"
            data-date-picker-calendar="true"
        />
    @endif

{{-- Close wrappers based on mode --}}
@if($isShorthand)
        </div>

        {{-- Error messages for shorthand --}}
        @if($showErrors && $hasErrorBool)
            <x-keys::error :messages="$errors" />
        @endif
    </div>
@else
    {{-- Error messages for non-shorthand --}}
    @if($showErrors && $hasErrorBool)
        <x-keys::error :messages="$errors" />
    @endif
    </div>
@endif
