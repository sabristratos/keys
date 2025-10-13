<?php

namespace Keys\UI\Components;

use Illuminate\View\Component;

/**
 * Main Content Area Component
 *
 * Provides a pre-styled main content area with:
 * - Responsive padding
 * - Mobile sidebar toggle in header
 * - Proper scrolling and overflow handling
 * - Optional header/footer slots
 * - Custom wrapper class support
 */
class Main extends Component
{
    public function __construct(
        public ?string $title = null,
        public string $sidebarId = 'main-sidebar',
        public bool $showMobileToggle = true,
        public string $padding = 'md',
        public ?string $wrapperClass = null,
    ) {
        if (!in_array($this->padding, ['none', 'sm', 'md', 'lg'])) {
            $this->padding = 'md';
        }
    }

    public function render()
    {
        return view('keys::components.main', [
            'wrapperClass' => $this->wrapperClass,
        ]);
    }
}
