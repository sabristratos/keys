# Image Component

A comprehensive image component with intelligent fallback handling, overlay support, lazy loading, lightbox functionality, and automatic retry mechanisms for failed image loads. Features multiple size variants, aspect ratios, and customization options.

## Basic Usage

```blade
<x-keys::image
    src="/images/product.jpg"
    alt="Product photo"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | Image URL for display |
| `alt` | `string` | Required | Alternative text for accessibility |
| `size` | `string` | `'full'` | Size variant: `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `aspectRatio` | `string` | `'auto'` | Aspect ratio: `auto`, `square`, `video`, `photo`, `wide` |
| `objectFit` | `string` | `'cover'` | Object fit: `cover`, `contain`, `fill`, `scale-down`, `none` |
| `radius` | `string` | `'none'` | Border radius: `none`, `sm`, `md`, `lg`, `xl`, `full` |
| `caption` | `string\|null` | `null` | Optional caption text below image |
| `overlay` | `string\|null` | `null` | Overlay type: `gradient-top`, `gradient-bottom`, `solid`, `none` |
| `overlayColor` | `string` | `'black'` | Overlay color: `black`, `white`, `brand`, `success`, `warning`, `danger`, `neutral` |
| `overlayOpacity` | `string` | `'50'` | Overlay opacity: `10`, `20`, `30`, `40`, `50`, `60`, `70`, `80`, `90` |
| `lazy` | `bool` | `true` | Enable lazy loading |
| `placeholder` | `string\|null` | `null` | Background color while loading |
| `lightbox` | `bool` | `false` | Enable lightbox functionality |
| `fallbackIcon` | `string` | `'heroicon-o-photo'` | Icon to show when image fails to load |
| `fallbackText` | `string\|null` | Auto-generated | Custom text for fallback accessibility |
| `retryAttempts` | `int` | `2` | Number of retry attempts for failed images (0-5) |

## Size Variants

### Extra Small (16x16)
```blade
<x-keys::image
    src="/images/avatar.jpg"
    alt="User avatar"
    size="xs"
/>
```

### Small (24x24)
```blade
<x-keys::image
    src="/images/icon.jpg"
    alt="App icon"
    size="sm"
/>
```

### Medium (32x32)
```blade
<x-keys::image
    src="/images/thumbnail.jpg"
    alt="Thumbnail"
    size="md"
/>
```

### Large (48x48)
```blade
<x-keys::image
    src="/images/profile.jpg"
    alt="Profile picture"
    size="lg"
/>
```

### Extra Large (64x64)
```blade
<x-keys::image
    src="/images/feature.jpg"
    alt="Feature image"
    size="xl"
/>
```

### Full Width
```blade
<x-keys::image
    src="/images/banner.jpg"
    alt="Banner image"
    size="full"
/>
```

## Aspect Ratios

Aspect ratios only apply when `size="full"`:

### Square (1:1)
```blade
<x-keys::image
    src="/images/product.jpg"
    alt="Product"
    size="full"
    aspectRatio="square"
/>
```

### Video (16:9)
```blade
<x-keys::image
    src="/images/video-thumbnail.jpg"
    alt="Video thumbnail"
    size="full"
    aspectRatio="video"
/>
```

### Photo (4:3)
```blade
<x-keys::image
    src="/images/photo.jpg"
    alt="Photo"
    size="full"
    aspectRatio="photo"
/>
```

### Wide (21:9)
```blade
<x-keys::image
    src="/images/banner.jpg"
    alt="Wide banner"
    size="full"
    aspectRatio="wide"
/>
```

### Auto (Natural Ratio)
```blade
<x-keys::image
    src="/images/natural.jpg"
    alt="Natural aspect ratio"
    size="full"
    aspectRatio="auto"
/>
```

## Object Fit

### Cover (Default)
```blade
<x-keys::image
    src="/images/photo.jpg"
    alt="Cover fit"
    objectFit="cover"
/>
```

### Contain
```blade
<x-keys::image
    src="/images/logo.svg"
    alt="Logo"
    objectFit="contain"
/>
```

### Fill
```blade
<x-keys::image
    src="/images/background.jpg"
    alt="Background"
    objectFit="fill"
/>
```

### Scale Down
```blade
<x-keys::image
    src="/images/icon.png"
    alt="Icon"
    objectFit="scale-down"
/>
```

### None
```blade
<x-keys::image
    src="/images/pattern.jpg"
    alt="Pattern"
    objectFit="none"
/>
```

## Border Radius

### Small Radius
```blade
<x-keys::image
    src="/images/card.jpg"
    alt="Card image"
    radius="sm"
/>
```

### Medium Radius
```blade
<x-keys::image
    src="/images/thumbnail.jpg"
    alt="Thumbnail"
    radius="md"
/>
```

### Large Radius
```blade
<x-keys::image
    src="/images/photo.jpg"
    alt="Photo"
    radius="lg"
/>
```

### Extra Large Radius
```blade
<x-keys::image
    src="/images/feature.jpg"
    alt="Feature"
    radius="xl"
/>
```

### Full Radius (Circle)
```blade
<x-keys::image
    src="/images/avatar.jpg"
    alt="Avatar"
    size="lg"
    radius="full"
/>
```

## Caption

### Simple Caption
```blade
<x-keys::image
    src="/images/landscape.jpg"
    alt="Mountain landscape"
    caption="Beautiful mountain view at sunrise"
/>
```

### Caption with Full Width
```blade
<x-keys::image
    src="/images/photo.jpg"
    alt="Product photo"
    size="full"
    aspectRatio="photo"
    caption="Limited edition product - Available now"
/>
```

## Overlays

### Gradient Top
```blade
<x-keys::image
    src="/images/hero.jpg"
    alt="Hero image"
    size="full"
    aspectRatio="video"
    overlay="gradient-top"
>
    <x-keys::heading level="h2" class="text-white">Welcome</x-keys::heading>
</x-keys::image>
```

### Gradient Bottom
```blade
<x-keys::image
    src="/images/card.jpg"
    alt="Card image"
    size="full"
    aspectRatio="square"
    overlay="gradient-bottom"
>
    <div class="space-y-2">
        <x-keys::heading level="h3" class="text-white">Product Name</x-keys::heading>
        <x-keys::text class="text-white/90">$99.99</x-keys::text>
    </div>
</x-keys::image>
```

### Solid Overlay
```blade
<x-keys::image
    src="/images/background.jpg"
    alt="Background"
    size="full"
    aspectRatio="video"
    overlay="solid"
    overlayOpacity="70"
>
    <x-keys::heading level="h2" class="text-white">Overlay Content</x-keys::heading>
</x-keys::image>
```

## Overlay Colors

### Black (Default)
```blade
<x-keys::image
    src="/images/photo.jpg"
    alt="Photo"
    overlay="gradient-bottom"
    overlayColor="black"
>
    <x-keys::text class="text-white">Black overlay</x-keys::text>
</x-keys::image>
```

### White
```blade
<x-keys::image
    src="/images/dark-photo.jpg"
    alt="Dark photo"
    overlay="gradient-bottom"
    overlayColor="white"
>
    <x-keys::text class="text-gray-900">White overlay</x-keys::text>
</x-keys::image>
```

### Brand
```blade
<x-keys::image
    src="/images/promo.jpg"
    alt="Promo"
    overlay="solid"
    overlayColor="brand"
    overlayOpacity="80"
>
    <x-keys::heading level="h3" class="text-white">Featured</x-keys::heading>
</x-keys::image>
```

### Success, Warning, Danger
```blade
<x-keys::image
    src="/images/status.jpg"
    alt="Status"
    overlay="gradient-bottom"
    overlayColor="success"
>
    <x-keys::text class="text-white">Active</x-keys::text>
</x-keys::image>
```

## Overlay Opacity

```blade
{{-- Light overlay --}}
<x-keys::image
    src="/images/photo.jpg"
    alt="Photo"
    overlay="solid"
    overlayOpacity="30"
>
    <x-keys::text class="text-white">Light overlay</x-keys::text>
</x-keys::image>

{{-- Medium overlay --}}
<x-keys::image
    src="/images/photo.jpg"
    alt="Photo"
    overlay="solid"
    overlayOpacity="50"
>
    <x-keys::text class="text-white">Medium overlay</x-keys::text>
</x-keys::image>

{{-- Heavy overlay --}}
<x-keys::image
    src="/images/photo.jpg"
    alt="Photo"
    overlay="solid"
    overlayOpacity="80"
>
    <x-keys::text class="text-white">Heavy overlay</x-keys::text>
</x-keys::image>
```

## Lazy Loading

### Enabled (Default)
```blade
<x-keys::image
    src="/images/large-photo.jpg"
    alt="Large photo"
    :lazy="true"
/>
```

### Disabled
```blade
<x-keys::image
    src="/images/above-fold.jpg"
    alt="Hero image"
    :lazy="false"
/>
```

### With Placeholder Color
```blade
<x-keys::image
    src="/images/photo.jpg"
    alt="Photo"
    placeholder="#e5e7eb"
/>
```

## Lightbox

Enable click-to-view functionality:

```blade
<x-keys::image
    src="/images/gallery-1.jpg"
    alt="Gallery photo"
    :lightbox="true"
    size="full"
    aspectRatio="photo"
/>
```

## Fallback Handling

### Automatic Fallback

When an image fails to load, the component automatically shows a fallback:

```blade
<x-keys::image
    src="/images/broken-image.jpg"
    alt="Product"
/>
```

### Custom Fallback Icon
```blade
<x-keys::image
    src="/images/user-photo.jpg"
    alt="User photo"
    fallbackIcon="heroicon-o-user"
/>
```

### Custom Fallback Text
```blade
<x-keys::image
    src="/images/product.jpg"
    alt="Product"
    fallbackText="Product image not available"
/>
```

### No Image Provided
```blade
<x-keys::image
    src=""
    alt="Placeholder"
/>
```

### Retry Attempts
```blade
<x-keys::image
    src="/images/network-sensitive.jpg"
    alt="Photo"
    :retryAttempts="3"
/>

{{-- Disable retry --}}
<x-keys::image
    src="/images/should-fail-fast.jpg"
    alt="Photo"
    :retryAttempts="0"
/>
```

## Real-World Examples

### User Avatar
```blade
<x-keys::image
    src="{{ $user->avatar_url }}"
    alt="{{ $user->name }}"
    size="lg"
    radius="full"
    fallbackIcon="heroicon-o-user"
/>
```

### Product Card
```blade
<x-keys::image
    src="{{ $product->image_url }}"
    alt="{{ $product->name }}"
    size="full"
    aspectRatio="square"
    radius="lg"
    overlay="gradient-bottom"
    overlayOpacity="60"
>
    <div class="space-y-1">
        <x-keys::heading level="h3" size="sm" class="text-white">
            {{ $product->name }}
        </x-keys::heading>
        <x-keys::text class="text-white/90 text-sm">
            ${{ number_format($product->price, 2) }}
        </x-keys::text>
    </div>
</x-keys::image>
```

### Hero Banner
```blade
<x-keys::image
    src="/images/hero-banner.jpg"
    alt="Welcome banner"
    size="full"
    aspectRatio="wide"
    overlay="gradient-bottom"
    overlayColor="black"
    overlayOpacity="70"
    :lazy="false"
>
    <div class="max-w-2xl space-y-4">
        <x-keys::heading level="h1" size="3xl" class="text-white">
            Welcome to Our Store
        </x-keys::heading>
        <x-keys::text size="lg" class="text-white/90">
            Discover amazing products at unbeatable prices
        </x-keys::text>
        <x-keys::button color="primary" size="lg">
            Shop Now
        </x-keys::button>
    </div>
</x-keys::image>
```

### Image Gallery
```blade
<div class="grid grid-cols-3 gap-4">
    @foreach($images as $image)
        <x-keys::image
            src="{{ $image->url }}"
            alt="{{ $image->title }}"
            size="full"
            aspectRatio="square"
            radius="md"
            :lightbox="true"
            caption="{{ $image->caption }}"
        />
    @endforeach
</div>
```

### Blog Post Feature Image
```blade
<x-keys::image
    src="{{ $post->featured_image }}"
    alt="{{ $post->title }}"
    size="full"
    aspectRatio="video"
    radius="lg"
    caption="{{ $post->image_credit }}"
/>
```

### Thumbnail Grid
```blade
<div class="flex items-center gap-2">
    @foreach($thumbnails as $thumb)
        <x-keys::image
            src="{{ $thumb }}"
            alt="Thumbnail"
            size="md"
            radius="sm"
        />
    @endforeach
</div>
```

### Profile Cover Photo
```blade
<x-keys::image
    src="{{ $user->cover_photo }}"
    alt="{{ $user->name }} cover photo"
    size="full"
    aspectRatio="wide"
    overlay="gradient-bottom"
>
    <div class="flex items-end gap-4">
        <x-keys::image
            src="{{ $user->avatar }}"
            alt="{{ $user->name }}"
            size="xl"
            radius="full"
            class="border-4 border-white"
        />
        <div>
            <x-keys::heading level="h2" class="text-white">
                {{ $user->name }}
            </x-keys::heading>
            <x-keys::text class="text-white/90">
                {{ $user->role }}
            </x-keys::text>
        </div>
    </div>
</x-keys::image>
```

### Before/After Comparison
```blade
<div class="grid grid-cols-2 gap-4">
    <x-keys::image
        src="/images/before.jpg"
        alt="Before"
        size="full"
        aspectRatio="square"
        radius="md"
        caption="Before"
    />
    <x-keys::image
        src="/images/after.jpg"
        alt="After"
        size="full"
        aspectRatio="square"
        radius="md"
        caption="After"
    />
</div>
```

## Dynamic Loading with Livewire

```blade
<x-keys::image
    src="{{ $this->currentImage }}"
    alt="Dynamic image"
    size="full"
    aspectRatio="video"
    wire:loading.class="opacity-50"
/>

<div class="flex gap-2 mt-4">
    @foreach($images as $image)
        <button
            wire:click="setImage('{{ $image->url }}')"
            class="w-16 h-16"
        >
            <x-keys::image
                src="{{ $image->url }}"
                alt="Thumbnail"
                size="md"
                radius="sm"
            />
        </button>
    @endforeach
</div>
```

## Accessibility

The Image component includes comprehensive accessibility features:

- Required `alt` attribute for all images
- Semantic `<figure>` and `<figcaption>` for captioned images
- Proper ARIA attributes for lightbox functionality
- Keyboard navigation support for interactive images
- Screen reader friendly fallback text
- Focus-visible states for keyboard users
- Descriptive error messages for failed images

```blade
<x-keys::image
    src="/images/chart.jpg"
    alt="Sales chart showing 25% increase in Q1 2024"
    caption="Source: Annual Report 2024"
/>
```

## Best Practices

1. **Always provide meaningful alt text**: Describe the image content for accessibility

2. **Use appropriate sizes**: Match image size to its display context

3. **Enable lazy loading**: Keep it enabled for images below the fold

4. **Choose correct object-fit**: Use `contain` for logos, `cover` for photos

5. **Add captions when needed**: Provide context or attribution

6. **Use overlays for text**: Ensure text readability over images

7. **Provide fallback icons**: Match icon to content type (user, photo, document, etc.)

8. **Optimize retry attempts**: Use higher retries for critical images

9. **Test fallback states**: Ensure broken images display gracefully

10. **Consider aspect ratios**: Maintain consistent layouts across image collections

## Component Structure

The Image component consists of:

1. **PHP Class** (`Image.php`)
   - Props validation and defaults
   - Size and aspect ratio calculations
   - Overlay configuration
   - Fallback logic
   - Data attributes generation

2. **Blade Template** (`image.blade.php`)
   - Responsive image rendering
   - Fallback UI (icon-only or icon+text)
   - Caption support with `<figure>`
   - Overlay rendering
   - Lightbox attributes

3. **TypeScript Actions** (if implemented)
   - Image load error detection
   - Retry mechanism
   - Fallback display
   - Lightbox functionality

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-image="true"` - Component identifier
- `data-size="full"` - Size variant
- `data-aspect-ratio="video"` - Aspect ratio
- `data-object-fit="cover"` - Object fit mode
- `data-radius="lg"` - Border radius
- `data-has-image="true"` - Has valid source
- `data-image-active="true"` - Image is loaded
- `data-has-fallback="true"` - Fallback is available
- `data-fallback-active="true"` - Currently showing fallback
- `data-has-overlay="true"` - Has overlay
- `data-overlay-type="gradient-bottom"` - Overlay type
- `data-overlay-color="black"` - Overlay color
- `data-overlay-opacity="50"` - Overlay opacity
- `data-has-caption="true"` - Has caption
- `data-lightbox="true"` - Lightbox enabled
- `data-lightbox-trigger="image-id"` - Lightbox trigger ID
- `data-lazy="true"` - Lazy loading enabled
- `data-retry-attempts="2"` - Retry count
- `data-fallback-icon="heroicon-o-photo"` - Fallback icon name
- `data-fallback-text="..."` - Fallback text
- `data-is-small-size="false"` - Is small size
- `data-fallback-mode="icon-text"` - Fallback display mode
