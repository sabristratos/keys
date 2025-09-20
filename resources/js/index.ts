/**
 * Keys UI - JavaScript/TypeScript exports
 *
 * This file exports all the interactive functionality for Keys UI components.
 * Import individual classes or use the default initialization.
 */

import { FormActions } from './FormActions';
import { AlertActions } from './AlertActions';
import { CalendarActions } from './CalendarActions';
import { RadioActions } from './RadioActions';
import { RangeActions } from './RangeActions';
import { SelectActions } from './SelectActions';
import { TabsActions } from './TabsActions';
import { ModalActions } from './ModalActions';
import { ToastActions } from './ToastActions';
import { DropdownActions } from './DropdownActions';
import { TableActions } from './TableActions';
import { ButtonGroupActions } from './ButtonGroupActions';
import { TooltipActions } from './TooltipActions';
import { TimePickerActions } from './TimePickerActions';
import { AccordionActions } from './AccordionActions';
import { EditorActions } from './EditorActions';
import { DatePickerActions } from './DatePickerActions';
import { AddToCartActions } from './AddToCartActions';
import { FileUploadActions } from './FileUploadActions';
import { GalleryActions } from './GalleryActions';

// Import utility classes for external use
import { BaseActionClass } from './utils/BaseActionClass';
import { DOMUtils } from './utils/DOMUtils';
import { EventUtils } from './utils/EventUtils';
import { RTLUtils } from './utils/RTLUtils';
import { DebugUtils } from './utils/DebugUtils';

export { FormActions, AlertActions, CalendarActions, RadioActions, RangeActions, SelectActions, TabsActions, ModalActions, ToastActions, DropdownActions, TableActions, ButtonGroupActions, TooltipActions, TimePickerActions, AccordionActions, EditorActions, DatePickerActions, AddToCartActions, FileUploadActions, GalleryActions };

// Export utility classes for external consumption
export { BaseActionClass, DOMUtils, EventUtils, RTLUtils, DebugUtils };

/**
 * Initialize all Keys UI components
 * Call this function to automatically set up all interactive functionality
 */
export function initializeKeysUI(): void {
    const startTime = performance.now();

    DebugUtils.debugLog('KeysUI', 'Starting Keys UI initialization...');

    // Initialize RTL support first
    RTLUtils.initialize();

    // Define all components to initialize
    const components = [
        { name: 'FormActions', instance: FormActions.getInstance() },
        { name: 'AlertActions', instance: AlertActions.getInstance() },
        { name: 'CalendarActions', instance: CalendarActions.getInstance() },
        { name: 'RadioActions', instance: RadioActions.getInstance() },
        { name: 'RangeActions', instance: RangeActions.getInstance() },
        { name: 'SelectActions', instance: SelectActions.getInstance() },
        { name: 'TabsActions', instance: TabsActions.getInstance() },
        { name: 'ModalActions', instance: ModalActions.getInstance() },
        { name: 'ToastActions', instance: ToastActions.getInstance() },
        { name: 'DropdownActions', instance: DropdownActions.getInstance() },
        { name: 'TableActions', instance: TableActions.getInstance() },
        { name: 'ButtonGroupActions', instance: ButtonGroupActions.getInstance() },
        { name: 'TooltipActions', instance: TooltipActions.getInstance() },
        { name: 'TimePickerActions', instance: TimePickerActions.getInstance() },
        { name: 'AccordionActions', instance: AccordionActions.getInstance() },
        { name: 'EditorActions', instance: EditorActions.getInstance() },
        { name: 'DatePickerActions', instance: DatePickerActions.getInstance() },
        { name: 'AddToCartActions', instance: AddToCartActions.getInstance() },
        { name: 'FileUploadActions', instance: FileUploadActions.getInstance() },
        { name: 'GalleryActions', instance: GalleryActions.getInstance() },
    ];

    let successCount = 0;
    let failedComponents: string[] = [];

    // Initialize each component with error handling
    components.forEach(({ name, instance }) => {
        try {
            instance.init();
            successCount++;
        } catch (error) {
            failedComponents.push(name);
            DebugUtils.debugError('KeysUI', `Failed to initialize ${name}`, error);
        }
    });

    // Log initialization summary
    const initTime = performance.now() - startTime;
    DebugUtils.debugInitSummary(successCount, initTime);

    if (failedComponents.length > 0) {
        DebugUtils.debugError('KeysUI', `${failedComponents.length} components failed to initialize`, failedComponents);
    }
}

/**
 * KeysUI main object - provides consistent API for both ES modules and UMD builds
 */
const KeysUI = {
    FormActions: FormActions.getInstance(),
    AlertActions: AlertActions.getInstance(),
    CalendarActions: CalendarActions.getInstance(),
    RadioActions: RadioActions.getInstance(),
    RangeActions: RangeActions.getInstance(),
    SelectActions: SelectActions.getInstance(),
    TabsActions: TabsActions.getInstance(),
    ModalActions: ModalActions.getInstance(),
    ToastActions: ToastActions.getInstance(),
    DropdownActions: DropdownActions.getInstance(),
    TableActions: TableActions.getInstance(),
    ButtonGroupActions: ButtonGroupActions.getInstance(),
    TooltipActions: TooltipActions.getInstance(),
    TimePickerActions: TimePickerActions.getInstance(),
    AccordionActions: AccordionActions.getInstance(),
    EditorActions: EditorActions.getInstance(),
    DatePickerActions: DatePickerActions.getInstance(),
    AddToCartActions: AddToCartActions.getInstance(),
    FileUploadActions: FileUploadActions.getInstance(),
    GalleryActions: GalleryActions.getInstance(),
    init: initializeKeysUI,
    initialize: initializeKeysUI // Alias for consistency
};

// Export as default for ES modules
export default KeysUI;

// Also expose on window for UMD builds
if (typeof window !== 'undefined') {
    (window as any).KeysUI = KeysUI;
}
