<?php

namespace Keys\UI\Components;

use Illuminate\View\Component;
use Keys\UI\Constants\ComponentConstants;

class Popover extends Component
{
    public function __construct(
        public ?string $target = null,
        public string $placement = 'bottom',
        public string $size = 'md',
        public string $trigger = 'click',
        public bool $arrow = true,
        public bool $dismissible = true,
        public bool $closeOnOutsideClick = true,
        public bool $closeOnEscape = true,
        public int $delay = 0,
        public int $hideDelay = 0,
        public ?string $id = null,
        public bool $disabled = false,
        public ?string $title = null,
        public bool $floating = true,
        public int $offset = 8,
        public bool $autoPlacement = true
    ) {
        // Generate unique ID if not provided
        $this->id = $this->id ?? 'popover-' . uniqid();

        // Validate placement
        if (!in_array($this->placement, ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'])) {
            $this->placement = 'bottom';
        }

        // Validate size
        if (!in_array($this->size, ['sm', 'md', 'lg'])) {
            $this->size = 'md';
        }

        // Validate trigger
        if (!in_array($this->trigger, ['click', 'hover', 'focus', 'manual'])) {
            $this->trigger = 'click';
        }

        // Auto-enable dismissible for interactive triggers
        if (in_array($this->trigger, ['click', 'focus'])) {
            $this->dismissible = true;
        }
    }

    public function getPopoverClasses(): string
    {
        $base = 'keys-popover absolute z-50 bg-surface border border-border shadow-lg rounded-lg';
        $sizeClasses = $this->getSizeClasses();

        return trim($base . ' ' . $sizeClasses);
    }

    protected function getSizeClasses(): string
    {
        return match ($this->size) {
            'sm' => 'p-3 text-sm max-w-xs',
            'md' => 'p-4 text-sm max-w-sm',
            'lg' => 'p-6 text-base max-w-md',
            default => 'p-4 text-sm max-w-sm'
        };
    }

    public function getArrowClasses(): string
    {
        if (!$this->arrow) {
            return 'hidden';
        }

        return 'keys-popover-arrow absolute w-0 h-0';
    }

    public function getTitleClasses(): string
    {
        return match ($this->size) {
            'sm' => 'font-semibold text-sm mb-2',
            'md' => 'font-semibold text-base mb-3',
            'lg' => 'font-semibold text-lg mb-3',
            default => 'font-semibold text-base mb-3'
        };
    }

    public function getPopoverAttributes(): array
    {
        $attributes = [
            'id' => $this->id,
            'role' => 'dialog',
            'aria-hidden' => 'true',
            'data-keys-popover' => 'true',
            'data-placement' => $this->placement,
            'data-trigger' => $this->trigger,
            'data-size' => $this->size,
            'data-floating' => $this->floating ? 'true' : 'false',
            'data-offset' => $this->offset,
            'data-auto-placement' => $this->autoPlacement ? 'true' : 'false'
        ];

        if ($this->target) {
            $attributes['data-target'] = $this->target;
        }

        if ($this->dismissible) {
            $attributes['data-dismissible'] = 'true';
        }

        if ($this->closeOnOutsideClick) {
            $attributes['data-close-on-outside-click'] = 'true';
        }

        if ($this->closeOnEscape) {
            $attributes['data-close-on-escape'] = 'true';
        }

        if ($this->delay > 0) {
            $attributes['data-delay'] = $this->delay;
        }

        if ($this->hideDelay > 0) {
            $attributes['data-hide-delay'] = $this->hideDelay;
        }

        if ($this->disabled) {
            $attributes['data-disabled'] = 'true';
        }

        if ($this->arrow) {
            $attributes['data-arrow'] = 'true';
        }

        return $attributes;
    }

    public function getTriggerAttributes(): array
    {
        $attributes = [
            'data-popover-target' => $this->id,
            'data-popover-placement' => $this->placement,
            'data-popover-trigger' => $this->trigger
        ];

        // Add ARIA attributes for accessibility
        $attributes['aria-describedby'] = $this->id;
        $attributes['aria-expanded'] = 'false';

        if ($this->trigger === 'click') {
            $attributes['aria-haspopup'] = 'dialog';
        }

        return $attributes;
    }

    public function getContentAttributes(): array
    {
        $attributes = [];

        if ($this->title) {
            $attributes['aria-labelledby'] = $this->id . '-title';
        }

        return $attributes;
    }

    public function getComputedPopoverClasses(): string
    {
        return $this->getPopoverClasses();
    }

    public function getComputedArrowClasses(): string
    {
        return $this->getArrowClasses();
    }

    public function getComputedTitleClasses(): string
    {
        return $this->getTitleClasses();
    }

    public function render()
    {
        return view('keys::components.popover', [
            'computedPopoverClasses' => $this->getComputedPopoverClasses(),
            'computedArrowClasses' => $this->getComputedArrowClasses(),
            'computedTitleClasses' => $this->getComputedTitleClasses(),
            'popoverAttributes' => $this->getPopoverAttributes(),
            'triggerAttributes' => $this->getTriggerAttributes(),
            'contentAttributes' => $this->getContentAttributes(),
        ]);
    }
}