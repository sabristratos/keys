@php
    $dropzoneBaseClasses = 'relative border-2 border-dashed rounded-lg transition-all duration-200';
    $sizeClasses = match ($size) {
        'sm' => 'p-4',
        'md' => 'p-6',
        'lg' => 'p-8',
        default => 'p-6'
    };
    $dropzoneStateClasses = match (true) {
        $disabled => 'border-neutral bg-card cursor-not-allowed opacity-50',
        $hasErrors() => 'border-danger bg-danger/5 hover:border-danger-hover cursor-pointer',
        default => 'border-border bg-card hover:border-brand hover:bg-brand/5 has-[:focus-visible]:border-brand has-[:focus-visible]:bg-brand/5 cursor-pointer'
    };
    $dropzoneClasses = "$dropzoneBaseClasses $sizeClasses $dropzoneStateClasses";

    // Aspect ratio classes for image-fill variant
    $aspectRatioClass = match($aspectRatio) {
        'square' => 'aspect-square',
        'video' => 'aspect-video',
        'wide' => 'aspect-[21/9]',
        'portrait' => 'aspect-[3/4]',
        default => ''
    };

    // Object fit class
    $objectFitClass = $objectFit === 'contain' ? 'object-contain' : 'object-cover';
@endphp

<div @if($isShorthand()) class="space-y-2" @endif>
    @if($isShorthand())
        <x-keys::label :for="$id" :required="$required" :optional="$optional">{{ $label }}</x-keys::label>
    @endif

    <div data-file-upload-id="{{ $id }}" {{ $attributes->merge($dataAttributes)->class('space-y-4') }}>
        {{-- Dropzone - Always Visible --}}
        <div class="relative {{ $aspectRatioClass }}">
            <div class="{{ $dropzoneClasses }} text-center {{ $variant === 'image-fill' ? 'h-full' : '' }}" data-file-dropzone wire:ignore>
                <div class="transition-transform duration-200 group-[.dragover]:scale-105 {{ $variant === 'image-fill' ? 'h-full flex flex-col items-center justify-center' : '' }}">
                    <x-keys::icon name="cloud-arrow-up" :size="$iconSize" class="mx-auto text-text-muted mb-3" />
                    <div class="space-y-1">
                        <x-keys::text element="p" size="sm" weight="medium" color="text">
                            {{ $placeholder }}
                        </x-keys::text>
                        @if($formattedAcceptedTypes || $maxSize)
                            <x-keys::text element="p" size="xs" color="muted">
                                @if($formattedAcceptedTypes){{ $formattedAcceptedTypes }}@if($maxSize) • @endif @endif
                                @if($maxSize){{ __('keys-ui::keys-ui.file_upload.max_file_size') }} {{ $maxSize }}@endif
                            </x-keys::text>
                        @endif
                    </div>
                </div>
            </div>

            @if($variant === 'image-fill')
                {{-- Image Fill Preview Container --}}
                <div class="absolute inset-0 z-10 hidden rounded-lg overflow-hidden" data-image-fill-preview>
                    <img src="" alt="" class="w-full h-full {{ $objectFitClass }}" data-image-fill-img />

                    {{-- Hover Overlay with Buttons --}}
                    <div class="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3" data-image-fill-overlay>
                        <x-keys::button
                            variant="outline"
                            size="sm"
                            type="button"
                            class="relative z-30 !bg-white !text-text !border-white hover:!bg-gray-100"
                            data-image-fill-replace>
                            Replace
                        </x-keys::button>
                        <x-keys::button
                            variant="outline"
                            color="danger"
                            size="sm"
                            type="button"
                            class="relative z-30 !bg-white !text-danger !border-white hover:!bg-red-50"
                            data-image-fill-delete>
                            Delete
                        </x-keys::button>
                    </div>
                </div>
            @endif

            <input
                type="file"
                class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                data-file-input
                @if($name) name="{{ $name }}{{ $multiple ? '[]' : '' }}" @endif
                id="{{ $id }}"
                accept="{{ $accept }}"
                @if($required) required @endif
                @if($disabled) disabled @endif
                @if($multiple) multiple @endif
                {{ $attributes->merge($computedWireAttributes) }}
            />
        </div>

        @if($variant !== 'image-fill')
            {{-- Unified File List (hidden for image-fill variant) --}}
            <ul class="hidden flex-col gap-3" data-file-list wire:ignore>
                {{-- File cards will be dynamically inserted here --}}
            </ul>

            {{-- Add More Files Button --}}
            <div class="hidden" data-add-more-container>
                <x-keys::button
                    variant="outline"
                    size="sm"
                    type="button"
                    icon="heroicon-o-plus"
                    class="w-full"
                    data-add-more-btn>
                    {{ __('keys-ui::keys-ui.file_upload.add_more_files') }}
                </x-keys::button>
            </div>
        @endif

        {{-- File Card Template --}}
        <template data-file-card-template>
            <x-keys::card
                variant="outline"
                class="file-card"
                data-file-card
                data-file-index=""
                data-file-status="">
                <div class="flex gap-3">
                    {{-- File Icon / Preview with Color Wrapper --}}
                    <div class="shrink-0">
                        {{-- Image Preview --}}
                        <img src="" alt=""
                             class="hidden size-10 rounded object-cover"
                             data-file-preview-image />
                        {{-- File Type Icon with Colored Background --}}
                        <div class="flex size-10 items-center justify-center rounded-lg transition-colors"
                             data-file-icon-wrapper
                             style="background-color: #D5D7DA;">
                            <span data-file-type-icon></span>
                        </div>
                    </div>

                    {{-- File Info --}}
                    <div class="flex min-w-0 flex-1 flex-col">
                        <div class="flex w-full items-start justify-between gap-2">
                            <div class="min-w-0 flex-1">
                                {{-- Filename --}}
                                <x-keys::text element="p" size="sm" weight="medium" color="text" class="truncate" data-file-name></x-keys::text>

                                {{-- Size and Status Row --}}
                                <div class="mt-0.5 flex items-center gap-2">
                                    <x-keys::text element="span" size="sm" color="muted" class="whitespace-nowrap" data-file-size></x-keys::text>
                                    <span class="h-3 w-px bg-border" data-file-status-separator></span>
                                    <div class="flex items-center gap-1" data-file-status>
                                        <span data-file-status-icon></span>
                                        <x-keys::text element="span" size="sm" weight="medium" data-file-status-text></x-keys::text>
                                    </div>
                                </div>
                            </div>

                            {{-- Delete Button --}}
                            <x-keys::button
                                variant="ghost"
                                color="danger"
                                size="sm"
                                type="button"
                                icon="heroicon-o-trash"
                                class="-mt-1 -mr-1"
                                aria-label="Delete file"
                                data-file-delete />
                        </div>

                        {{-- Progress Bar (hidden by default) --}}
                        <div class="hidden mt-3 flex items-center gap-3" data-file-progress>
                            <div class="h-2 w-full overflow-hidden rounded-full bg-background-muted">
                                <div class="size-full rounded-full bg-brand transition-all duration-300 ease-out"
                                     style="width: 0%"
                                     data-file-progress-bar></div>
                            </div>
                            <x-keys::text element="span" size="sm" weight="medium" class="shrink-0 tabular-nums" data-file-progress-percent>0%</x-keys::text>
                        </div>

                        {{-- Retry Button (hidden by default, shown on error) --}}
                        <div class="hidden mt-2" data-file-retry-container>
                            <x-keys::button
                                variant="link"
                                color="danger"
                                size="sm"
                                type="button"
                                class="self-start"
                                data-file-retry>
                                Try again
                            </x-keys::button>
                        </div>
                    </div>
                </div>
            </x-keys::card>
        </template>

        {{-- Hidden Icon Templates for Different File Types --}}
        <div class="hidden" data-icon-templates>
            {{-- PDF Icon Template --}}
            <template data-icon-template="pdf">
                <x-keys::icon name="pdf" size="md" class="text-white" />
            </template>

            {{-- Document Icon Template (Word, Excel, PowerPoint, etc.) --}}
            <template data-icon-template="document">
                <x-keys::icon name="document" size="md" class="text-white" />
            </template>

            {{-- Code Icon Template (JS, TS, PHP, HTML, CSS, etc.) --}}
            <template data-icon-template="code">
                <x-keys::icon name="code" size="md" class="text-white" />
            </template>

            {{-- Video Icon Template - Uses file icon as fallback --}}
            <template data-icon-template="video">
                <x-keys::icon name="file" size="md" class="text-white" />
            </template>

            {{-- Archive Icon Template - Uses file icon as fallback --}}
            <template data-icon-template="archive">
                <x-keys::icon name="file" size="md" class="text-white" />
            </template>

            {{-- Default Icon Template (Generic File) --}}
            <template data-icon-template="default">
                <x-keys::icon name="file" size="md" class="text-white" />
            </template>
        </div>
    </div>

    @if($isShorthand() && $showErrors)
        <x-keys::error :errors="$errors" />
    @endif
</div>
