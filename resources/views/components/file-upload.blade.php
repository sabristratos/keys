@php
    $dropZoneData = $computedDropZoneData;
    $dropZoneText = $dropZoneText;
    $sizeLimit = $sizeLimit;
@endphp

<div {{ $attributes->whereDoesntStartWith('wire:')->merge(['class' => $baseClasses()]) }} data-file-upload-id="{{ $id }}">
    @if($isShorthand())
        <x-keys::label
            :for="$id"
            :required="$required"
            :optional="$optional"
            class="mb-2"
        >
            {{ $label }}
        </x-keys::label>
    @endif

    @if($description)
        <p class="text-sm text-muted mb-3">{{ $description }}</p>
    @endif

    {{-- Hidden file input with Livewire attributes --}}
    <input
        type="file"
        id="{{ $id }}"
        name="{{ $name }}"
        @if($accept) accept="{{ $accept }}" @endif
        @if($multiple) multiple @endif
        @if($required) required @endif
        @if($disabled) disabled @endif
        {{ $attributes->whereStartsWith('wire:') }}
        class="file-input-hidden sr-only"
        data-file-input="true"
    />

    {{-- Drop zone --}}
    <div
        class="{{ $dropZoneClasses() }} {{ $dropZoneSize() }} group focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer transition-all duration-200"
        data-file-upload-zone="true"
        role="button"
        tabindex="0"
        aria-describedby="{{ $id }}-description"
        aria-label="{{ $multiple ? 'Drop files here or click to browse' : 'Drop a file here or click to browse' }}"
        aria-live="polite"
        @foreach($dropZoneData as $key => $value)
            data-{{ str_replace('_', '-', $key) }}="{{ $value }}"
        @endforeach
    >
        {{-- Default drop zone content --}}
        <div class="file-upload-content text-center pointer-events-none" data-upload-state="idle">
            <div class="flex flex-col items-center space-y-3">
                <div class="relative">
                    <x-keys::icon
                        name="heroicon-o-cloud-arrow-up"
                        :size="$iconSize()"
                        class="text-muted transition-colors group-hover:text-brand group-focus-visible:text-brand"
                    />
                </div>

                <div class="space-y-1">
                    <p class="text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                        <span class="inline-flex items-center gap-2">
                            {{ $dropZoneText['primary'] }}
                        </span>
                    </p>
                    <p class="text-xs text-muted" id="{{ $id }}-description">
                        {{ $dropZoneText['secondary'] }}
                        @if($sizeLimit)
                            <span class="block mt-1 font-medium">Max size: {{ $sizeLimit }}</span>
                        @endif
                    </p>
                </div>
            </div>
        </div>

        {{-- Drag over state --}}
        <div class="file-upload-content text-center hidden" data-upload-state="dragover" aria-live="polite">
            <div class="flex flex-col items-center space-y-3">
                <x-keys::icon
                    name="heroicon-o-cloud-arrow-down"
                    :size="$iconSize()"
                    class="text-brand animate-bounce"
                />

                <div class="space-y-1">
                    <p class="text-sm font-medium text-brand">
                        {{ $multiple ? 'Drop files to upload' : 'Drop file to upload' }}
                    </p>
                </div>
            </div>
        </div>

        {{-- Upload progress state --}}
        <div class="file-upload-content hidden" data-upload-state="uploading" aria-live="polite">
            <div class="space-y-4">
                <div class="flex items-center justify-center space-x-2">
                    <x-keys::loading size="sm" />
                    <span class="text-sm font-medium text-foreground" id="{{ $id }}-upload-status">Uploading...</span>
                </div>

                @if($progress)
                    <x-keys::progress
                        :value="0"
                        size="sm"
                        color="brand"
                        data-upload-progress="true"
                        aria-describedby="{{ $id }}-upload-status"
                    />
                @endif
            </div>
        </div>
    </div>

    {{-- File preview area --}}
    @if($preview)
        <div class="file-preview-area mt-4 hidden" data-file-previews="true" role="region" aria-label="File previews">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-foreground" id="{{ $id }}-preview-heading">
                        {{ $multiple ? 'Selected Files' : 'Selected File' }}
                    </h4>
                    @if($multiple && !$disabled)
                        <button
                            type="button"
                            class="hidden add-more-files-btn text-xs text-brand hover:text-brand-hover bg-brand/10 hover:bg-brand/20 px-3 py-1 rounded-md transition-colors"
                            data-add-more-files="true"
                            aria-label="Add more files to selection"
                        >
                            + Add More
                        </button>
                    @endif
                </div>
                <div class="file-preview-list space-y-3" data-preview-list="true" aria-labelledby="{{ $id }}-preview-heading" role="list">
                    {{-- File previews will be inserted here by JavaScript --}}
                </div>
            </div>
        </div>
    @endif

    {{-- Existing files --}}
    @if(!empty($existingFiles))
        <div class="existing-files-area mt-4" role="region" aria-label="Current files">
            <div class="space-y-3">
                <h4 class="text-sm font-medium text-foreground" id="{{ $id }}-existing-heading">Current Files</h4>
                <div class="existing-files-list space-y-2" aria-labelledby="{{ $id }}-existing-heading" role="list">
                    @foreach($existingFiles as $file)
                        <div class="existing-file-item flex items-center justify-between p-3 border border-border rounded-md bg-surface transition-colors hover:bg-surface/80" role="listitem">
                            <div class="flex items-center space-x-3">
                                <x-keys::icon
                                    name="heroicon-o-document-text"
                                    size="sm"
                                    class="text-muted flex-shrink-0"
                                />
                                <div class="min-w-0 flex-1">
                                    <p class="text-sm font-medium text-foreground truncate">
                                        {{ $file['name'] ?? 'Unknown file' }}
                                    </p>
                                    @if(isset($file['size']))
                                        <p class="text-xs text-muted">
                                            {{ $formatFileSize($file['size']) }}
                                        </p>
                                    @endif
                                </div>
                            </div>

                            <div class="flex items-center space-x-1">
                                @if(isset($file['url']))
                                    <x-keys::button
                                        variant="ghost"
                                        size="xs"
                                        :href="$file['url']"
                                        target="_blank"
                                        icon="heroicon-o-arrow-top-right-on-square"
                                        aria-label="Open {{ $file['name'] ?? 'file' }} in new tab"
                                    />
                                @endif

                                @if(isset($file['status']) && $file['status'] === 'processing')
                                    <x-keys::loading size="xs" animation="spinner" />
                                @endif

                                <x-keys::button
                                    variant="ghost"
                                    size="xs"
                                    color="danger"
                                    icon="heroicon-o-trash"
                                    data-remove-existing-file="{{ $file['id'] ?? $loop->index }}"
                                    aria-label="Remove {{ $file['name'] ?? 'file' }}"
                                    @if(isset($file['status']) && $file['status'] === 'processing') disabled @endif
                                />
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    @endif

    {{-- Error display --}}
    @if($showErrors && $hasError())
        <x-keys::error :messages="$errors" class="mt-2" />
    @endif

    {{-- Dynamic error container --}}
    <div class="file-upload-errors mt-3 hidden" data-file-upload-errors="true" role="alert" aria-live="assertive">
        <x-keys::alert
            variant="danger"
            size="sm"
            icon="heroicon-o-exclamation-triangle"
            :dismissible="true"
            class="animate-in fade-in slide-in-from-top-2 duration-300"
        >
            <x-slot name="title">Upload Failed</x-slot>
            <span data-error-message="true" class="text-sm"></span>
        </x-keys::alert>
    </div>

    {{-- Success notification --}}
    <div class="file-upload-success mt-3 hidden" data-file-upload-success="true" role="status" aria-live="polite">
        <x-keys::alert
            variant="success"
            size="sm"
            icon="heroicon-o-check-circle"
            :dismissible="true"
            class="animate-in fade-in slide-in-from-top-2 duration-300"
        >
            <span data-success-message="true" class="text-sm"></span>
        </x-keys::alert>
    </div>
</div>

<style>
    .file-upload-zone {
        position: relative;
        cursor: pointer;
        user-select: none;
    }

    /* Better visual feedback */
    .file-upload-zone.drag-over {
        border-color: var(--color-brand);
        background: var(--color-brand-100);
        box-shadow: 0 4px 12px rgba(var(--color-brand-rgb), 0.15);
        transform: scale(1.01);
        transition: all 0.2s ease;
    }

    .file-upload-zone.has-error {
        border-color: var(--color-danger);
        background: var(--color-danger-50);
    }

    .file-upload-zone:disabled,
    .file-upload-zone.disabled {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
    }

    /* Smooth transitions between states */
    .file-upload-zone [data-upload-state] {
        transition: opacity 0.2s ease-in-out;
    }

    .file-upload-zone [data-upload-state="idle"] {
        display: block;
    }

    .file-upload-zone [data-upload-state="dragover"] {
        display: none;
    }

    .file-upload-zone [data-upload-state="uploading"] {
        display: none;
    }

    .file-upload-zone.drag-over [data-upload-state="idle"] {
        display: none;
    }

    .file-upload-zone.drag-over [data-upload-state="dragover"] {
        display: block;
    }

    .file-upload-zone.uploading [data-upload-state="idle"] {
        display: none;
    }

    .file-upload-zone.uploading [data-upload-state="uploading"] {
        display: block;
    }

    /* Minimum touch target size for mobile */
    @media (pointer: coarse) {
        .file-upload-zone {
            min-height: 44px;
        }

        [data-remove-file],
        [data-dismiss-error] {
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    /* File list layout */
    .file-list-layout {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    /* File preview items */
    .file-preview-item:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Focus states for accessibility */
    .file-preview-item:focus-within {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
    }

    /* Mobile optimizations */
    @media (pointer: coarse) {
        .file-preview-item button {
            min-width: 44px;
            min-height: 44px;
        }
    }

    /* Lightbox styling */
    .lightbox-modal {
        border: none;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        padding: 0;
        margin: 0;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(4px);
        z-index: 9999;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .lightbox-modal::backdrop {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
    }

    .lightbox-modal[open] {
        animation: lightbox-fade-in 0.2s ease-out;
    }

    .lightbox-content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .lightbox-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 2rem;
        box-sizing: border-box;
    }

    .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        transition: transform 0.2s ease-out;
    }

    .lightbox-image:hover {
        transform: scale(1.02);
    }

    /* Navigation buttons */
    .lightbox-nav {
        transition: all 0.2s ease-out;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .lightbox-nav:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: scale(1.1);
        border-color: rgba(255, 255, 255, 0.2);
    }

    .lightbox-nav:active {
        transform: scale(0.95);
    }

    /* Close button */
    .lightbox-close {
        transition: all 0.2s ease-out;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .lightbox-close:hover {
        background: rgba(220, 38, 38, 0.8);
        transform: scale(1.1);
        border-color: rgba(220, 38, 38, 0.5);
    }

    .lightbox-close:active {
        transform: scale(0.95);
    }

    /* Image info panel */
    .lightbox-info {
        backdrop-filter: blur(12px);
        background: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.2s ease-out;
    }

    .lightbox-info:hover {
        background: rgba(0, 0, 0, 0.8);
        border-color: rgba(255, 255, 255, 0.2);
    }

    /* Animations */
    @keyframes lightbox-fade-in {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes lightbox-zoom-in {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    .lightbox-image {
        animation: lightbox-zoom-in 0.3s ease-out;
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
        .lightbox-image-container {
            padding: 1rem;
        }

        .lightbox-nav,
        .lightbox-close {
            width: 3rem;
            height: 3rem;
            font-size: 1.25rem;
        }

        .lightbox-nav {
            left: 0.5rem;
            right: 0.5rem;
        }

        .lightbox-close {
            top: 0.5rem;
            right: 0.5rem;
        }

        .lightbox-info {
            left: 0.5rem;
            right: 0.5rem;
            bottom: 0.5rem;
            padding: 0.75rem;
        }

        .lightbox-image {
            border-radius: 4px;
        }
    }

    /* Touch interactions */
    @media (pointer: coarse) {
        .lightbox-nav,
        .lightbox-close {
            min-width: 44px;
            min-height: 44px;
        }

        .lightbox-nav:hover,
        .lightbox-close:hover {
            transform: none; /* Disable hover effects on touch devices */
        }

        .lightbox-nav:active,
        .lightbox-close:active {
            transform: scale(0.9);
            background: rgba(0, 0, 0, 0.9);
        }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
        .lightbox-modal {
            background: black;
        }

        .lightbox-nav,
        .lightbox-close {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid white;
        }

        .lightbox-info {
            background: black;
            border: 2px solid white;
        }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
        .lightbox-modal[open],
        .lightbox-image,
        .lightbox-nav,
        .lightbox-close,
        .lightbox-info {
            animation: none;
            transition: none;
        }

        .lightbox-image:hover,
        .lightbox-nav:hover,
        .lightbox-close:hover {
            transform: none;
        }
    }

</style>