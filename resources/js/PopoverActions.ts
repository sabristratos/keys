/**
 * Popover Actions for Keys UI
 * Handles interactive popovers with positioning, events, and accessibility
 */

export interface PopoverOptions {
    placement?: string;
    trigger?: 'click' | 'hover' | 'focus' | 'manual';
    delay?: number;
    hideDelay?: number;
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    floating?: boolean;
    offset?: number;
    autoPlacement?: boolean;
    disabled?: boolean;
}

export interface PopoverInstance {
    id: string;
    triggerElement: HTMLElement;
    popoverElement: HTMLElement;
    options: PopoverOptions;
    isVisible: boolean;
    showTimeout?: number;
    hideTimeout?: number;
    destroy: () => void;
    show: () => void;
    hide: () => void;
    toggle: () => void;
    updatePosition: () => void;
}

class PopoverActions {
    private static instances: Map<string, PopoverInstance> = new Map();
    private static floatingUIAvailable: boolean = false;
    private static documentEventListeners: Set<() => void> = new Set();

    static {
        // Check if Floating UI is available
        if (typeof window !== 'undefined' && (window as any).FloatingUIDOM) {
            this.floatingUIAvailable = true;
        }

        // Initialize on DOM ready
        if (typeof document !== 'undefined') {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
        }
    }

    /**
     * Initialize all popovers on the page
     */
    static init(): void {
        this.cleanup();

        // Find all popover triggers
        const triggers = document.querySelectorAll('[data-popover-target]');
        triggers.forEach(trigger => {
            if (trigger instanceof HTMLElement) {
                this.initializePopover(trigger);
            }
        });

        // Setup global event listeners
        this.setupGlobalEventListeners();
    }

    /**
     * Initialize a specific popover
     */
    static initializePopover(triggerElement: HTMLElement): PopoverInstance | null {
        const targetId = triggerElement.getAttribute('data-popover-target');
        if (!targetId) return null;

        const popoverElement = document.getElementById(targetId);
        if (!popoverElement) return null;

        // Don't initialize if already exists
        if (this.instances.has(targetId)) {
            return this.instances.get(targetId) || null;
        }

        const options: PopoverOptions = {
            placement: triggerElement.getAttribute('data-popover-placement') || 'bottom',
            trigger: (triggerElement.getAttribute('data-popover-trigger') || 'click') as PopoverOptions['trigger'],
            delay: parseInt(popoverElement.getAttribute('data-delay') || '0'),
            hideDelay: parseInt(popoverElement.getAttribute('data-hide-delay') || '0'),
            closeOnOutsideClick: popoverElement.getAttribute('data-close-on-outside-click') === 'true',
            closeOnEscape: popoverElement.getAttribute('data-close-on-escape') === 'true',
            floating: popoverElement.getAttribute('data-floating') === 'true',
            offset: parseInt(popoverElement.getAttribute('data-offset') || '8'),
            autoPlacement: popoverElement.getAttribute('data-auto-placement') === 'true',
            disabled: popoverElement.getAttribute('data-disabled') === 'true'
        };

        const instance: PopoverInstance = {
            id: targetId,
            triggerElement,
            popoverElement,
            options,
            isVisible: false,
            destroy: () => this.destroyInstance(targetId),
            show: () => this.show(targetId),
            hide: () => this.hide(targetId),
            toggle: () => this.toggle(targetId),
            updatePosition: () => this.updatePosition(targetId)
        };

        // Setup event listeners for this popover
        this.setupPopoverEventListeners(instance);

        this.instances.set(targetId, instance);
        return instance;
    }

    /**
     * Setup event listeners for a specific popover
     */
    private static setupPopoverEventListeners(instance: PopoverInstance): void {
        const { triggerElement, options } = instance;

        if (options.disabled) return;

        switch (options.trigger) {
            case 'click':
                triggerElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggle(instance.id);
                });
                break;

            case 'hover':
                triggerElement.addEventListener('mouseenter', () => {
                    this.show(instance.id);
                });
                triggerElement.addEventListener('mouseleave', () => {
                    this.hide(instance.id);
                });
                instance.popoverElement.addEventListener('mouseenter', () => {
                    this.clearHideTimeout(instance);
                });
                instance.popoverElement.addEventListener('mouseleave', () => {
                    this.hide(instance.id);
                });
                break;

            case 'focus':
                triggerElement.addEventListener('focus', () => {
                    this.show(instance.id);
                });
                triggerElement.addEventListener('blur', () => {
                    this.hide(instance.id);
                });
                break;

            case 'manual':
                // No automatic event listeners for manual trigger
                break;
        }
    }

    /**
     * Setup global event listeners
     */
    private static setupGlobalEventListeners(): void {
        // Outside click handler
        const outsideClickHandler = (e: Event) => {
            const target = e.target as HTMLElement;

            this.instances.forEach((instance) => {
                if (!instance.isVisible || !instance.options.closeOnOutsideClick) return;

                const isInsidePopover = instance.popoverElement.contains(target);
                const isInsideTrigger = instance.triggerElement.contains(target);

                if (!isInsidePopover && !isInsideTrigger) {
                    this.hide(instance.id);
                }
            });
        };

        // Escape key handler
        const escapeKeyHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                this.instances.forEach((instance) => {
                    if (instance.isVisible && instance.options.closeOnEscape) {
                        this.hide(instance.id);
                    }
                });
            }
        };

        // Resize handler
        const resizeHandler = () => {
            this.instances.forEach((instance) => {
                if (instance.isVisible) {
                    this.updatePosition(instance.id);
                }
            });
        };

        document.addEventListener('click', outsideClickHandler);
        document.addEventListener('keydown', escapeKeyHandler);
        window.addEventListener('resize', resizeHandler);

        // Store cleanup functions
        const cleanup = () => {
            document.removeEventListener('click', outsideClickHandler);
            document.removeEventListener('keydown', escapeKeyHandler);
            window.removeEventListener('resize', resizeHandler);
        };

        this.documentEventListeners.add(cleanup);
    }

    /**
     * Show a popover
     */
    static show(id: string): void {
        const instance = this.instances.get(id);
        if (!instance || instance.options.disabled || instance.isVisible) return;

        this.clearTimeouts(instance);

        const showPopover = () => {
            // Hide other click-triggered popovers
            if (instance.options.trigger === 'click') {
                this.instances.forEach((otherInstance) => {
                    if (otherInstance.id !== id && otherInstance.isVisible && otherInstance.options.trigger === 'click') {
                        this.hide(otherInstance.id);
                    }
                });
            }

            // Update position
            this.updatePosition(id);

            // Show popover
            instance.popoverElement.setAttribute('data-show', 'true');
            instance.popoverElement.setAttribute('aria-hidden', 'false');
            instance.triggerElement.setAttribute('aria-expanded', 'true');
            instance.isVisible = true;

            // Emit custom event
            this.emitEvent(instance.triggerElement, 'popover:show', { popover: instance });

            // Focus management for accessibility
            if (instance.options.trigger === 'click' || instance.options.trigger === 'focus') {
                setTimeout(() => {
                    const focusableElement = instance.popoverElement.querySelector(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    ) as HTMLElement;

                    if (focusableElement) {
                        focusableElement.focus();
                    } else {
                        instance.popoverElement.focus();
                    }
                }, 100);
            }
        };

        if (instance.options.delay && instance.options.delay > 0) {
            instance.showTimeout = window.setTimeout(showPopover, instance.options.delay);
        } else {
            showPopover();
        }
    }

    /**
     * Hide a popover
     */
    static hide(id: string): void {
        const instance = this.instances.get(id);
        if (!instance || !instance.isVisible) return;

        this.clearTimeouts(instance);

        const hidePopover = () => {
            instance.popoverElement.setAttribute('data-show', 'false');
            instance.popoverElement.setAttribute('aria-hidden', 'true');
            instance.triggerElement.setAttribute('aria-expanded', 'false');
            instance.isVisible = false;

            // Emit custom event
            this.emitEvent(instance.triggerElement, 'popover:hide', { popover: instance });

            // Return focus to trigger if needed
            if (document.activeElement && instance.popoverElement.contains(document.activeElement)) {
                instance.triggerElement.focus();
            }
        };

        const delay = instance.options.hideDelay || 0;
        if (delay > 0) {
            instance.hideTimeout = window.setTimeout(hidePopover, delay);
        } else {
            hidePopover();
        }
    }

    /**
     * Toggle a popover
     */
    static toggle(id: string): void {
        const instance = this.instances.get(id);
        if (!instance) return;

        if (instance.isVisible) {
            this.hide(id);
        } else {
            this.show(id);
        }
    }

    /**
     * Update popover position
     */
    static updatePosition(id: string): void {
        const instance = this.instances.get(id);
        if (!instance) return;

        if (instance.options.floating && this.floatingUIAvailable) {
            this.updateFloatingPosition(instance);
        } else {
            this.updateBasicPosition(instance);
        }
    }

    /**
     * Update position using Floating UI
     */
    private static updateFloatingPosition(instance: PopoverInstance): void {
        const { computePosition, flip, shift, offset, arrow } = (window as any).FloatingUIDOM;

        const arrowElement = instance.popoverElement.querySelector('[data-popper-arrow]') as HTMLElement;

        const middleware = [
            offset(instance.options.offset || 8),
            shift({ padding: 8 })
        ];

        if (instance.options.autoPlacement) {
            middleware.push(flip());
        }

        if (arrowElement) {
            middleware.push(arrow({ element: arrowElement }));
        }

        computePosition(instance.triggerElement, instance.popoverElement, {
            placement: instance.options.placement,
            middleware
        }).then(({ x, y, placement, middlewareData }: any) => {
            Object.assign(instance.popoverElement.style, {
                left: `${x}px`,
                top: `${y}px`,
                position: 'absolute'
            });

            instance.popoverElement.setAttribute('data-placement', placement);

            // Position arrow
            if (arrowElement && middlewareData.arrow) {
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]];

                Object.assign(arrowElement.style, {
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide as string]: '-4px',
                });
            }
        });
    }

    /**
     * Basic position calculation fallback
     */
    private static updateBasicPosition(instance: PopoverInstance): void {
        const triggerRect = instance.triggerElement.getBoundingClientRect();
        const popoverRect = instance.popoverElement.getBoundingClientRect();
        const offset = instance.options.offset || 8;

        let x = 0;
        let y = 0;

        switch (instance.options.placement) {
            case 'top':
                x = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
                y = triggerRect.top - popoverRect.height - offset;
                break;
            case 'bottom':
                x = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
                y = triggerRect.bottom + offset;
                break;
            case 'left':
                x = triggerRect.left - popoverRect.width - offset;
                y = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2);
                break;
            case 'right':
                x = triggerRect.right + offset;
                y = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2);
                break;
            default:
                x = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
                y = triggerRect.bottom + offset;
        }

        // Viewport constraints
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        x = Math.max(8, Math.min(x, viewportWidth - popoverRect.width - 8));
        y = Math.max(8, Math.min(y, viewportHeight - popoverRect.height - 8));

        Object.assign(instance.popoverElement.style, {
            left: `${x + window.scrollX}px`,
            top: `${y + window.scrollY}px`,
            position: 'absolute'
        });
    }

    /**
     * Clear timeouts for an instance
     */
    private static clearTimeouts(instance: PopoverInstance): void {
        if (instance.showTimeout) {
            clearTimeout(instance.showTimeout);
            instance.showTimeout = undefined;
        }
        if (instance.hideTimeout) {
            clearTimeout(instance.hideTimeout);
            instance.hideTimeout = undefined;
        }
    }

    /**
     * Clear hide timeout specifically
     */
    private static clearHideTimeout(instance: PopoverInstance): void {
        if (instance.hideTimeout) {
            clearTimeout(instance.hideTimeout);
            instance.hideTimeout = undefined;
        }
    }

    /**
     * Emit custom event
     */
    private static emitEvent(element: HTMLElement, eventName: string, detail: any): void {
        const event = new CustomEvent(eventName, {
            detail,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
    }

    /**
     * Destroy a specific instance
     */
    private static destroyInstance(id: string): void {
        const instance = this.instances.get(id);
        if (!instance) return;

        this.clearTimeouts(instance);
        if (instance.isVisible) {
            this.hide(id);
        }

        this.instances.delete(id);
    }

    /**
     * Clean up all instances and global listeners
     */
    static cleanup(): void {
        this.instances.forEach((instance) => {
            this.clearTimeouts(instance);
        });
        this.instances.clear();

        this.documentEventListeners.forEach(cleanup => cleanup());
        this.documentEventListeners.clear();
    }

    /**
     * Public API methods
     */
    static getInstance(id: string): PopoverInstance | undefined {
        return this.instances.get(id);
    }

    static getAllInstances(): PopoverInstance[] {
        return Array.from(this.instances.values());
    }

    static showById(id: string): void {
        this.show(id);
    }

    static hideById(id: string): void {
        this.hide(id);
    }

    static toggleById(id: string): void {
        this.toggle(id);
    }

    static hideAll(): void {
        this.instances.forEach((instance) => {
            if (instance.isVisible) {
                this.hide(instance.id);
            }
        });
    }
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    // Add to global scope for external access
    (window as any).PopoverActions = PopoverActions;
}

export default PopoverActions;