@php
    $isIconOnly = $isIconOnly($slot->toHtml() ?? '');

    $itemClasses = 'flex items-center';

    $baseClasses = 'inline-flex items-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm min-w-0 whitespace-nowrap';

    $truncateClasses = $truncate ? 'max-w-32 sm:max-w-48 md:max-w-64' : '';
    $maxWidthClasses = $maxWidth ?? '';

    $linkStateClasses = $isLink()
        ? 'text-secondary hover:text-primary'
        : 'text-primary font-medium';

    $linkClasses = "$baseClasses $truncateClasses $maxWidthClasses $linkStateClasses";

    $textClasses = $truncate ? 'truncate' : '';

    $separatorClasses = 'flex items-center mx-2 text-muted';

    $linkAttributes = $attributes->except(['class', 'separator']);

    if ($isLink()) {
        $linkAttributes = $linkAttributes->merge([
            'href' => $href,
            'class' => $linkClasses,
        ]);
    } else {
        $linkAttributes = $linkAttributes->merge([
            'class' => $linkClasses,
            'aria-current' => 'page',
        ]);
    }
@endphp

<li {{ $attributes->merge(['class' => $itemClasses])->merge($dataAttributes) }}>
    @if($isLink())
        <a {{ $linkAttributes }}>
            @if($hasIcon() && !$isIconOnly)
                <x-keys::icon name="{{ $icon }}" size="sm" class="inline mr-1 flex-shrink-0" />
                <span class="{{ $textClasses }}">{{ $slot }}</span>
            @elseif($hasIcon() && $isIconOnly)
                <x-keys::icon name="{{ $icon }}" size="sm" class="inline" />
            @else
                <span class="{{ $textClasses }}">{{ $slot }}</span>
            @endif
        </a>
    @else
        <span {{ $linkAttributes }}>
            @if($hasIcon() && !$isIconOnly)
                <x-keys::icon name="{{ $icon }}" size="sm" class="inline mr-1 flex-shrink-0" />
                <span class="{{ $textClasses }}">{{ $slot }}</span>
            @elseif($hasIcon() && $isIconOnly)
                <x-keys::icon name="{{ $icon }}" size="sm" class="inline" />
            @else
                <span class="{{ $textClasses }}">{{ $slot }}</span>
            @endif
        </span>
    @endif

    @if($showSeparator())
        <div class="{{ $separatorClasses }}" aria-hidden="true">
            @if($separatorIcon)
                <x-keys::icon name="{{ $separatorIcon }}" size="xs" />
            @elseif($separatorText)
                {{ $separatorText }}
            @endif
        </div>
    @endif
</li>