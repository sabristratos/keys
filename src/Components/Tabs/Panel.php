<?php

namespace Keys\UI\Components\Tabs;

use Illuminate\View\Component;

class Panel extends Component
{
    public function __construct(
        public ?string $id = null,
        public bool $active = false
    ) {
        //
    }

    public function getDataAttributes(): array
    {
        $attributes = [
            'data-tab-panel' => $this->id,
        ];

        if ($this->active) {
            $attributes['data-active'] = 'true';
        }

        return $attributes;
    }

    public function render()
    {
        return view('keys::components.tabs.panel', [
            'dataAttributes' => $this->getDataAttributes(),
        ]);
    }
}
