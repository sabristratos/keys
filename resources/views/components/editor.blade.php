@php
    $wrapperAttributes = $attributes->whereDoesntStartWith('wire:');
    $wireAttributes = $attributes->whereStartsWith('wire:');

    $baseClasses = 'block w-full bg-input border border-border rounded-md transition-colors duration-200';

    $sizeClasses = match ($size) {
        'xs' => 'text-xs',
        'sm' => 'text-sm',
        'md' => 'text-sm',
        'lg' => 'text-base',
        'xl' => 'text-lg',
        default => 'text-sm'
    };

    if ($disabled) {
        $stateClasses = 'opacity-50 cursor-not-allowed bg-panel';
    } elseif ($hasError()) {
        $stateClasses = 'border-danger focus-within:border-danger focus-within:ring-1 focus-within:ring-danger/20';
    } else {
        $stateClasses = 'focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20';
    }

    $editorClasses = trim("$baseClasses $sizeClasses $stateClasses");

    $computedActionSize = match ($actionSize) {
        'xs' => 'xs',
        'sm' => 'sm',
        'md' => 'md',
        default => 'xs'
    };

    $actionContainerClasses = 'absolute top-2 right-2 flex items-center gap-1 z-10';

    $minHeightStyle = $minHeight ? "min-height: {$minHeight}px;" : '';
    $maxHeightStyle = $maxHeight ? "max-height: {$maxHeight}px; overflow-y: auto;" : '';
    $heightStyles = trim($minHeightStyle . ' ' . $maxHeightStyle);

    // Build data attributes string
    $attributesString = '';
    foreach ($dataAttributes as $key => $attrValue) {
        $escapedValue = htmlspecialchars($attrValue, ENT_QUOTES, 'UTF-8');
        $attributesString .= " {$key}=\"{$escapedValue}\"";
    }
@endphp

@if($isShorthand())
    <div {{ $wrapperAttributes->only('class') }}>
        <x-keys::label :for="$id" :required="$required" :optional="$optional">
            {{ $label }}
        </x-keys::label>

        <div class="relative mt-1">
            <div class="{{ $editorClasses }}" style="{{ $heightStyles }}">
                {{-- Quill Editor Container --}}
                <div
                    id="{{ $id }}-editor"
                    data-editor-container
                    {!! $attributesString !!}
                ></div>

                {{-- Hidden textarea for form submission and wire:model support --}}
                <textarea
                    {{ $wireAttributes }}
                    name="{{ $name }}"
                    id="{{ $id }}"
                    class="sr-only"
                    @if($disabled) disabled @endif
                    @if($readonly) readonly @endif
                    @if($required) required @endif
                    data-editor-input
                >{{ $value }}</textarea>
            </div>

            @if($hasActions())
                <div class="{{ $actionContainerClasses }}">
                    @foreach($computedActionData as $action)
                        <div
                            data-action="{{ $action['data_action'] }}"
                            data-icon-default="{{ $action['data_icon_default'] }}"
                            @if(isset($action['data_url'])) data-url="{{ $action['data_url'] }}" @endif
                            @if(isset($action['data_icon_toggle'])) data-icon-toggle="{{ $action['data_icon_toggle'] }}" @endif
                            @if(isset($action['data_icon_success'])) data-icon-success="{{ $action['data_icon_success'] }}" @endif
                            @if(isset($action['data_label_toggle'])) data-label-toggle="{{ $action['data_label_toggle'] }}" @endif
                            @if(isset($action['data_label_success'])) data-label-success="{{ $action['data_label_success'] }}" @endif
                        >
                            <x-keys::button
                                variant="{{ $actionVariant }}"
                                size="{{ $computedActionSize }}"
                                type="button"
                                icon="{{ $action['icon'] }}"
                                icon-toggle="{{ $action['icon_toggle'] }}"
                                icon-success="{{ $action['icon_success'] }}"
                                label-toggle="{{ $action['label_toggle'] }}"
                                label-success="{{ $action['label_success'] }}"
                                data-action="{{ $action['data_action'] }}"
                                data-url="{{ $action['data_url'] }}"
                            >
                                <span class="sr-only">{{ $action['label'] }}</span>
                            </x-keys::button>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        @if($hint)
            <x-keys::text size="xs" color="text-muted" class="mt-1">{{ $hint }}</x-keys::text>
        @endif

        @if($showErrors && !is_null($errors))
            <x-keys::error :messages="$errors" />
        @endif
    </div>
@else
    <div class="relative" {{ $wrapperAttributes->only('class') }}>
        <div class="{{ $editorClasses }}" style="{{ $heightStyles }}">
            {{-- Quill Editor Container --}}
            <div
                id="{{ $id }}-editor"
                data-editor-container
                {!! $attributesString !!}
            ></div>

            {{-- Hidden textarea for form submission and wire:model support --}}
            <textarea
                {{ $wireAttributes }}
                name="{{ $name }}"
                id="{{ $id }}"
                class="sr-only"
                @if($disabled) disabled @endif
                @if($readonly) readonly @endif
                @if($required) required @endif
                data-editor-input
            >{{ $value }}</textarea>
        </div>

        @if($hasActions())
            <div class="{{ $actionContainerClasses }}">
                @foreach($computedActionData as $action)
                    <div
                        data-action="{{ $action['data_action'] }}"
                        data-icon-default="{{ $action['data_icon_default'] }}"
                        @if(isset($action['data_url'])) data-url="{{ $action['data_url'] }}" @endif
                        @if(isset($action['data_icon_toggle'])) data-icon-toggle="{{ $action['data_icon_toggle'] }}" @endif
                        @if(isset($action['data_icon_success'])) data-icon-success="{{ $action['data_icon_success'] }}" @endif
                        @if(isset($action['data_label_toggle'])) data-label-toggle="{{ $action['data_label_toggle'] }}" @endif
                        @if(isset($action['data_label_success'])) data-label-success="{{ $action['data_label_success'] }}" @endif
                    >
                        <x-keys::button
                            variant="{{ $actionVariant }}"
                            size="{{ $computedActionSize }}"
                            type="button"
                            icon="{{ $action['icon'] }}"
                            icon-toggle="{{ $action['icon_toggle'] }}"
                            icon-success="{{ $action['icon_success'] }}"
                            label-toggle="{{ $action['label_toggle'] }}"
                            label-success="{{ $action['label_success'] }}"
                            data-action="{{ $action['data_action'] }}"
                            data-url="{{ $action['data_url'] }}"
                        >
                            <span class="sr-only">{{ $action['label'] }}</span>
                        </x-keys::button>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
@endif
