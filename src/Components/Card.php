<?php

namespace Keys\UI\Components;

use Illuminate\View\Component;

class Card extends Component
{
    public function __construct(
        public string $size = 'md',
        public string $variant = 'elevated',
    ) {}

    public function getDataAttributes(): array
    {
        return [
            'data-keys-card' => 'true',
            'data-size' => $this->size,
            'data-variant' => $this->variant,
        ];
    }

    public function render()
    {
        return view('keys::components.card', [
            'dataAttributes' => $this->getDataAttributes(),
        ]);
    }
}
