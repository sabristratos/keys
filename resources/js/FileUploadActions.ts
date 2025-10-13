/**
 * File upload functionality for Keys UI
 *
 * Provides comprehensive file upload features including:
 * - Drag and drop support
 * - File validation (type and size)
 * - Image preview with lightbox support
 * - Livewire integration with upload progress
 * - Unified file list UI for single and multiple files
 * - Status tracking (uploading, complete, error) with retry capability
 * - File type icons with color coding
 * - Accessibility announcements
 */

import { BaseActionClass } from './utils/BaseActionClass';
import { DOMUtils } from './utils/DOMUtils';
import { EventUtils } from './utils/EventUtils';
import LightboxActions from './LightboxActions';
import LivewireUtils from './utils/LivewireUtils';

// Type definitions
interface LivewireProgressEvent extends CustomEvent {
    detail: { progress: number };
}

interface LivewireErrorEvent extends CustomEvent {
    detail: { message?: string };
}

// File status enum
type FileStatus = 'idle' | 'uploading' | 'complete' | 'error';

interface FileUploadState {
    files: FileMetadata[];
}

interface FileMetadata {
    file: File;
    status: FileStatus;
    progress: number;
    error?: string;
}

// Translation helper function
function t(key: string, fallback: string = '', replacements: Record<string, string | number> = {}): string {
    const translations = (window as any).KeysUITranslations;
    if (!translations) {
        return fallback;
    }
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
        value = value?.[k];
        if (value === undefined) {
            return fallback;
        }
    }
    let translation = value || fallback;
    for (const placeholder in replacements) {
        translation = translation.replace(`:${placeholder}`, String(replacements[placeholder]));
    }
    return translation;
}

export class FileUploadActions extends BaseActionClass<FileUploadState> {
    private lightboxActions = LightboxActions.getInstance();

    protected initializeElements(): void {
        DOMUtils.querySelectorAll('[data-keys-file-upload]').forEach(container => {
            if (container.dataset.initialized !== 'true') {
                this.initializeFileUpload(container as HTMLElement);
            }
        });
    }

    protected bindEventListeners(): void {
        // Bound per-instance to correctly scope them
    }

    protected setupDynamicObserver(): void {
        this.createDynamicObserver((addedNodes) => {
            addedNodes.forEach(node => {
                if (node instanceof Element) {
                    if (node.matches('[data-keys-file-upload]') && node.getAttribute('data-initialized') !== 'true') {
                        this.initializeFileUpload(node as HTMLElement);
                    }
                    DOMUtils.querySelectorAll('[data-keys-file-upload]', node).forEach(container => {
                        if (container.getAttribute('data-initialized') !== 'true') {
                            this.initializeFileUpload(container as HTMLElement);
                        }
                    });
                }
            });
        });
    }

    private initializeFileUpload(container: HTMLElement): void {
        const fileInput = DOMUtils.querySelector('[data-file-input]', container) as HTMLInputElement;
        if (!fileInput || this.hasState(container)) return;

        this.setState(container, { files: [] });

        this.setupFileHandling(container, fileInput);
        this.setupDragDrop(container, fileInput);
        this.setupClickHandlers(container, fileInput);
        this.setupLivewireIntegration(container, fileInput);

        this.lightboxActions.setState(container, {
            currentImageIndex: 0,
            images: [],
            isOpen: false,
            elementId: container.id || `upload-${Date.now()}`
        });

        container.setAttribute('data-initialized', 'true');
    }

    private setupFileHandling(container: HTMLElement, fileInput: HTMLInputElement): void {
        fileInput.addEventListener('change', () => {
            if (fileInput.files && fileInput.files.length > 0) {
                this.handleFiles(container, fileInput, Array.from(fileInput.files));
            } else {
                this.setState(container, { files: [] });
                this.renderFileList(container);
            }
        });
    }

    private setupDragDrop(container: HTMLElement, fileInput: HTMLInputElement): void {
        const dragDropEnabled = container.dataset.dragDrop === 'true';
        const isDisabled = container.dataset.disabled === 'true';
        if (!dragDropEnabled || isDisabled) return;

        const dropzone = DOMUtils.querySelector('[data-file-dropzone]', container);
        if (!dropzone) return;

        const events: Array<keyof HTMLElementEventMap> = ['dragenter', 'dragover', 'dragleave', 'drop'];
        events.forEach(event => dropzone.addEventListener(event, this.preventDefault));
        ['dragenter', 'dragover'].forEach(event => dropzone.addEventListener(event, () => dropzone.classList.add('dragover')));
        ['dragleave', 'drop'].forEach(event => dropzone.addEventListener(event, () => dropzone.classList.remove('dragover')));
        dropzone.addEventListener('drop', (e) => {
            const files = (e as DragEvent).dataTransfer?.files;
            if (files && files.length > 0) {
                this.handleFiles(container, fileInput, Array.from(files));
            }
        });
    }

    private setupClickHandlers(container: HTMLElement, fileInput: HTMLInputElement): void {
        // Click on dropzone to trigger file selection
        EventUtils.handleDelegatedClick('[data-file-dropzone]', (_, e) => {
            if((e.target as HTMLElement).closest('[data-file-input]') || container.hasAttribute('data-is-removing')) return
            if (!fileInput.disabled) fileInput.click();
        }, container);

        // Add more files button
        EventUtils.handleDelegatedClick('[data-add-more-btn]', () => {
            if (!fileInput.disabled) fileInput.click();
        }, container);

        // Delete file button (standard variant)
        EventUtils.handleDelegatedClick('[data-file-delete]', (btn) => {
            const card = btn.closest('[data-file-card]') as HTMLElement;
            const fileIndex = parseInt(card?.getAttribute('data-file-index') || '0');
            this.removeFileAtIndex(container, fileInput, fileIndex);
        }, container);

        // Retry button
        EventUtils.handleDelegatedClick('[data-file-retry]', (btn) => {
            const card = btn.closest('[data-file-card]') as HTMLElement;
            const fileIndex = parseInt(card?.getAttribute('data-file-index') || '0');
            this.retryFileUpload(container, fileInput, fileIndex);
        }, container);

        // Image-fill variant: Replace button
        EventUtils.handleDelegatedClick('[data-image-fill-replace]', () => {
            if (!fileInput.disabled) fileInput.click();
        }, container);

        // Image-fill variant: Delete button
        EventUtils.handleDelegatedClick('[data-image-fill-delete]', () => {
            this.clearImageFillPreview(container, fileInput);
        }, container);
    }

    private setupLivewireIntegration(container: HTMLElement, fileInput: HTMLInputElement): void {
        if (!LivewireUtils.isLivewireEnabled(container) || !LivewireUtils.isLivewireAvailable()) return;

        fileInput.addEventListener('livewire-upload-start', () => {
            const state = this.getState(container);
            if (state && state.files.length > 0) {
                state.files.forEach((_, index) => this.setFileStatus(container, index, 'uploading'));
            }
        });

        fileInput.addEventListener('livewire-upload-progress', (e) => {
            const progress = (e as LivewireProgressEvent).detail.progress;
            const state = this.getState(container);
            if (state && state.files.length > 0) {
                state.files.forEach((_, index) => this.setFileProgress(container, index, progress));
            }
        });

        fileInput.addEventListener('livewire-upload-finish', () => {
            const state = this.getState(container);
            if (state && state.files.length > 0) {
                state.files.forEach((_, index) => this.setFileStatus(container, index, 'complete'));
            }
        });

        fileInput.addEventListener('livewire-upload-error', (e) => {
            const message = (e as LivewireErrorEvent).detail?.message || t('file_upload.upload_failed', 'Upload failed. Please try again.');
            const state = this.getState(container);
            if (state && state.files.length > 0) {
                state.files.forEach((fileData, index) => {
                    fileData.error = message;
                    this.setFileStatus(container, index, 'error');
                });
            }
        });

        fileInput.addEventListener('livewire-upload-cancel', () => {
            const state = this.getState(container);
            if (state && state.files.length > 0) {
                state.files.forEach((_, index) => this.setFileStatus(container, index, 'idle'));
            }
        });

        // Listen for custom reset event from Livewire component
        window.addEventListener('keys-ui-reset', () => {
            const component = LivewireUtils.getLivewireComponent(fileInput);
            const wireModelProperty = LivewireUtils.getWireModelProperty(fileInput);

            // Only reset this component if it belongs to the Livewire component that dispatched the event
            if (component && wireModelProperty) {
                fileInput.value = '';
                this.setState(container, { files: [] });
                this.renderFileList(container);
            }
        });
    }

    private handleFiles(container: HTMLElement, fileInput: HTMLInputElement, newFiles: File[]): void {
        const maxFilesAttr = container.dataset.maxFiles;
        const maxFiles = maxFilesAttr ? parseInt(maxFilesAttr) : null;
        const isMultiple = container.dataset.multiple === 'true';
        const errors: string[] = [];

        // Get existing files if in multiple mode
        const state = this.getState(container);
        const existingFiles = isMultiple && state ? [...state.files] : [];
        const filesMetadata: FileMetadata[] = [...existingFiles];

        for (const file of newFiles) {
            const validation = this.validateFile(container, file);
            if (!validation.valid) {
                errors.push(`${file.name}: ${validation.error || t('file_upload.invalid_file', 'Invalid file selected.')}`);
                continue;
            }
            if (maxFiles && filesMetadata.length >= maxFiles) {
                errors.push(t('file_upload.max_files_error', 'Maximum :max file(s) allowed.', { max: maxFiles }));
                break;
            }
            filesMetadata.push({
                file,
                status: 'idle',
                progress: 0
            });

            // For single file mode, only keep the last file
            if (!isMultiple) {
                break;
            }
        }

        if (errors.length > 0) {
            this.showError(container, errors.join(' | '));
        } else {
            this.clearError(container);
        }

        if (filesMetadata.length === 0) {
            this.setState(container, { files: [] });
            this.renderFileList(container);
            return;
        }

        this.setState(container, { files: filesMetadata });
        this.updateFileInputFiles(fileInput, filesMetadata.map(fm => fm.file));
        this.renderFileList(container);
    }

    private removeFileAtIndex(container: HTMLElement, fileInput: HTMLInputElement, index: number): void {
        const state = this.getState(container);
        if (!state) return;

        const files = state.files;
        if (index < 0 || index >= files.length) return;

        // Remove from lightbox if it's an image
        const imageId = `preview-${index}-`;
        const lightboxState = this.lightboxActions.getState(container);
        if (lightboxState && lightboxState.images) {
            const imagesToRemove = lightboxState.images.filter(img => img.id.startsWith(imageId));
            imagesToRemove.forEach(img => this.lightboxActions.removeImage(container, img.id));
        }

        files.splice(index, 1);
        this.setState(container, { files });

        if (files.length === 0) {
            fileInput.value = '';
            this.renderFileList(container);
            this.announceChange(container, t('file_upload.file_removed', 'File removed.'));
        } else {
            this.updateFileInputFiles(fileInput, files.map(fm => fm.file));
            this.renderFileList(container);
            this.announceChange(container, `${t('file_upload.file_removed', 'File removed.')} ${files.length} file(s) remaining`);
        }
    }

    private retryFileUpload(container: HTMLElement, fileInput: HTMLInputElement, index: number): void {
        const state = this.getState(container);
        if (!state || !state.files[index]) return;

        state.files[index].status = 'idle';
        state.files[index].progress = 0;
        state.files[index].error = undefined;

        this.renderFileList(container);

        // Trigger Livewire upload if available
        if (LivewireUtils.isLivewireEnabled(container)) {
            LivewireUtils.dispatchInputEvent(fileInput);
        }
    }

    private updateFileInputFiles(fileInput: HTMLInputElement, files: File[]): void {
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
    }

    private validateFile(container: HTMLElement, file: File): { valid: boolean; error?: string } {
        const accept = container.dataset.accept;
        const maxSize = container.dataset.maxSize;
        const maxSizeFormatted = container.dataset.maxSizeFormatted;

        if (accept && accept !== '*') {
            const acceptedTypes = accept.split(',').map(type => type.trim());
            const isValid = acceptedTypes.some(type => {
                if (type.startsWith('.')) return file.name.toLowerCase().endsWith(type.toLowerCase());
                if (type.includes('*')) return file.type.startsWith(type.split('/')[0] + '/');
                return file.type === type;
            });
            if (!isValid) return { valid: false, error: t('file_upload.file_type_error', 'File type not allowed. Accepted: :types', { types: acceptedTypes.join(', ') }) };
        }

        if (maxSize && file.size > parseInt(maxSize)) {
            return { valid: false, error: t('file_upload.file_size_error', 'File too large. Maximum size: :size', { size: maxSizeFormatted || '10MB' }) };
        }

        return { valid: true };
    }

    /**
     * Unified method to render the file list (replaces showFileState and showMultipleFilesState)
     */
    private renderFileList(container: HTMLElement): void {
        const variant = container.dataset.variant;

        // For image-fill variant, use specialized rendering
        if (variant === 'image-fill') {
            this.renderImageFillPreview(container);
            return;
        }

        const fileList = DOMUtils.querySelector('[data-file-list]', container);
        const addMoreContainer = DOMUtils.querySelector('[data-add-more-container]', container);

        if (!fileList) return;

        const state = this.getState(container);
        const isMultiple = container.dataset.multiple === 'true';

        if (!state || state.files.length === 0) {
            fileList.classList.add('hidden');
            fileList.innerHTML = '';
            if (addMoreContainer) addMoreContainer.classList.add('hidden');
            return;
        }

        fileList.classList.remove('hidden');
        fileList.classList.add('flex');
        fileList.innerHTML = '';

        state.files.forEach((fileData, index) => {
            const fileCard = this.createFileCard(container, fileData, index);
            fileList.appendChild(fileCard);
        });

        // Show "Add More" button for multiple file mode
        if (addMoreContainer && isMultiple) {
            addMoreContainer.classList.remove('hidden');
        }

        this.announceChange(container, t('file_upload.files_selected', ':count file(s) selected', { count: state.files.length }));
    }

    private createFileCard(container: HTMLElement, fileData: FileMetadata, index: number): HTMLElement {
        // Find template within the container
        const template = DOMUtils.querySelector('[data-file-card-template]', container) as HTMLTemplateElement;

        if (!template) {
            console.error('File card template not found. Make sure the template with [data-file-card-template] exists in the DOM.');
            const fallbackCard = document.createElement('li');
            fallbackCard.className = 'file-card p-4 border rounded';
            fallbackCard.textContent = fileData.file.name;
            return fallbackCard;
        }

        const cardFragment = template.content.cloneNode(true) as DocumentFragment;
        const card = cardFragment.querySelector('[data-file-card]') as HTMLElement;

        if (!card) return cardFragment as any;

        card.setAttribute('data-file-index', index.toString());
        card.setAttribute('data-file-status', fileData.status);

        // Populate file info
        const nameEl = DOMUtils.querySelector('[data-file-name]', card);
        const sizeEl = DOMUtils.querySelector('[data-file-size]', card);
        if (nameEl) {
            nameEl.textContent = fileData.file.name;
            (nameEl as HTMLElement).title = fileData.file.name;
        }
        if (sizeEl) sizeEl.textContent = this.formatFileSize(fileData.file.size);

        // Set up icon/preview
        this.setupFileIcon(card, fileData.file, index, container);

        // Set up status
        this.updateCardStatus(card, fileData);

        // Set up progress
        this.updateCardProgress(card, fileData);

        // Apply ring state
        this.applyRingState(card, fileData.status);

        return card;
    }

    private setupFileIcon(card: HTMLElement, file: File, index: number, container: HTMLElement): void {
        const previewImg = DOMUtils.querySelector('[data-file-preview-image]', card) as HTMLImageElement;
        const iconWrapper = DOMUtils.querySelector('[data-file-icon-wrapper]', card) as HTMLElement;
        const typeIcon = DOMUtils.querySelector('[data-file-type-icon]', card);

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (previewImg && e.target?.result) {
                    const imageUrl = e.target.result as string;
                    previewImg.src = imageUrl;
                    previewImg.alt = file.name;
                    previewImg.classList.remove('hidden');
                    if (iconWrapper) iconWrapper.classList.add('hidden');

                    // Add to lightbox
                    const imageId = `preview-${index}-${Date.now()}`;
                    previewImg.setAttribute('data-lightbox-trigger', imageId);
                    previewImg.style.cursor = 'pointer';
                    this.lightboxActions.addImage(container, {
                        id: imageId,
                        src: imageUrl,
                        alt: file.name,
                        fileName: file.name,
                        fileSize: this.formatFileSize(file.size),
                        fileType: file.type
                    });
                }
            };
            reader.readAsDataURL(file);
        } else {
            // Set file type icon and color
            if (iconWrapper && typeIcon) {
                const color = this.getFileTypeColor(file.name);
                iconWrapper.style.backgroundColor = color;
                typeIcon.innerHTML = this.getFileTypeIcon(file.name, container);
            }
        }
    }

    private updateCardStatus(card: HTMLElement, fileData: FileMetadata): void {
        const statusIcon = DOMUtils.querySelector('[data-file-status-icon]', card);
        const statusText = DOMUtils.querySelector('[data-file-status-text]', card);
        const statusRow = DOMUtils.querySelector('[data-file-status]', card);
        const statusSeparator = DOMUtils.querySelector('[data-file-status-separator]', card);
        const retryContainer = DOMUtils.querySelector('[data-file-retry-container]', card);

        if (!statusIcon || !statusText) return;

        // Update status based on file status
        switch (fileData.status) {
            case 'uploading':
                statusRow?.classList.remove('hidden');
                statusSeparator?.classList.remove('hidden');
                statusIcon.innerHTML = this.getUploadingIcon();
                statusText.textContent = 'Uploading...';
                (statusText as HTMLElement).className = 'text-sm font-medium text-text-muted';
                if (retryContainer) retryContainer.classList.add('hidden');
                break;
            case 'complete':
                statusRow?.classList.remove('hidden');
                statusSeparator?.classList.remove('hidden');
                statusIcon.innerHTML = this.getCompleteIcon();
                statusText.textContent = 'Complete';
                (statusText as HTMLElement).className = 'text-sm font-medium text-success';
                if (retryContainer) retryContainer.classList.add('hidden');
                break;
            case 'error':
                statusRow?.classList.remove('hidden');
                statusSeparator?.classList.remove('hidden');
                statusIcon.innerHTML = this.getErrorIcon();
                statusText.textContent = 'Failed';
                (statusText as HTMLElement).className = 'text-sm font-medium text-danger';
                if (retryContainer) retryContainer.classList.remove('hidden');
                break;
            case 'idle':
            default:
                // Hide status row when idle for cleaner UI
                statusRow?.classList.add('hidden');
                statusSeparator?.classList.add('hidden');
                statusIcon.innerHTML = '';
                statusText.textContent = '';
                if (retryContainer) retryContainer.classList.add('hidden');
                break;
        }
    }

    private updateCardProgress(card: HTMLElement, fileData: FileMetadata): void {
        const progressWrapper = DOMUtils.querySelector('[data-file-progress]', card);
        const progressBar = DOMUtils.querySelector('[data-file-progress-bar]', card) as HTMLElement;
        const progressPercent = DOMUtils.querySelector('[data-file-progress-percent]', card);

        if (!progressWrapper) return;

        if (fileData.status === 'uploading') {
            progressWrapper.classList.remove('hidden');
            progressWrapper.classList.add('flex');
            if (progressBar) progressBar.style.width = `${fileData.progress}%`;
            if (progressPercent) progressPercent.textContent = `${fileData.progress}%`;
        } else {
            progressWrapper.classList.add('hidden');
        }
    }

    private applyRingState(card: HTMLElement, status: FileStatus): void {
        // Remove all ring states
        card.classList.remove('ring-1', 'ring-2', 'ring-border', 'ring-brand', 'ring-success', 'ring-danger');

        // Apply ring based on status
        switch (status) {
            case 'uploading':
                card.classList.add('ring-1', 'ring-brand');
                break;
            case 'complete':
                card.classList.add('ring-1', 'ring-success');
                break;
            case 'error':
                card.classList.add('ring-2', 'ring-danger');
                break;
            case 'idle':
            default:
                card.classList.add('ring-1', 'ring-border');
                break;
        }
    }

    private setFileStatus(container: HTMLElement, index: number, status: FileStatus): void {
        const state = this.getState(container);
        if (!state || !state.files[index]) return;

        state.files[index].status = status;
        this.renderFileList(container);
    }

    private setFileProgress(container: HTMLElement, index: number, progress: number): void {
        const state = this.getState(container);
        if (!state || !state.files[index]) return;

        state.files[index].progress = Math.round(progress);

        // Update just the progress bar without re-rendering entire list
        const fileList = DOMUtils.querySelector('[data-file-list]', container);
        if (!fileList) return;

        const card = fileList.querySelector(`[data-file-index="${index}"]`) as HTMLElement;
        if (!card) return;

        const fileData = state.files[index];
        this.updateCardProgress(card, fileData);
    }

    private showError(container: HTMLElement, message: string): void {
        container.setAttribute('data-invalid', 'true');
        console.error("File Upload Error:", message);
    }

    private clearError(container: HTMLElement): void {
        container.removeAttribute('data-invalid');
    }

    private formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    private preventDefault(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    }

    private announceChange(container: HTMLElement, message: string): void {
        const announcement = DOMUtils.createElement('div', {
            attributes: { 'aria-live': 'polite', 'aria-atomic': 'true' },
            classes: ['sr-only'],
            textContent: message
        });
        container.appendChild(announcement);
        setTimeout(() => {
            if (container.contains(announcement)) {
                container.removeChild(announcement);
            }
        }, 1000);
    }

    // File type icon detection using Blade templates
    private getFileTypeIcon(filename: string, container: HTMLElement): string {
        const ext = filename.split('.').pop()?.toLowerCase() || '';

        // Map file extensions to template types
        const templateMap: Record<string, string> = {
            // PDF
            'pdf': 'pdf',

            // Documents
            'doc': 'document',
            'docx': 'document',
            'ppt': 'document',
            'pptx': 'document',
            'xls': 'document',
            'xlsx': 'document',
            'odt': 'document',
            'ods': 'document',
            'odp': 'document',

            // Code files
            'js': 'code',
            'ts': 'code',
            'jsx': 'code',
            'tsx': 'code',
            'php': 'code',
            'py': 'code',
            'java': 'code',
            'cpp': 'code',
            'c': 'code',
            'html': 'code',
            'css': 'code',
            'scss': 'code',
            'json': 'code',
            'xml': 'code',
            'sql': 'code',

            // Video
            'mp4': 'video',
            'avi': 'video',
            'mov': 'video',
            'wmv': 'video',
            'flv': 'video',
            'mkv': 'video',

            // Archives
            'zip': 'archive',
            'rar': 'archive',
            '7z': 'archive',
            'tar': 'archive',
            'gz': 'archive',
        };

        const templateType = templateMap[ext] || 'default';

        // Find the icon template in the DOM
        const template = container.querySelector(`[data-icon-template="${templateType}"]`) as HTMLTemplateElement;

        if (!template) {
            console.warn(`Icon template "${templateType}" not found. Using default.`);
            const defaultTemplate = container.querySelector('[data-icon-template="default"]') as HTMLTemplateElement;
            if (defaultTemplate) {
                const content = defaultTemplate.content.cloneNode(true) as DocumentFragment;
                const div = document.createElement('div');
                div.appendChild(content);
                return div.innerHTML;
            }
            // Fallback if no template found
            return `<svg class="size-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/></svg>`;
        }

        // Clone the template content and return as HTML string
        const content = template.content.cloneNode(true) as DocumentFragment;
        const div = document.createElement('div');
        div.appendChild(content);
        return div.innerHTML;
    }

    private getFileTypeColor(filename: string): string {
        const ext = filename.split('.').pop()?.toLowerCase() || '';

        const colorMap: Record<string, string> = {
            // Documents - Red
            'pdf': '#D92D20',

            // Office Docs - Purple
            'doc': '#7F56D9',
            'docx': '#7F56D9',
            'ppt': '#7F56D9',
            'pptx': '#7F56D9',
            'xls': '#7F56D9',
            'xlsx': '#7F56D9',

            // Code - Indigo
            'js': '#444CE7',
            'ts': '#444CE7',
            'jsx': '#444CE7',
            'tsx': '#444CE7',
            'php': '#444CE7',
            'py': '#444CE7',
            'java': '#444CE7',
            'cpp': '#444CE7',
            'c': '#444CE7',
            'html': '#444CE7',
            'css': '#444CE7',
            'scss': '#444CE7',

            // Video - Blue
            'mp4': '#155EEF',
            'avi': '#155EEF',
            'mov': '#155EEF',
            'wmv': '#155EEF',
            'flv': '#155EEF',

            // Archives - Gray
            'zip': '#667085',
            'rar': '#667085',
            '7z': '#667085',
            'tar': '#667085',
            'gz': '#667085',
        };

        return colorMap[ext] || '#D5D7DA';
    }

    // Status icon helpers
    private getUploadingIcon(): string {
        return `<svg class="size-4 animate-spin text-text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;
    }

    private getCompleteIcon(): string {
        return `<svg class="size-4 text-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m7.5 12 3 3 6-6m5.5 3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"/>
        </svg>`;
    }

    private getErrorIcon(): string {
        return `<svg class="size-4 text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15 9-6 6m0-6 6 6m7-3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"/>
        </svg>`;
    }

    /**
     * Render image-fill variant preview
     */
    private renderImageFillPreview(container: HTMLElement): void {
        const state = this.getState(container);
        const dropzone = DOMUtils.querySelector('[data-file-dropzone]', container);
        const previewContainer = DOMUtils.querySelector('[data-image-fill-preview]', container);
        const previewImg = DOMUtils.querySelector('[data-image-fill-img]', container) as HTMLImageElement;
        const fileInput = DOMUtils.querySelector('[data-file-input]', container) as HTMLInputElement;

        if (!dropzone || !previewContainer || !previewImg || !fileInput) return;

        // If no files, show dropzone and hide preview
        if (!state || state.files.length === 0) {
            dropzone.classList.remove('hidden');
            previewContainer.classList.add('hidden');
            fileInput.classList.remove('pointer-events-none');
            return;
        }

        const fileData = state.files[0]; // Only one file in image-fill mode
        const file = fileData.file;

        // Only handle images
        if (!file.type.startsWith('image/')) {
            console.warn('Image-fill variant only supports image files.');
            return;
        }

        // Read and display the image
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const imageUrl = e.target.result as string;
                previewImg.src = imageUrl;
                previewImg.alt = file.name;

                // Show preview, hide dropzone
                previewContainer.classList.remove('hidden');
                dropzone.classList.add('hidden');

                // Disable pointer events on file input to allow hover/click on overlay
                fileInput.classList.add('pointer-events-none');

                this.announceChange(container, t('file_upload.file_selected', 'File selected: :name', { name: file.name }));
            }
        };
        reader.readAsDataURL(file);
    }

    /**
     * Clear image-fill variant preview and restore dropzone
     */
    private clearImageFillPreview(container: HTMLElement, fileInput: HTMLInputElement): void {
        const dropzone = DOMUtils.querySelector('[data-file-dropzone]', container);
        const previewContainer = DOMUtils.querySelector('[data-image-fill-preview]', container);
        const previewImg = DOMUtils.querySelector('[data-image-fill-img]', container) as HTMLImageElement;

        if (!dropzone || !previewContainer || !previewImg) return;

        // Clear state
        this.setState(container, { files: [] });

        // Clear file input
        fileInput.value = '';

        // Clear preview image
        previewImg.src = '';
        previewImg.alt = '';

        // Show dropzone, hide preview
        dropzone.classList.remove('hidden');
        previewContainer.classList.add('hidden');

        // Re-enable pointer events on file input for normal click-to-upload
        fileInput.classList.remove('pointer-events-none');

        this.announceChange(container, t('file_upload.file_removed', 'File removed.'));
    }
}
