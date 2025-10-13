<?php

namespace Keys\UI\Components\Tabs;

use Illuminate\View\Component;

class Tab extends Component
{
    public function __construct(
        public ?string $target = null,
        public ?string $icon = null,
        public bool $active = false,
        public bool $disabled = false,
        public string $variant = 'default'
    ) {
        //
    }

    public function hasIcon(): bool
    {
        return !empty($this->icon);
    }

    public function getDataAttributes(): array
    {
        $attributes = [
            'data-tab' => $this->target,
        ];

        if ($this->disabled) {
            $attributes['data-disabled'] = 'true';
        }

        if ($this->hasIcon()) {
            $attributes['data-has-icon'] = 'true';
        }

        if ($this->active) {
            $attributes['data-active'] = 'true';
        }

        return $attributes;
    }

    public function render()
    {
        return view('keys::components.tabs.tab', [
            'dataAttributes' => $this->getDataAttributes(),
            'variant' => $this->variant,
        ]);
    }
}
