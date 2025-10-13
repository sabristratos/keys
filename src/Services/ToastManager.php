<?php

namespace Keys\UI\Services;

use Illuminate\Support\Str;

class ToastManager
{
    private static ?self $instance = null;
    private array $toasts = [];

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function toast(string $id = null): ToastInstance
    {
        $id = $id ?? 'toast-' . Str::random(8);

        if (!isset($this->toasts[$id])) {
            $this->toasts[$id] = new ToastInstance($id);
        }

        return $this->toasts[$id];
    }

    public function show(string $variant, array $data = []): void
    {
        $data['variant'] = $variant;

        if (function_exists('dispatch')) {
            dispatch(function() use ($data) {
                if (class_exists('\Livewire\Livewire')) {
                    \Livewire\Livewire::dispatch('showToast', $data);
                }
            });
        }
    }

    public function dismiss(string $id): void
    {
        if (function_exists('dispatch')) {
            dispatch(function() use ($id) {
                if (class_exists('\Livewire\Livewire')) {
                    \Livewire\Livewire::dispatch('hideToast', ['id' => $id]);
                }
            });
        }
    }

    public function dismissAll(): void
    {
        if (function_exists('dispatch')) {
            dispatch(function() {
                if (class_exists('\Livewire\Livewire')) {
                    \Livewire\Livewire::dispatch('hideToast');
                }
            });
        }
    }

    public function isVisible(string $id): bool
    {
        return isset($this->toasts[$id]) && $this->toasts[$id]->isVisible();
    }

    public function getToasts(): array
    {
        return $this->toasts;
    }

    public function success(string $message, string $title = null): ToastInstance
    {
        return $this->toast()
            ->variant('success')
            ->title($title)
            ->message($message)
            ->show();
    }

    public function error(string $message, string $title = null): ToastInstance
    {
        return $this->toast()
            ->variant('error')
            ->title($title)
            ->message($message)
            ->show();
    }

    public function warning(string $message, string $title = null): ToastInstance
    {
        return $this->toast()
            ->variant('warning')
            ->title($title)
            ->message($message)
            ->show();
    }

    public function info(string $message, string $title = null): ToastInstance
    {
        return $this->toast()
            ->variant('info')
            ->title($title)
            ->message($message)
            ->show();
    }

    public function reset(): void
    {
        $this->toasts = [];
    }
}

class ToastInstance
{
    private string $id;
    private array $data = [];
    private bool $isVisible = false;
    private array $config = [
        'variant' => 'info',
        'position' => 'top-right',
        'duration' => 5000,
        'persistent' => false,
        'dismissible' => true,
    ];
    private ?string $title = null;
    private ?string $message = null;
    private ?string $icon = null;

    public function __construct(string $id)
    {
        $this->id = $id;
    }

    public function show(): self
    {
        $this->isVisible = true;

        $data = array_merge($this->data, [
            'id' => $this->id,
            'variant' => $this->config['variant'],
            'position' => $this->config['position'],
            'duration' => $this->config['duration'],
            'persistent' => $this->config['persistent'],
            'title' => $this->title,
            'message' => $this->message,
            'icon' => $this->icon,
        ]);

        if (function_exists('dispatch')) {
            dispatch(function() use ($data) {
                if (class_exists('\Livewire\Livewire')) {
                    \Livewire\Livewire::dispatch('showToast', $data);
                }
            });
        }

        return $this;
    }

    public function dismiss(): self
    {
        $this->isVisible = false;

        if (function_exists('dispatch')) {
            dispatch(function() {
                if (class_exists('\Livewire\Livewire')) {
                    \Livewire\Livewire::dispatch('hideToast', ['id' => $this->id]);
                }
            });
        }

        return $this;
    }

    public function variant(string $variant): self
    {
        $this->config['variant'] = $variant;
        return $this;
    }

    public function position(string $position): self
    {
        $this->config['position'] = $position;
        return $this;
    }

    public function duration(int $duration): self
    {
        $this->config['duration'] = $duration;
        return $this;
    }

    public function persistent(bool $persistent = true): self
    {
        $this->config['persistent'] = $persistent;
        return $this;
    }

    public function dismissible(bool $dismissible = true): self
    {
        $this->config['dismissible'] = $dismissible;
        return $this;
    }

    public function title(?string $title): self
    {
        $this->title = $title;
        $this->data['title'] = $title;
        return $this;
    }

    public function message(string $message): self
    {
        $this->message = $message;
        $this->data['message'] = $message;
        return $this;
    }

    public function icon(?string $icon): self
    {
        $this->icon = $icon;
        $this->data['icon'] = $icon;
        return $this;
    }

    public function isVisible(): bool
    {
        return $this->isVisible;
    }

    public function getData(): array
    {
        return $this->data;
    }

    public function getConfig(): array
    {
        return $this->config;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function success(string $message, string $title = null): self
    {
        return $this->variant('success')
            ->title($title)
            ->message($message)
            ->show();
    }

    public function error(string $message, string $title = null): self
    {
        return $this->variant('error')
            ->title($title)
            ->message($message)
            ->show();
    }

    public function warning(string $message, string $title = null): self
    {
        return $this->variant('warning')
            ->title($title)
            ->message($message)
            ->show();
    }

    public function info(string $message, string $title = null): self
    {
        return $this->variant('info')
            ->title($title)
            ->message($message)
            ->show();
    }
}
