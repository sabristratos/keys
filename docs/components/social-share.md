# Social Share Component

A social sharing component that generates share buttons for popular social media platforms. Supports multiple platforms, layouts, and customization options.

## Basic Usage

```blade
<x-keys::social.share />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `platforms` | `array` | `['facebook', 'twitter', 'linkedin', 'whatsapp']` | Platforms to include |
| `url` | `string\|null` | current URL | URL to share |
| `title` | `string\|null` | `null` | Title/text for the share |
| `description` | `string\|null` | `null` | Description for the share |
| `variant` | `string` | `'outline'` | Button variant: `outline`, `solid`, `ghost` |
| `size` | `string` | `'md'` | Button size: `xs`, `sm`, `md`, `lg`, `xl` |
| `layout` | `string` | `'horizontal'` | Layout: `horizontal`, `vertical` |
| `attached` | `bool` | `false` | Whether buttons are attached (no gap) |
| `show-labels` | `bool` | `false` | Whether to show platform labels |

## Supported Platforms

- `facebook` - Facebook
- `twitter` - Twitter/X
- `linkedin` - LinkedIn
- `whatsapp` - WhatsApp
- `pinterest` - Pinterest
- `reddit` - Reddit
- `telegram` - Telegram

## Custom Share Content

```blade
<x-keys::social.share
    :platforms="['facebook', 'twitter', 'linkedin']"
    url="https://example.com/article"
    title="Check out this amazing article!"
    description="A detailed look at modern web development"
/>
```

## Layout Options

### Horizontal (Default)
```blade
<x-keys::social.share layout="horizontal" />
```

### Vertical
```blade
<x-keys::social.share layout="vertical" />
```

### Attached Buttons
```blade
<x-keys::social.share :attached="true" />
```

## Variants

### Outline (Default)
```blade
<x-keys::social.share variant="outline" />
```

### Solid
```blade
<x-keys::social.share variant="solid" />
```

### Ghost
```blade
<x-keys::social.share variant="ghost" />
```

## With Labels

```blade
<x-keys::social.share :show-labels="true" />
```

## Size Variants

```blade
<x-keys::social.share size="xs" />
<x-keys::social.share size="sm" />
<x-keys::social.share size="md" />
<x-keys::social.share size="lg" />
<x-keys::social.share size="xl" />
```

## Platform Selection

### Specific Platforms
```blade
<x-keys::social.share
    :platforms="['twitter', 'linkedin']"
/>
```

### All Major Platforms
```blade
<x-keys::social.share
    :platforms="['facebook', 'twitter', 'linkedin', 'pinterest', 'reddit', 'telegram', 'whatsapp']"
/>
```

## Use Cases

### Blog Post Sharing
```blade
<x-keys::card>
    <h2>{{ $post->title }}</h2>
    <p>{{ $post->excerpt }}</p>

    <div class="mt-4">
        <x-keys::social.share
            :url="route('posts.show', $post)"
            :title="$post->title"
            :description="$post->excerpt"
            :show-labels="true"
        />
    </div>
</x-keys::card>
```

### Compact Share Bar
```blade
<div class="flex items-center gap-4">
    <span class="text-sm text-gray-600">Share:</span>
    <x-keys::social.share
        :platforms="['facebook', 'twitter', 'linkedin']"
        variant="ghost"
        size="sm"
    />
</div>
```

### Floating Share Sidebar
```blade
<div class="fixed left-4 top-1/2 -translate-y-1/2">
    <x-keys::social.share
        layout="vertical"
        variant="solid"
        size="lg"
        :attached="true"
    />
</div>
```

### Product Sharing
```blade
<x-keys::social.share
    :url="route('products.show', $product)"
    :title="$product->name"
    :description="$product->description"
    :platforms="['facebook', 'twitter', 'pinterest', 'whatsapp']"
    variant="outline"
    :show-labels="true"
/>
```

## Data Attributes

- `data-keys-social-share="true"` - Component identifier
- `data-layout="horizontal"` - Layout orientation
- `data-variant="outline"` - Button variant
- `data-size="md"` - Button size

## Best Practices

1. **Choose relevant platforms**: Select platforms your audience actually uses
2. **Provide context**: Include title and description for better sharing
3. **Consider placement**: Place share buttons where users are likely to want to share
4. **Mobile-friendly**: Use appropriate sizes for mobile devices
5. **Show labels when needed**: Use labels for clarity in less common contexts
6. **Test share URLs**: Verify the generated share URLs work correctly

## Accessibility

- Opens share links in new windows
- Includes proper ARIA labels
- Keyboard accessible
- Focus-visible indicators

## Component Structure

1. **PHP Class** (`Social\Share.php`)
   - Share URL generation for each platform
   - Platform configuration
   - Encoding of share content

2. **Blade Template** (`social/share.blade.php`)
   - Button rendering
   - Layout management
   - Icon display
