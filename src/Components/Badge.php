<?php

namespace Keys\UI\Components;

use Illuminate\View\Component;
use Keys\UI\Constants\ComponentConstants;

class Badge extends Component
{
    public function __construct(
        public string $variant = 'simple',
        public string $color = 'blue',
        public string $size = 'sm',
        public ?string $icon = null,
        public bool $dismissible = false,
        public ?string $id = null
    ) {
        if ($this->dismissible && !$this->id) {
            $this->id = 'badge-' . uniqid();
        }

        if (!in_array($this->variant, ComponentConstants::BADGE_VARIANTS)) {
            $this->variant = 'simple';
        }

        if (!in_array($this->size, ComponentConstants::BADGE_SIZES)) {
            $this->size = 'sm';
        }

        if (!ComponentConstants::isValidColorForComponent($this->color, 'badge')) {
            $this->color = 'blue';
        }

        if ($this->dismissible && $this->variant === 'simple') {
            $this->variant = 'chip';
        }

        if ($this->dismissible && $this->variant === 'subtle') {
            $this->dismissible = false;
        }
    }

    public function isIconOnly(string $slotContent = ''): bool
    {
        return !empty($this->icon) && empty(trim(strip_tags($slotContent)));
    }


    public function sizeClasses(bool $isIconOnly = false): string
    {
        if ($isIconOnly) {
            return match ($this->size) {
                'xs' => 'w-4 h-4 p-0.5',
                'sm' => 'w-5 h-5 p-1',
                'md' => 'w-6 h-6 p-1.5',
                default => 'w-5 h-5 p-1'
            };
        }

        return match ($this->size) {
            'xs' => 'px-1.5 py-0.5 text-xs',
            'sm' => 'px-2.5 py-0.5 text-xs',
            'md' => 'px-3 py-1 text-sm',
            default => 'px-2.5 py-0.5 text-xs'
        };
    }

    public function shapeClasses(): string
    {
        return match ($this->variant) {
            'simple' => 'rounded-full',
            'chip' => 'rounded-sm',
            'subtle' => '',
            default => 'rounded-full'
        };
    }

    public function colorClasses(): string
    {
        if ($this->variant === 'subtle') {
            return $this->colorClassesSubtle();
        }

        return match ($this->color) {
            'brand' => 'bg-brand/10 text-brand',
            'success' => 'bg-success/10 text-success',
            'warning' => 'bg-warning/10 text-warning',
            'danger' => 'bg-danger/10 text-danger',
            'neutral' => 'bg-neutral/10 text-neutral',
            'blue' => 'bg-blue-500/10 text-blue-600',
            'gray' => 'bg-neutral-500/10 text-neutral-600',
            'red' => 'bg-red-500/10 text-red-600',
            'green' => 'bg-green-500/10 text-green-600',
            'yellow' => 'bg-yellow-500/10 text-yellow-600',
            'indigo' => 'bg-indigo-500/10 text-indigo-600',
            'purple' => 'bg-purple-500/10 text-purple-600',
            'pink' => 'bg-pink-500/10 text-pink-600',
            'dark' => 'bg-neutral-900 text-white',
            default => 'bg-blue-500/10 text-blue-600'
        };
    }

    public function colorClassesSubtle(): string
    {
        return match ($this->color) {
            'brand' => 'text-brand',
            'success' => 'text-success',
            'warning' => 'text-warning',
            'danger' => 'text-danger',
            'neutral' => 'text-neutral',
            'blue' => 'text-blue-600',
            'gray' => 'text-neutral-600',
            'red' => 'text-red-600',
            'green' => 'text-green-600',
            'yellow' => 'text-yellow-600',
            'indigo' => 'text-indigo-600',
            'purple' => 'text-purple-600',
            'pink' => 'text-pink-600',
            default => 'text-blue-600'
        };
    }


    public function badgeClasses(bool $isIconOnly = false): string
    {
        if ($this->variant === 'subtle') {
            return $this->subtleBadgeClasses($isIconOnly);
        }

        $baseClasses = 'inline-flex items-center font-medium';

        if ($isIconOnly) {
            $baseClasses .= ' justify-center flex-shrink-0';
        } elseif ($this->dismissible) {
            $baseClasses .= ' justify-between cursor-pointer transition-colors';
        }

        $sizeClasses = $this->sizeClasses($isIconOnly);
        $shapeClasses = $this->shapeClasses();
        $colorClasses = $this->colorClasses();
        $hoverClasses = $this->dismissible ? $this->hoverClasses() : '';

        return trim("{$baseClasses} {$sizeClasses} {$shapeClasses} {$colorClasses} {$hoverClasses}");
    }

    public function subtleBadgeClasses(bool $isIconOnly = false): string
    {
        $baseClasses = 'inline-flex items-center gap-1.5 font-medium';
        $colorClasses = $this->colorClassesSubtle();
        $sizeClasses = match ($this->size) {
            'xs' => 'text-xs',
            'sm' => 'text-xs',
            'md' => 'text-sm',
            default => 'text-xs'
        };

        return trim("{$baseClasses} {$sizeClasses} {$colorClasses}");
    }

    public function hoverClasses(): string
    {
        return match ($this->color) {
            'brand' => 'hover:bg-brand/20',
            'success' => 'hover:bg-success/20',
            'warning' => 'hover:bg-warning/20',
            'danger' => 'hover:bg-danger/20',
            'neutral' => 'hover:bg-neutral/20',
            'blue' => 'hover:bg-blue-500/20',
            'gray' => 'hover:bg-neutral-500/20',
            'red' => 'hover:bg-red-500/20',
            'green' => 'hover:bg-green-500/20',
            'yellow' => 'hover:bg-yellow-500/20',
            'indigo' => 'hover:bg-indigo-500/20',
            'purple' => 'hover:bg-purple-500/20',
            'pink' => 'hover:bg-pink-500/20',
            'dark' => 'hover:bg-neutral-800',
            default => 'hover:bg-blue-500/20'
        };
    }

    public function iconSize(): string
    {
        return match ($this->size) {
            'xs' => 'xs',
            'sm' => 'sm',
            'md' => 'md',
            default => 'sm'
        };
    }

    public function getDataAttributes(): array
    {
        $attributes = [
            'data-keys-badge' => 'true',
            'data-variant' => $this->variant,
            'data-color' => $this->color,
            'data-size' => $this->size,
        ];

        if ($this->dismissible) {
            $attributes['data-dismissible'] = 'true';
            $attributes['data-badge-id'] = $this->id;
        }

        if ($this->icon) {
            $attributes['data-has-icon'] = 'true';
            $attributes['data-icon'] = $this->icon;
        }

        return $attributes;
    }

    public function render()
    {
        return view('keys::components.badge', [
            'dataAttributes' => $this->getDataAttributes(),
        ]);
    }
}
