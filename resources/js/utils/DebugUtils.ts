/**
 * DebugUtils - Environment-aware debugging utilities for Keys UI
 *
 * Provides console logging functionality that only activates when:
 * - APP_ENV is set to 'local'
 * - OR debug is explicitly enabled in Laravel config
 *
 * This ensures zero performance impact in production while providing
 * comprehensive debugging information during development.
 */

declare global {
    interface Window {
        KeysUIConfig?: {
            environment: string;
            debug: boolean;
            version: string;
        };
    }
}

export class DebugUtils {
    private static isDebugEnabled(): boolean {
        const config = window.KeysUIConfig;
        if (!config) {
            return false;
        }

        // Enable debug logging if environment is 'local' OR debug is explicitly enabled
        return config.environment === 'local' || config.debug === true;
    }

    /**
     * Log debug information only in local environment
     */
    public static debugLog(component: string, message: string, data?: any): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        const prefix = `🔧 Keys UI [${component}]`;

        if (data !== undefined) {
            console.log(`${prefix} ${message}`, data);
        } else {
            console.log(`${prefix} ${message}`);
        }
    }

    /**
     * Log component initialization with element count
     */
    public static debugComponentInit(component: string, elementCount: number, elements?: NodeListOf<Element> | Element[]): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        const prefix = `🚀 Keys UI [${component}]`;
        const message = `Initialized with ${elementCount} element${elementCount !== 1 ? 's' : ''}`;

        if (elements && elementCount > 0) {
            console.group(`${prefix} ${message}`);
            console.log('Elements:', elements);
            console.groupEnd();
        } else {
            console.log(`${prefix} ${message}`);
        }
    }

    /**
     * Log errors and issues with component initialization
     */
    public static debugError(component: string, error: string, details?: any): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        const prefix = `❌ Keys UI [${component}]`;

        if (details !== undefined) {
            console.error(`${prefix} ${error}`, details);
        } else {
            console.error(`${prefix} ${error}`);
        }
    }

    /**
     * Log warnings for potential issues
     */
    public static debugWarn(component: string, warning: string, details?: any): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        const prefix = `⚠️ Keys UI [${component}]`;

        if (details !== undefined) {
            console.warn(`${prefix} ${warning}`, details);
        } else {
            console.warn(`${prefix} ${warning}`);
        }
    }

    /**
     * Create a grouped console log for complex operations
     */
    public static debugGroup(component: string, title: string, callback: () => void): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        const prefix = `📋 Keys UI [${component}]`;
        console.group(`${prefix} ${title}`);

        try {
            callback();
        } finally {
            console.groupEnd();
        }
    }

    /**
     * Log state changes and updates
     */
    public static debugState(component: string, action: string, element: Element, state?: any): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        const prefix = `📊 Keys UI [${component}]`;
        const elementInfo = element.tagName.toLowerCase() + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ').join('.')}` : '');

        if (state !== undefined) {
            console.log(`${prefix} ${action} for ${elementInfo}`, state);
        } else {
            console.log(`${prefix} ${action} for ${elementInfo}`);
        }
    }

    /**
     * Log event binding and unbinding
     */
    public static debugEvent(component: string, action: 'bind' | 'unbind', eventType: string, elementCount: number): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        const prefix = `🎯 Keys UI [${component}]`;
        const verb = action === 'bind' ? 'Bound' : 'Unbound';
        console.log(`${prefix} ${verb} '${eventType}' event listeners to ${elementCount} element${elementCount !== 1 ? 's' : ''}`);
    }

    /**
     * Log performance timing information
     */
    public static debugTiming(component: string, operation: string, startTime: number): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        const duration = performance.now() - startTime;
        const prefix = `⏱️ Keys UI [${component}]`;
        console.log(`${prefix} ${operation} completed in ${duration.toFixed(2)}ms`);
    }

    /**
     * Log the overall Keys UI initialization summary
     */
    public static debugInitSummary(totalComponents: number, initTime: number): void {
        if (!this.isDebugEnabled()) {
            return;
        }

        console.group('🎉 Keys UI Initialization Complete');
        console.log(`✅ Initialized ${totalComponents} component types`);
        console.log(`⏱️ Total initialization time: ${initTime.toFixed(2)}ms`);
        console.log(`🔧 Environment: ${window.KeysUIConfig?.environment || 'unknown'}`);
        console.log(`📦 Version: ${window.KeysUIConfig?.version || 'unknown'}`);
        console.groupEnd();
    }

    /**
     * Check if debug mode is currently active
     */
    public static isDebugActive(): boolean {
        return this.isDebugEnabled();
    }
}

export default DebugUtils;