/**
 * EditorActions - Handles interactive features for rich text editor components
 *
 * Provides functionality for:
 * - Quill.js rich text editor initialization and management
 * - Toolbar configuration and customization
 * - Content synchronization with hidden textarea for form submission
 * - Read-only and disabled state management
 * - Custom actions (clear, copy)
 * - Livewire integration via hidden textarea
 */

import Quill from 'quill';
import { BaseActionClass } from './utils/BaseActionClass';
import { DOMUtils } from './utils/DOMUtils';
import { EventUtils } from './utils/EventUtils';

interface EditorState {
    quillInstance: Quill;
    textarea: HTMLTextAreaElement;
    container: HTMLElement;
    disabled: boolean;
    readonly: boolean;
}

interface EditorEvent {
    element: HTMLElement;
    quillInstance: Quill;
    content: string;
    html: string;
}

export class EditorActions extends BaseActionClass<EditorState> {
    /**
     * Initialize editor elements - required by BaseActionClass
     */
    protected initializeElements(): void {
        this.initializeEditors();
    }

    /**
     * Bind event listeners - required by BaseActionClass
     */
    protected bindEventListeners(): void {
        // Handle clear action
        EventUtils.handleDelegatedEvent('click', '[data-action="clear"]', (button) => {
            const editorWrapper = DOMUtils.getClosest(button, '[data-keys-editor]');
            if (editorWrapper) {
                this.handleClearAction(editorWrapper as HTMLElement);
            }
        });

        // Handle copy action
        EventUtils.handleDelegatedEvent('click', '[data-action="copy"]', (button) => {
            const editorWrapper = DOMUtils.getClosest(button, '[data-keys-editor]');
            if (editorWrapper) {
                this.handleCopyAction(editorWrapper as HTMLElement);
            }
        });
    }

    /**
     * Initialize all editor instances on the page
     */
    private initializeEditors(): void {
        const editorContainers = DOMUtils.querySelectorAll('[data-editor-container]');

        editorContainers.forEach((container) => {
            this.setupEditor(container as HTMLElement);
        });
    }

    /**
     * Setup a single editor instance
     */
    private setupEditor(container: HTMLElement): void {
        // Skip if already initialized
        if (this.hasState(container)) {
            return;
        }

        const editorId = container.id;
        const textareaId = editorId.replace('-editor', '');
        const textarea = DOMUtils.querySelector(`#${textareaId}[data-editor-input]`) as HTMLTextAreaElement;

        if (!textarea) {
            console.warn(`[EditorActions] Textarea not found for editor: ${editorId}`);
            return;
        }

        // Get configuration from data attributes
        const theme = container.dataset.theme || 'snow';
        const placeholder = container.dataset.placeholder || '';
        const disabled = container.dataset.disabled === 'true';
        const readonly = container.dataset.readonly === 'true';
        const toolbarConfig = this.parseToolbarConfig(container.dataset.toolbar);

        // Initialize Quill
        const quillInstance = new Quill(container, {
            theme: theme,
            placeholder: placeholder,
            readOnly: readonly || disabled,
            modules: {
                toolbar: toolbarConfig
            }
        });

        // Set initial content
        const initialValue = textarea.value;
        if (initialValue) {
            quillInstance.root.innerHTML = initialValue;
        }

        // Store state
        this.setState(container, {
            quillInstance,
            textarea,
            container,
            disabled,
            readonly
        });

        // Sync content to textarea on change
        quillInstance.on('text-change', () => {
            this.syncContent(container);
        });

        // Handle disabled/readonly states
        if (disabled) {
            quillInstance.enable(false);
            container.classList.add('pointer-events-none');
        } else if (readonly) {
            quillInstance.enable(false);
        }

        // Dispatch ready event
        this.dispatchReadyEvent(container, quillInstance);
    }

    /**
     * Parse toolbar configuration from JSON string
     */
    private parseToolbarConfig(toolbarJson?: string): any {
        if (!toolbarJson) {
            return true; // Default toolbar
        }

        try {
            return JSON.parse(toolbarJson);
        } catch (error) {
            console.warn('[EditorActions] Invalid toolbar configuration:', error);
            return true;
        }
    }

    /**
     * Sync Quill content to hidden textarea
     */
    private syncContent(container: HTMLElement): void {
        const state = this.getState(container);
        if (!state) return;

        const { quillInstance, textarea } = state;
        const html = quillInstance.root.innerHTML;

        // Update textarea value
        textarea.value = html;

        // Dispatch native input event for Livewire
        const inputEvent = new Event('input', { bubbles: true });
        textarea.dispatchEvent(inputEvent);

        // Dispatch custom change event
        this.dispatchChangeEvent(container, quillInstance);
    }

    /**
     * Handle clear action
     */
    private handleClearAction(container: HTMLElement): void {
        const state = this.getState(container);
        if (!state) return;

        const { quillInstance } = state;
        quillInstance.setText('');
        this.syncContent(container);
    }

    /**
     * Handle copy action
     */
    private handleCopyAction(container: HTMLElement): void {
        const state = this.getState(container);
        if (!state) return;

        const { quillInstance } = state;
        const html = quillInstance.root.innerHTML;

        // Copy to clipboard
        navigator.clipboard.writeText(html).then(() => {
            console.log('[EditorActions] Content copied to clipboard');
        }).catch((error) => {
            console.warn('[EditorActions] Failed to copy content:', error);
        });
    }

    /**
     * Dispatch ready event
     */
    private dispatchReadyEvent(container: HTMLElement, quillInstance: Quill): void {
        EventUtils.dispatchCustomEvent(container, 'editor-ready', {
            element: container,
            quillInstance,
            content: quillInstance.getText(),
            html: quillInstance.root.innerHTML
        } as EditorEvent);
    }

    /**
     * Dispatch change event
     */
    private dispatchChangeEvent(container: HTMLElement, quillInstance: Quill): void {
        EventUtils.dispatchCustomEvent(container, 'editor-change', {
            element: container,
            quillInstance,
            content: quillInstance.getText(),
            html: quillInstance.root.innerHTML
        } as EditorEvent);
    }

    /**
     * Get editor value (HTML content)
     */
    public getValue(container: HTMLElement): string | null {
        const state = this.getState(container);
        return state ? state.quillInstance.root.innerHTML : null;
    }

    /**
     * Set editor value (HTML content)
     */
    public setValue(container: HTMLElement, html: string): void {
        const state = this.getState(container);
        if (!state) return;

        state.quillInstance.root.innerHTML = html;
        this.syncContent(container);
    }

    /**
     * Get editor text content (without HTML)
     */
    public getText(container: HTMLElement): string | null {
        const state = this.getState(container);
        return state ? state.quillInstance.getText() : null;
    }

    /**
     * Enable editor
     */
    public enable(container: HTMLElement): void {
        const state = this.getState(container);
        if (!state) return;

        state.quillInstance.enable(true);
        state.disabled = false;
        state.readonly = false;
        container.classList.remove('pointer-events-none');
    }

    /**
     * Disable editor
     */
    public disable(container: HTMLElement): void {
        const state = this.getState(container);
        if (!state) return;

        state.quillInstance.enable(false);
        state.disabled = true;
        container.classList.add('pointer-events-none');
    }

    /**
     * Set editor to readonly
     */
    public setReadOnly(container: HTMLElement, readonly: boolean): void {
        const state = this.getState(container);
        if (!state) return;

        state.quillInstance.enable(!readonly);
        state.readonly = readonly;
    }

    /**
     * Get Quill instance for a container
     */
    public getQuillInstance(container: HTMLElement): Quill | null {
        const state = this.getState(container);
        return state ? state.quillInstance : null;
    }

    /**
     * Add a custom ready handler with automatic cleanup
     */
    public addReadyHandler(handler: (data: EditorEvent) => void): () => void {
        return EventUtils.addEventListener(document, 'editor-ready', (event) => {
            const customEvent = event as CustomEvent<EditorEvent>;
            handler(customEvent.detail);
        });
    }

    /**
     * Add a custom change handler with automatic cleanup
     */
    public addChangeHandler(handler: (data: EditorEvent) => void): () => void {
        return EventUtils.addEventListener(document, 'editor-change', (event) => {
            const customEvent = event as CustomEvent<EditorEvent>;
            handler(customEvent.detail);
        });
    }

    /**
     * Clean up EditorActions - extends BaseActionClass destroy
     */
    protected onDestroy(): void {
        // Clean up all Quill instances
        this.getAllStates().forEach((state) => {
            // Quill doesn't have a built-in destroy method
            // But we can clean up event listeners by setting content to empty
            state.quillInstance.setText('');
        });
    }

    /**
     * Setup dynamic observer for new editors
     */
    protected setupDynamicObserver(): void {
        this.createDynamicObserver((addedNodes) => {
            addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node as HTMLElement;

                    // Check if the node itself is an editor container
                    if (element.hasAttribute('data-editor-container')) {
                        this.setupEditor(element);
                    }

                    // Check for editor containers within the added node
                    const editorContainers = DOMUtils.querySelectorAll('[data-editor-container]', element);
                    editorContainers.forEach((container) => {
                        this.setupEditor(container as HTMLElement);
                    });
                }
            });
        });
    }
}

export default EditorActions.getInstance();
