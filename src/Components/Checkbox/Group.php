<?php

namespace Keys\UI\Components\Checkbox;

use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Keys\UI\Concerns\HandlesValidationErrors;
use Keys\UI\Constants\ComponentConstants;

class Group extends Component
{
    use HandlesValidationErrors;

    public function __construct(
        public ?string $name = null,
        public ?string $label = null,
        public ?string $hint = null,
        public ?string $description = null,
        public string $variant = 'standard',
        public string $size = 'md',
        public string $color = 'brand',
        public string $layout = 'stacked',
        public bool $required = false,
        public bool $optional = false,
        public bool $disabled = false,
        public string|array|Collection|null $errors = null,
        public bool $showErrors = true,
        public bool $hasError = false
    ) {
        // Backward compatibility: description is an alias for hint
        if (!$this->hint && $this->description) {
            $this->hint = $this->description;
        }

        if (!$this->hasError && $this->hasErrors()) {
            $this->hasError = true;
        }

        $this->variant = ComponentConstants::validate($this->variant, ComponentConstants::FORM_CONTROL_VARIANTS, 'standard');
        $this->size = ComponentConstants::validate($this->size, ComponentConstants::SIZES_XS_TO_XL, 'md');
        $this->color = ComponentConstants::validate($this->color, ComponentConstants::COLORS, 'brand');
        $this->layout = ComponentConstants::validate($this->layout, ComponentConstants::GROUP_LAYOUTS, 'stacked');
    }

    public function hasError(): bool
    {
        return $this->hasError || $this->hasErrors();
    }

    public function hasLabel(): bool
    {
        return !is_null($this->label) && !empty(trim($this->label));
    }

    public function hasHint(): bool
    {
        return !is_null($this->hint) && !empty(trim($this->hint));
    }

    public function hasDescription(): bool
    {
        // Backward compatibility
        return $this->hasHint();
    }

    public function getAriaAttributes(): array
    {
        $attributes = ['role' => 'group'];

        if ($this->hasError()) {
            $attributes['aria-invalid'] = 'true';
        }

        if ($this->required) {
            $attributes['aria-required'] = 'true';
        }

        if ($this->hint) {
            $attributes['aria-describedby'] = $this->getHintId();
        }

        if ($this->label) {
            $attributes['aria-label'] = $this->label;
        }

        return $attributes;
    }

    public function getHintId(): string
    {
        return ($this->name ?? 'checkboxgroup') . '-hint';
    }

    public function getDescriptionId(): string
    {
        // Backward compatibility
        return $this->getHintId();
    }

    public function getDataAttributes(): array
    {
        $attributes = [
            'data-keys-checkbox-group' => 'true',
            'data-variant' => $this->variant,
            'data-color' => $this->color,
            'data-size' => $this->size,
            'data-layout' => $this->layout,
        ];

        if ($this->name) {
            $attributes['data-name'] = $this->name;
        }

        if ($this->disabled) {
            $attributes['data-disabled'] = 'true';
        }

        if ($this->required) {
            $attributes['data-required'] = 'true';
        }

        if ($this->optional) {
            $attributes['data-optional'] = 'true';
        }

        if ($this->hasError()) {
            $attributes['data-invalid'] = 'true';
        }

        if ($this->hasLabel()) {
            $attributes['data-has-label'] = 'true';
        }

        if ($this->hasHint()) {
            $attributes['data-has-hint'] = 'true';
        }

        return $attributes;
    }

    public function render()
    {
        return view('keys::components.checkbox.group', [
            'dataAttributes' => $this->getDataAttributes(),
            'ariaAttributes' => $this->getAriaAttributes(),
        ]);
    }
}
