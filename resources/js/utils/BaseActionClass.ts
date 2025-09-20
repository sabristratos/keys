/**
 * BaseActionClass - Abstract base class for all Keys UI action classes
 *
 * Eliminates code duplication while preserving 100% of existing functionality:
 * - Singleton pattern implementation
 * - Initialization control and lifecycle management
 * - State management utilities
 * - Common cleanup and destroy patterns
 * - Extensible hooks for specialized functionality
 */

import { DebugUtils } from './DebugUtils';

export abstract class BaseActionClass<TState = any> {
    private static instances = new Map<string, BaseActionClass>();
    protected initialized = false;

    /**
     * Singleton pattern implementation
     * Automatically handles instance management based on class name
     */
    public static getInstance<T extends BaseActionClass>(this: new () => T): T {
        const className = this.name;
        if (!BaseActionClass.instances.has(className)) {
            BaseActionClass.instances.set(className, new this());
        }
        return BaseActionClass.instances.get(className) as T;
    }

    /**
     * Built-in state management for component states
     * Most action classes use Map<HTMLElement, State> pattern
     */
    protected stateManager = new Map<HTMLElement, TState>();

    /**
     * Standardized initialization flow
     * Prevents double initialization and provides lifecycle hooks
     */
    public init(): void {
        if (this.initialized) {
            DebugUtils.debugWarn(this.getComponentName(), 'Component already initialized, skipping');
            return;
        }

        const startTime = performance.now();
        DebugUtils.debugLog(this.getComponentName(), 'Starting initialization...');

        // Pre-initialization hook
        this.onBeforeInit?.();

        // Core initialization methods (required by subclasses)
        try {
            this.bindEventListeners();
            this.initializeElements();

            // Setup dynamic content observation if needed
            this.setupDynamicObserver?.();

            // Post-initialization hook
            this.onAfterInit?.();

            this.initialized = true;

            // Log successful initialization
            DebugUtils.debugTiming(this.getComponentName(), 'Initialization', startTime);
            DebugUtils.debugLog(this.getComponentName(), `Successfully initialized with ${this.getStateCount()} managed elements`);

        } catch (error) {
            DebugUtils.debugError(this.getComponentName(), 'Initialization failed', error);
            throw error;
        }
    }

    /**
     * Abstract methods that subclasses must implement
     * These contain the core functionality specific to each action class
     */
    protected abstract bindEventListeners(): void;
    protected abstract initializeElements(): void;

    /**
     * Optional lifecycle hooks for specialized functionality
     * Subclasses can implement these as needed
     */
    protected onBeforeInit?(): void;
    protected onAfterInit?(): void;
    protected setupDynamicObserver?(): void;
    protected onDestroy?(): void;

    /**
     * Standardized cleanup and destroy
     * Handles state cleanup and provides extension point
     */
    public destroy(): void {
        if (!this.initialized) {
            DebugUtils.debugWarn(this.getComponentName(), 'Component not initialized, nothing to destroy');
            return;
        }

        DebugUtils.debugLog(this.getComponentName(), 'Destroying component...');

        const stateCount = this.getStateCount();
        this.onDestroy?.();
        this.stateManager.clear();
        this.initialized = false;

        DebugUtils.debugLog(this.getComponentName(), `Destroyed component with ${stateCount} managed elements`);
    }

    /**
     * State management utilities
     * Common operations used across multiple action classes
     */
    protected getState(element: HTMLElement): TState | undefined {
        return this.stateManager.get(element);
    }

    protected setState(element: HTMLElement, state: TState): void {
        this.stateManager.set(element, state);
    }

    protected removeState(element: HTMLElement): boolean {
        return this.stateManager.delete(element);
    }

    protected hasState(element: HTMLElement): boolean {
        return this.stateManager.has(element);
    }

    protected clearAllStates(): void {
        this.stateManager.clear();
    }

    protected getAllStates(): Map<HTMLElement, TState> {
        return new Map(this.stateManager);
    }

    /**
     * Common utility methods used across action classes
     * Note: For DOM operations use DOMUtils, for events use EventUtils
     */

    /**
     * Common MutationObserver setup for dynamic content
     * Used by many action classes to detect new elements
     */
    protected createDynamicObserver(callback: (addedNodes: NodeList) => void): MutationObserver {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    callback(mutation.addedNodes);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return observer;
    }

    /**
     * Debounced resize handler utility
     * Used by positioning-aware components
     */
    protected createResizeHandler(callback: () => void, delay: number = 100): () => void {
        let timeout: ReturnType<typeof setTimeout> | null = null;

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(callback, delay);
        };
    }

    /**
     * Check if the action class is properly initialized
     */
    public isInitialized(): boolean {
        return this.initialized;
    }

    /**
     * Get the number of managed states
     * Useful for debugging and testing
     */
    protected getStateCount(): number {
        return this.stateManager.size;
    }

    /**
     * Get the component name for debugging
     * Uses the class constructor name
     */
    protected getComponentName(): string {
        return this.constructor.name;
    }
}

export default BaseActionClass;