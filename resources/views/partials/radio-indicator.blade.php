@php
    // Custom radio circle size
    $circleSizeClasses = match ($size) {
        'xs' => 'w-3.5 h-3.5',
        'sm' => 'w-4 h-4',
        'md' => 'w-5 h-5',
        'lg' => 'w-6 h-6',
        'xl' => 'w-7 h-7',
        default => 'w-4 h-4'
    };

    // Inner dot size
    $dotSizeClasses = match ($size) {
        'xs' => 'w-1.5 h-1.5',
        'sm' => 'w-2 h-2',
        'md' => 'w-2.5 h-2.5',
        'lg' => 'w-3 h-3',
        'xl' => 'w-3.5 h-3.5',
        default => 'w-2 h-2'
    };

    // Base radio circle styling - custom visual element
    if ($disabled) {
        $radioCircleClasses = 'border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-700/30 rounded-full flex items-center justify-center cursor-not-allowed shadow-xs grayscale-[0.3]';
        $dotClasses = 'bg-neutral-400 dark:bg-neutral-600 rounded-full';
    } elseif ($hasError) {
        $radioCircleClasses = 'border-2 rounded-full flex items-center justify-center transition-all duration-300 border-danger group-hover:border-danger/80 group-active:scale-[0.95] group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-offset-2 group-has-[:focus-visible]:ring-danger dark:group-has-[:focus-visible]:ring-offset-neutral-900 shadow-xs animate-shake';
        $dotClasses = 'bg-danger rounded-full transform scale-0 transition-transform duration-200 ease-out group-has-[:checked]:scale-100';
        $radioCircleClasses .= ' group-has-[:checked]:border-danger';
    } else {
        // Color-based solid backgrounds and states
        $gradientClasses = match ($color) {
            'brand' => 'group-has-[:checked]:border-brand',
            'success' => 'group-has-[:checked]:border-green-600',
            'warning' => 'group-has-[:checked]:border-amber-600',
            'danger' => 'group-has-[:checked]:border-red-600',
            'neutral' => 'group-has-[:checked]:border-neutral-500',
            default => 'group-has-[:checked]:border-brand'
        };

        $dotBackground = match ($color) {
            'brand' => 'bg-brand',
            'success' => 'bg-green-500',
            'warning' => 'bg-amber-500',
            'danger' => 'bg-red-500',
            'neutral' => 'bg-neutral-500 dark:bg-neutral-600',
            default => 'bg-brand'
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

        $radioCircleClasses = "border-2 border-neutral-400 dark:border-neutral-500 rounded-full flex items-center justify-center transition-all duration-300 {$hoverColor} {$gradientClasses} group-active:scale-[0.95] group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-offset-2 {$focusRing} dark:group-has-[:focus-visible]:ring-offset-neutral-900 shadow-xs";
        $dotClasses = "{$dotBackground} rounded-full transform scale-0 transition-transform duration-200 ease-out group-has-[:checked]:scale-100";
    }
@endphp

{{-- Custom visual radio with animated dot --}}
<div data-radio-indicator class="{{ $circleSizeClasses }} {{ $radioCircleClasses }} shrink-0">
    <div class="{{ $dotSizeClasses }} {{ $dotClasses }}"></div>
</div>
