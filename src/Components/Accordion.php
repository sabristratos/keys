<?php

namespace Keys\UI\Components;

use Illuminate\View\Component;

class Accordion extends Component
{
    public function __construct(
        public ?string $id = null,
        public string $spacing = 'md'
    ) {
        $this->id = $this->id ?? 'accordion-' . uniqid();

        // Validate spacing
        if (!in_array($this->spacing, ['none', 'xs', 'sm', 'md', 'lg', 'xl'])) {
            $this->spacing = 'md';
        }
    }

    public function getDataAttributes(): array
    {
        return [
            'data-keys-accordion' => 'true',
            'data-spacing' => $this->spacing,
        ];
    }

    public function render()
    {
        return view('keys::components.accordion', [
            'dataAttributes' => $this->getDataAttributes(),
        ]);
    }
}