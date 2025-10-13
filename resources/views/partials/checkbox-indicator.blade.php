@php
    // Custom checkbox box size
    $boxSizeClasses = match ($size) {
        'xs' => 'w-3.5 h-3.5',
        'sm' => 'w-4 h-4',
        'md' => 'w-5 h-5',
        'lg' => 'w-6 h-6',
        'xl' => 'w-7 h-7',
        default => 'w-4 h-4'
    };

    // SVG checkmark size
    $iconSizeClasses = match ($size) {
        'xs' => 'w-2 h-2',
        'sm' => 'w-2.5 h-2.5',
        'md' => 'w-3 h-3',
        'lg' => 'w-4 h-4',
        'xl' => 'w-5 h-5',
        default => 'w-2.5 h-2.5'
    };

    // Base checkbox box styling - custom visual element
    if ($disabled) {
        $checkboxBoxClasses = 'border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-700/30 rounded-md flex items-center justify-center cursor-not-allowed shadow-xs grayscale-[0.3]';
        $checkmarkClasses = 'text-neutral-400 dark:text-neutral-600';
    } elseif ($hasError) {
        $checkboxBoxClasses = 'border-2 rounded-md flex items-center justify-center transition-all duration-300 border-danger group-hover:border-danger/80 group-active:scale-[0.95] group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-offset-2 group-has-[:focus-visible]:ring-danger dark:group-has-[:focus-visible]:ring-offset-neutral-900 shadow-xs animate-shake';
        $checkmarkClasses = 'text-white opacity-0 transform scale-0 transition-all duration-200 ease-out group-has-[:checked]:opacity-100 group-has-[:checked]:scale-100';
        $checkboxBoxClasses .= ' group-has-[:checked]:border-transparent group-has-[:checked]:bg-danger';
    } else {
        // Color-based solid backgrounds and states
        $bgClasses = match ($color) {
            'brand' => 'group-has-[:checked]:bg-brand',
            'success' => 'group-has-[:checked]:bg-green-500',
            'warning' => 'group-has-[:checked]:bg-amber-500',
            'danger' => 'group-has-[:checked]:bg-red-500',
            'neutral' => 'group-has-[:checked]:bg-neutral-500 dark:group-has-[:checked]:bg-neutral-600',
            default => 'group-has-[:checked]:bg-brand'
        };

        $hoverColor = match ($color) {
            'brand' => 'group-hover:has-[:not(:checked)]:border-brand group-hover:has-[:not(:checked)]:bg-brand/5',
            'success' => 'group-hover:has-[:not(:checked)]:border-green-500 group-hover:has-[:not(:checked)]:bg-green-50 dark:group-hover:has-[:not(:checked)]:bg-green-950/20',
            'warning' => 'group-hover:has-[:not(:checked)]:border-amber-500 group-hover:has-[:not(:checked)]:bg-amber-50 dark:group-hover:has-[:not(:checked)]:bg-amber-950/20',
            'danger' => 'group-hover:has-[:not(:checked)]:border-red-500 group-hover:has-[:not(:checked)]:bg-red-50 dark:group-hover:has-[:not(:checked)]:bg-red-950/20',
            'neutral' => 'group-hover:has-[:not(:checked)]:border-neutral-400 group-hover:has-[:not(:checked)]:bg-neutral-50 dark:group-hover:has-[:not(:checked)]:bg-neutral-800/20',
            default => 'group-hover:has-[:not(:checked)]:border-brand group-hover:has-[:not(:checked)]:bg-brand/5'
        };

        $focusRing = match ($color) {
            'brand' => 'group-has-[:focus-visible]:ring-brand',
            'success' => 'group-has-[:focus-visible]:ring-green-500',
            'warning' => 'group-has-[:focus-visible]:ring-amber-500',
            'danger' => 'group-has-[:focus-visible]:ring-red-500',
            'neutral' => 'group-has-[:focus-visible]:ring-neutral-500',
            default => 'group-has-[:focus-visible]:ring-brand'
        };

        $checkboxBoxClasses = "border-2 border-neutral-400 dark:border-neutral-500 rounded-md flex items-center justify-center transition-all duration-300 {$hoverColor} {$bgClasses} group-has-[:checked]:border-transparent group-active:scale-[0.95] group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-offset-2 {$focusRing} dark:group-has-[:focus-visible]:ring-offset-neutral-900 shadow-xs";
        $checkmarkClasses = 'text-white opacity-0 transform scale-0 transition-all duration-200 ease-out group-has-[:checked]:opacity-100 group-has-[:checked]:scale-100';
    }
@endphp

{{-- Custom visual checkbox with animated checkmark --}}
<div data-checkbox-indicator class="{{ $boxSizeClasses }} {{ $checkboxBoxClasses }} shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="{{ $iconSizeClasses }} {{ $checkmarkClasses }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
</div>
