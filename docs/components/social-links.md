# Social Links Component

A social media profile links component that displays clickable icons linking to your social media profiles. Supports multiple platforms with automatic icon detection.

## Basic Usage

```blade
<x-keys::social.links
    :links="[
        'facebook' => 'https://facebook.com/yourpage',
        'twitter' => 'https://twitter.com/yourhandle',
        'linkedin' => 'https://linkedin.com/in/yourprofile'
    ]"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `array` | `[]` | Platform => URL pairs |
| `variant` | `string` | `'ghost'` | Button variant: `ghost`, `outline`, `solid` |
| `size` | `string` | `'md'` | Icon size: `xs`, `sm`, `md`, `lg`, `xl` |
| `layout` | `string` | `'horizontal'` | Layout: `horizontal`, `vertical` |
| `attached` | `bool` | `false` | Whether icons are attached (no gap) |
| `show-labels` | `bool` | `false` | Whether to show platform labels |
| `target` | `string` | `'_blank'` | Link target attribute |

## Supported Platforms

- `facebook` - Facebook
- `instagram` - Instagram
- `twitter` / `x` - Twitter/X
- `linkedin` - LinkedIn
- `youtube` - YouTube
- `tiktok` - TikTok
- `whatsapp` - WhatsApp Business
- `pinterest` - Pinterest
- `reddit` - Reddit
- `telegram` - Telegram
- `github` - GitHub
- `dribbble` - Dribbble
- `behance` - Behance
- `figma` - Figma
- `google` - Google

## Layout Options

### Horizontal (Default)
```blade
<x-keys::social.links
    :links="[
        'facebook' => 'https://facebook.com/example',
        'twitter' => 'https://twitter.com/example',
        'instagram' => 'https://instagram.com/example'
    ]"
    layout="horizontal"
/>
```

### Vertical
```blade
<x-keys::social.links
    :links="[
        'facebook' => 'https://facebook.com/example',
        'twitter' => 'https://twitter.com/example',
        'linkedin' => 'https://linkedin.com/company/example'
    ]"
    layout="vertical"
/>
```

### Attached Icons
```blade
<x-keys::social.links
    :links="$socialLinks"
    :attached="true"
/>
```

## Variants

### Ghost (Default)
```blade
<x-keys::social.links :links="$links" variant="ghost" />
```

### Outline
```blade
<x-keys::social.links :links="$links" variant="outline" />
```

### Solid
```blade
<x-keys::social.links :links="$links" variant="solid" />
```

## With Labels

```blade
<x-keys::social.links
    :links="$links"
    :show-labels="true"
/>
```

## Size Variants

```blade
<x-keys::social.links :links="$links" size="xs" />
<x-keys::social.links :links="$links" size="sm" />
<x-keys::social.links :links="$links" size="md" />
<x-keys::social.links :links="$links" size="lg" />
<x-keys::social.links :links="$links" size="xl" />
```

## Use Cases

### Footer Social Links
```blade
<footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto">
        <div class="flex items-center justify-between">
            <p>&copy; 2024 Your Company</p>

            <x-keys::social.links
                :links="[
                    'facebook' => 'https://facebook.com/yourcompany',
                    'twitter' => 'https://twitter.com/yourcompany',
                    'linkedin' => 'https://linkedin.com/company/yourcompany',
                    'instagram' => 'https://instagram.com/yourcompany'
                ]"
                variant="ghost"
                size="lg"
            />
        </div>
    </div>
</footer>
```

### Author Bio
```blade
<x-keys::card>
    <div class="flex items-center gap-4">
        <x-keys::avatar src="{{ $author->avatar }}" size="lg" />

        <div class="flex-1">
            <h3 class="font-semibold">{{ $author->name }}</h3>
            <p class="text-sm text-gray-600">{{ $author->bio }}</p>

            <div class="mt-2">
                <x-keys::social.links
                    :links="$author->social_links"
                    size="sm"
                    variant="ghost"
                />
            </div>
        </div>
    </div>
</x-keys::card>
```

### Contact Page
```blade
<div class="space-y-6">
    <x-keys::heading size="h2">Connect With Us</x-keys::heading>

    <x-keys::social.links
        :links="[
            'facebook' => settings('social.facebook'),
            'twitter' => settings('social.twitter'),
            'linkedin' => settings('social.linkedin'),
            'youtube' => settings('social.youtube'),
            'instagram' => settings('social.instagram')
        ]"
        variant="outline"
        size="xl"
        :show-labels="true"
        layout="vertical"
    />
</div>
```

### Profile Card
```blade
<x-keys::card>
    <div class="text-center">
        <x-keys::avatar src="{{ $user->avatar }}" size="2xl" class="mx-auto" />
        <h2 class="mt-4 text-xl font-bold">{{ $user->name }}</h2>
        <p class="text-gray-600">{{ $user->tagline }}</p>

        <div class="mt-4 flex justify-center">
            <x-keys::social.links
                :links="[
                    'github' => $user->github_url,
                    'twitter' => $user->twitter_url,
                    'linkedin' => $user->linkedin_url,
                    'dribbble' => $user->dribbble_url
                ]"
                variant="solid"
                size="md"
                :attached="true"
            />
        </div>
    </div>
</x-keys::card>
```

### Navigation Header
```blade
<header class="border-b">
    <div class="container mx-auto flex items-center justify-between py-4">
        <x-keys::heading size="h3">Your Brand</x-keys::heading>

        <div class="flex items-center gap-8">
            <nav>
                <!-- navigation items -->
            </nav>

            <x-keys::social.links
                :links="[
                    'facebook' => '#',
                    'twitter' => '#',
                    'instagram' => '#'
                ]"
                size="sm"
            />
        </div>
    </div>
</header>
```

## Dynamic Links from Settings

```blade
@php
    $socialLinks = [
        'facebook' => setting('social.facebook_url'),
        'twitter' => setting('social.twitter_url'),
        'linkedin' => setting('social.linkedin_url'),
        'instagram' => setting('social.instagram_url'),
        'youtube' => setting('social.youtube_url'),
    ];

    // Filter out empty links
    $socialLinks = array_filter($socialLinks);
@endphp

<x-keys::social.links :links="$socialLinks" />
```

## Livewire Integration

```blade
<div>
    <x-keys::social.links
        :links="$this->socialLinks"
        variant="ghost"
        size="md"
    />
</div>
```

```php
class Profile extends Component
{
    public function getSocialLinksProperty(): array
    {
        return [
            'github' => $this->user->github_url,
            'twitter' => $this->user->twitter_url,
            'linkedin' => $this->user->linkedin_url,
        ];
    }
}
```

## Data Attributes

- `data-keys-social-links="true"` - Component identifier
- `data-layout="horizontal"` - Layout orientation
- `data-variant="ghost"` - Button variant
- `data-size="md"` - Icon size

## Best Practices

1. **Only show active profiles**: Filter out empty/null URLs
2. **Use appropriate variants**: Ghost for subtle, solid for emphasis
3. **Consider context**: Match the size and style to the surrounding design
4. **Maintain order**: Show most important platforms first
5. **Mobile responsive**: Use appropriate sizes for different screen sizes
6. **Update regularly**: Keep links current and working

## Accessibility

- Opens links in new tab by default (customizable via `target`)
- Includes proper ARIA labels for each platform
- Keyboard accessible with focus indicators
- Screen reader friendly with platform names

## Component Structure

1. **PHP Class** (`Social\Links.php`)
   - Platform configuration
   - Icon mapping
   - Label generation

2. **Blade Template** (`social/links.blade.php`)
   - Icon rendering
   - Layout management
   - Link generation
