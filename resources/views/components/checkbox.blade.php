@php
    $checkboxAttributes = $attributes->whereStartsWith('wire:model');
    $wrapperAttributes = $attributes->whereDoesntStartWith('wire:model');

    // Touch target padding for small sizes (minimum 44x44px)
    $touchPadding = match ($size) {
        'xs' => 'p-3',
        'sm' => 'p-2',
        default => ''
    };

    // Card padding scales with size
    $cardPadding = match ($size) {
        'xs' => 'p-2',
        'sm' => 'p-3',
        'md' => 'p-4',
        'lg' => 'p-5',
        'xl' => 'p-6',
        default => 'p-4'
    };

    $gap = ($variant === 'card' && !$indicator) ? 'gap-0' : 'gap-3';

    $wrapperBaseClasses = match ($variant) {
        'standard' => "group flex items-center {$gap} {$touchPadding} cursor-pointer transition-transform active:scale-[0.99]",
        'bordered' => "group flex items-center {$gap} {$cardPadding} border border-border rounded-lg hover:has-[:not(:checked)]:border-border-strong hover:has-[:not(:checked)]:bg-hover transition-all duration-200 cursor-pointer active:scale-[0.99]",
        'colored' => "group flex items-center {$gap} {$cardPadding} border-2 rounded-lg transition-all duration-200 cursor-pointer active:scale-[0.99]",
        'card' => "group flex items-center {$gap} {$cardPadding} border border-border rounded-lg hover:has-[:not(:checked)]:border-border-strong hover:has-[:not(:checked)]:bg-hover transition-all duration-200 cursor-pointer active:scale-[0.99]",
        default => "group flex items-center {$gap} {$touchPadding} cursor-pointer transition-transform active:scale-[0.99]"
    };

    if ($disabled) {
        $wrapperBaseClasses = str_replace('cursor-pointer', 'cursor-not-allowed', $wrapperBaseClasses);
        $wrapperBaseClasses = str_replace('active:scale-[0.99]', '', $wrapperBaseClasses);
        $wrapperBaseClasses .= ' opacity-50 grayscale-[0.3]';
    }

    if ($variant === 'colored') {
        $borderColor = match ($color) {
            'brand' => 'border-border has-[:checked]:border-brand has-[:checked]:bg-brand-subtle',
            'success' => 'border-border has-[:checked]:border-success has-[:checked]:bg-success-subtle',
            'warning' => 'border-border has-[:checked]:border-warning has-[:checked]:bg-warning-subtle',
            'danger' => 'border-border has-[:checked]:border-danger has-[:checked]:bg-danger-subtle',
            'neutral' => 'border-border has-[:checked]:border-accent has-[:checked]:bg-accent/10',
            default => 'border-border has-[:checked]:border-brand has-[:checked]:bg-brand-subtle'
        };
        $wrapperBaseClasses .= ' ' . $borderColor;
    }

    if ($variant === 'card') {
        $bgColor = match ($color) {
            'brand' => 'has-[:checked]:bg-brand-subtle has-[:checked]:border-brand',
            'success' => 'has-[:checked]:bg-success-subtle has-[:checked]:border-success',
            'warning' => 'has-[:checked]:bg-warning-subtle has-[:checked]:border-warning',
            'danger' => 'has-[:checked]:bg-danger-subtle has-[:checked]:border-danger',
            'neutral' => 'has-[:checked]:bg-accent/10 has-[:checked]:border-accent',
            default => 'has-[:checked]:bg-brand-subtle has-[:checked]:border-brand'
        };
        $wrapperBaseClasses .= ' ' . $bgColor;
    }

    if ($hasError() && in_array($variant, ['bordered', 'colored', 'card'])) {
        $wrapperBaseClasses .= ' border-danger animate-shake';
    }

    $labelColor = $disabled ? 'muted' : 'text';
    $labelWeight = $variant === 'card' ? 'medium' : 'normal';
@endphp

<label for="{{ $id }}" {{ $wrapperAttributes->merge(['class' => $wrapperBaseClasses])->merge($dataAttributes) }} data-keys-group-target>
    {{-- Hidden native checkbox input --}}
    <input
        type="checkbox"
        id="{{ $id }}"
        name="{{ $name }}"
        value="{{ $value }}"
        {{ $checked ? 'checked' : '' }}
        {{ $disabled ? 'disabled' : '' }}
        {{ $required ? 'required' : '' }}
        {{ $indeterminate ? 'data-indeterminate=true' : '' }}
        class="absolute opacity-0 w-0 h-0"
        @foreach($ariaAttributes as $key => $val)
            {{ $key }}="{{ $val }}"
        @endforeach
        {{ $checkboxAttributes }}
    />

    @if($indicator)
        {{-- Custom visual checkbox using shared indicator partial --}}
        @include('keys::partials.checkbox-indicator', [
            'size' => $size,
            'color' => $color,
            'disabled' => $disabled,
            'hasError' => $hasError()
        ])
    @endif

    @if($hasContent())
        <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                    @if($isCard())

                        @if($icon)
                            <div class="flex items-center gap-2 mb-1 text-text-muted">
                                <x-keys::icon :name="$icon" :size="$iconSize()" class="shrink-0" />
                                @if($title)
                                    <x-keys::text element="span" :size="$labelSize" :color="$labelColor" :weight="$labelWeight" class="flex items-center gap-2">
                                        <span>
                                            {{ $title }}
                                            @if($required)
                                                <span class="text-danger ml-1">*</span>
                                            @endif
                                        </span>
                                        @if($slot->isNotEmpty())
                                            {{ $slot }}
                                        @endif
                                    </x-keys::text>
                                @endif
                            </div>
                        @elseif($title)
                            <x-keys::text element="span" :size="$labelSize" :color="$labelColor" :weight="$labelWeight" class="flex items-center gap-2 mb-1">
                                <span>
                                    {{ $title }}
                                    @if($required)
                                        <span class="text-danger ml-1">*</span>
                                    @endif
                                </span>
                                @if($slot->isNotEmpty())
                                    {{ $slot }}
                                @endif
                            </x-keys::text>
                        @endif

                        @if($description)
                            <x-keys::text id="{{ $id }}-desc" size="sm" color="muted">{{ $description }}</x-keys::text>
                        @endif
                    @else

                        @if($label)
                            <x-keys::text element="span" :size="$labelSize" :color="$labelColor" :weight="$labelWeight" class="flex items-center gap-2">
                                @if($icon)
                                    <x-keys::icon :name="$icon" :size="$iconSize()" class="shrink-0" />
                                @endif
                                <span>
                                    {{ $label }}
                                    @if($required)
                                        <span class="text-danger ml-1">*</span>
                                    @endif
                                </span>
                                @if($slot->isNotEmpty())
                                    {{ $slot }}
                                @endif
                            </x-keys::text>
                        @endif
                        @if($description)
                            <x-keys::text id="{{ $id }}-desc" size="sm" color="muted" class="mt-1">{{ $description }}</x-keys::text>
                        @endif
                    @endif
                </div>

                {{-- Error icon for card variant --}}
                @if($hasError() && $isCard())
                    <div class="shrink-0 animate-bounce">
                        <x-keys::icon name="heroicon-o-exclamation-circle" size="sm" class="text-danger" />
                    </div>
                @endif

                @if($hasActions())
                    <div class="flex items-center gap-1 ml-2">
                        @foreach($computedActionData as $action)
                            <div class="input-action"
                                 data-action="{{ $action['data_action'] }}"
                                 @if($action['data_url']) data-url="{{ $action['data_url'] }}" @endif
                                 @if($action['data_icon_toggle']) data-icon-toggle="{{ $action['data_icon_toggle'] }}" @endif
                                 @if($action['data_icon_success']) data-icon-success="{{ $action['data_icon_success'] }}" @endif
                                 @if($action['data_label_toggle']) data-label-toggle="{{ $action['data_label_toggle'] }}" @endif
                                 @if($action['data_label_success']) data-label-success="{{ $action['data_label_success'] }}" @endif>
                                <x-keys::button
                                    :variant="$actionVariant"
                                    :size="$computedActionSize"
                                    :icon="$action['icon']"
                                    :data-icon-default="$action['data_icon_default']"
                                    :data-icon-toggle="$action['data_icon_toggle']"
                                    :data-icon-success="$action['data_icon_success']"
                                    :data-label-toggle="$action['data_label_toggle']"
                                    :data-label-success="$action['data_label_success']">
                                    <span class="sr-only">{{ $action['label'] }}</span>
                                    @if($action['is_multi_state'])
                                        <span class="button-icon-default {{ $action['icon'] === $action['data_icon_default'] ? 'opacity-100' : 'opacity-0' }} transition-opacity duration-200">
                                            <x-keys::icon :name="$action['data_icon_default']" :size="$computedActionSize" />
                                        </span>
                                        @if($action['data_icon_toggle'])
                                            <span class="button-icon-toggle {{ $action['icon'] === $action['data_icon_toggle'] ? 'opacity-100' : 'opacity-0' }} absolute inset-0 flex items-center justify-center transition-all duration-200">
                                                <x-keys::icon :name="$action['data_icon_toggle']" :size="$computedActionSize" />
                                            </span>
                                        @endif
                                        @if($action['data_icon_success'])
                                            <span class="button-icon-success opacity-0 absolute inset-0 flex items-center justify-center transition-all duration-200">
                                                <x-keys::icon :name="$action['data_icon_success']" :size="$computedActionSize" />
                                            </span>
                                        @endif
                                    @endif
                                </x-keys::button>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        </div>
    @endif
</label>

@if($showErrors && !is_null($errors))
    <x-keys::error :messages="$errors" />
@endif

