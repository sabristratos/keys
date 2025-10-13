# Avatar Component

A versatile user profile image component with intelligent fallback handling, status indicators, and comprehensive customization options. Features automatic initials generation, multiple shapes, sizes, and accessibility support.

## Basic Usage

```blade
<x-keys::avatar
    src="/avatars/john-doe.jpg"
    name="John Doe"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string\|null` | `null` | Image URL for avatar |
| `alt` | `string\|null` | Auto-generated | Alternative text for accessibility |
| `name` | `string\|null` | `null` | User name for initials fallback |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl` |
| `shape` | `string` | `'circle'` | Shape: `circle`, `square` |
| `status` | `string\|null` | `null` | Status: `online`, `offline`, `away`, `busy` |
| `color` | `string` | `'neutral'` | Background color for fallback |
| `border` | `bool` | `false` | Show border ring |
| `lazy` | `bool` | `true` | Lazy load images |

## Sizes

```blade
<x-keys::avatar src="/avatar.jpg" name="User" size="xs" />
<x-keys::avatar src="/avatar.jpg" name="User" size="sm" />
<x-keys::avatar src="/avatar.jpg" name="User" size="md" />
<x-keys::avatar src="/avatar.jpg" name="User" size="lg" />
<x-keys::avatar src="/avatar.jpg" name="User" size="xl" />
```

| Size | Dimensions | Text Size | Use Case |
|------|------------|-----------|----------|
| `xs` | 24×24px | xs | Inline text, tags |
| `sm` | 32×32px | sm | Lists, compact views |
| `md` | 40×40px | base | Default, standard lists |
| `lg` | 48×48px | lg | Cards, prominent displays |
| `xl` | 64×64px | xl | Profile pages, headers |

## Shapes

### Circle (Default)

```blade
<x-keys::avatar
    src="/avatar.jpg"
    name="Jane Smith"
    shape="circle"
/>
```

### Square (Rounded)

```blade
<x-keys::avatar
    src="/avatar.jpg"
    name="Jane Smith"
    shape="square"
/>
```

## Status Indicators

```blade
<x-keys::avatar
    src="/avatar.jpg"
    name="John Doe"
    status="online"
/>
```

Available statuses:
- `online` - Green indicator
- `offline` - Gray indicator
- `away` - Yellow indicator
- `busy` - Red indicator

## Fallback Modes

The Avatar component intelligently handles missing images with three fallback modes:

### 1. Image Display (Primary)

When `src` is provided:

```blade
<x-keys::avatar
    src="https://i.pravatar.cc/150?img=1"
    name="John Doe"
/>
```

### 2. Initials Fallback (Secondary)

When no `src` but `name` is provided:

```blade
{{-- Shows "JD" --}}
<x-keys::avatar name="John Doe" />

{{-- Shows "JS" --}}
<x-keys::avatar name="Jane Smith" />

{{-- Shows "BO" (first 2 chars of single word) --}}
<x-keys::avatar name="Bobby" />
```

### 3. Icon Fallback (Tertiary)

When neither `src` nor `name` is provided:

```blade
<x-keys::avatar />
```

## Colors

Colors apply to fallback backgrounds (initials or icon):

```blade
<x-keys::avatar name="User 1" color="brand" />
<x-keys::avatar name="User 2" color="success" />
<x-keys::avatar name="User 3" color="warning" />
<x-keys::avatar name="User 4" color="danger" />
<x-keys::avatar name="User 5" color="neutral" />
<x-keys::avatar name="User 6" color="red" />
<x-keys::avatar name="User 7" color="green" />
<x-keys::avatar name="User 8" color="blue" />
<x-keys::avatar name="User 9" color="purple" />
<x-keys::avatar name="User 10" color="yellow" />
<x-keys::avatar name="User 11" color="teal" />
<x-keys::avatar name="User 12" color="orange" />
```

## With Border

```blade
<x-keys::avatar
    src="/avatar.jpg"
    name="John Doe"
    :border="true"
/>
```

## Status Indicators with Sizes

```blade
<div class="flex items-center gap-4">
    <x-keys::avatar
        src="/avatar.jpg"
        name="Online User"
        status="online"
        size="xs"
    />
    <x-keys::avatar
        src="/avatar.jpg"
        name="Away User"
        status="away"
        size="sm"
    />
    <x-keys::avatar
        src="/avatar.jpg"
        name="Busy User"
        status="busy"
        size="md"
    />
    <x-keys::avatar
        src="/avatar.jpg"
        name="Offline User"
        status="offline"
        size="lg"
    />
</div>
```

## Use Cases

### User Profile Header

```blade
<div class="flex items-center gap-4">
    <x-keys::avatar
        src="{{ $user->avatar_url }}"
        name="{{ $user->name }}"
        size="xl"
        status="{{ $user->is_online ? 'online' : 'offline' }}"
        :border="true"
    />
    <div>
        <x-keys::heading size="2xl">{{ $user->name }}</x-keys::heading>
        <x-keys::text color="muted">{{ $user->email }}</x-keys::text>
    </div>
</div>
```

### Comment Thread

```blade
@foreach($comments as $comment)
    <div class="flex gap-3 mb-4">
        <x-keys::avatar
            src="{{ $comment->user->avatar_url }}"
            name="{{ $comment->user->name }}"
            size="md"
        />
        <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
                <x-keys::text weight="semibold">{{ $comment->user->name }}</x-keys::text>
                <x-keys::text size="sm" color="muted">
                    {{ $comment->created_at->diffForHumans() }}
                </x-keys::text>
            </div>
            <x-keys::text>{{ $comment->content }}</x-keys::text>
        </div>
    </div>
@endforeach
```

### User List with Status

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">Team Members</x-keys::heading>
    </x-slot:header>

    <div class="space-y-3">
        @foreach($teamMembers as $member)
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <x-keys::avatar
                        src="{{ $member->avatar_url }}"
                        name="{{ $member->name }}"
                        status="{{ $member->status }}"
                        size="md"
                    />
                    <div>
                        <x-keys::text weight="medium">{{ $member->name }}</x-keys::text>
                        <x-keys::text size="sm" color="muted">{{ $member->role }}</x-keys::text>
                    </div>
                </div>
                <x-keys::badge :color="$member->status === 'online' ? 'success' : 'neutral'">
                    {{ ucfirst($member->status) }}
                </x-keys::badge>
            </div>
        @endforeach
    </div>
</x-keys::card>
```

### Avatar Stack (Overlapping)

```blade
<div class="flex -space-x-2">
    @foreach($users->take(5) as $user)
        <x-keys::avatar
            src="{{ $user->avatar_url }}"
            name="{{ $user->name }}"
            size="md"
            :border="true"
        />
    @endforeach

    @if($users->count() > 5)
        <div class="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 ring-2 ring-white dark:ring-neutral-800 flex items-center justify-center text-sm font-medium">
            +{{ $users->count() - 5 }}
        </div>
    @endif
</div>
```

### Table with Avatars

```blade
<x-keys::table>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>User</x-keys::table.header>
            <x-keys::table.header>Email</x-keys::table.header>
            <x-keys::table.header>Status</x-keys::table.header>
            <x-keys::table.header>Role</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($users as $user)
            <x-keys::table.row>
                <x-keys::table.cell>
                    <div class="flex items-center gap-3">
                        <x-keys::avatar
                            src="{{ $user->avatar_url }}"
                            name="{{ $user->name }}"
                            size="sm"
                        />
                        <x-keys::text>{{ $user->name }}</x-keys::text>
                    </div>
                </x-keys::table.cell>
                <x-keys::table.cell>{{ $user->email }}</x-keys::table.cell>
                <x-keys::table.cell>
                    <x-keys::badge
                        :color="$user->is_active ? 'success' : 'neutral'"
                    >
                        {{ $user->is_active ? 'Active' : 'Inactive' }}
                    </x-keys::badge>
                </x-keys::table.cell>
                <x-keys::table.cell>{{ $user->role }}</x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

### Dropdown Menu with Avatar

```blade
<x-keys::dropdown>
    <x-slot:trigger>
        <x-keys::button variant="ghost">
            <div class="flex items-center gap-2">
                <x-keys::avatar
                    src="{{ auth()->user()->avatar_url }}"
                    name="{{ auth()->user()->name }}"
                    size="sm"
                />
                <span>{{ auth()->user()->name }}</span>
            </div>
        </x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item href="/profile">
        Profile
    </x-keys::dropdown.item>

    <x-keys::dropdown.item href="/settings">
        Settings
    </x-keys::dropdown.item>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item wire:click="logout">
        Logout
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### Chat Message

```blade
<div class="flex gap-3 {{ $message->is_own ? 'flex-row-reverse' : '' }}">
    <x-keys::avatar
        src="{{ $message->user->avatar_url }}"
        name="{{ $message->user->name }}"
        size="md"
        status="{{ $message->user->status }}"
    />
    <div class="{{ $message->is_own ? 'text-right' : '' }}">
        <x-keys::text size="sm" color="muted" class="mb-1">
            {{ $message->user->name }} • {{ $message->created_at->format('g:i A') }}
        </x-keys::text>
        <div class="inline-block px-4 py-2 rounded-lg {{ $message->is_own ? 'bg-brand text-white' : 'bg-neutral-100 dark:bg-neutral-800' }}">
            <x-keys::text>{{ $message->content }}</x-keys::text>
        </div>
    </div>
</div>
```

### User Card

```blade
<x-keys::card variant="solid" size="lg">
    <div class="text-center">
        <x-keys::avatar
            src="{{ $user->avatar_url }}"
            name="{{ $user->name }}"
            size="xl"
            status="{{ $user->status }}"
            :border="true"
            class="mx-auto mb-4"
        />

        <x-keys::heading size="xl">{{ $user->name }}</x-keys::heading>
        <x-keys::text color="muted" class="mt-1">{{ $user->title }}</x-keys::text>

        <div class="flex justify-center gap-2 mt-4">
            <x-keys::badge>{{ $user->role }}</x-keys::badge>
            <x-keys::badge color="brand">{{ $user->department }}</x-keys::badge>
        </div>

        <div class="flex gap-3 mt-6">
            <x-keys::button variant="outlined" class="flex-1">
                Message
            </x-keys::button>
            <x-keys::button color="primary" class="flex-1">
                View Profile
            </x-keys::button>
        </div>
    </div>
</x-keys::card>
```

### Avatar with Edit Button

```blade
<div class="relative inline-block">
    <x-keys::avatar
        src="{{ $user->avatar_url }}"
        name="{{ $user->name }}"
        size="xl"
    />

    <button
        wire:click="$dispatch('open-modal', { id: 'edit-avatar' })"
        class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center ring-2 ring-white dark:ring-neutral-800 hover:bg-brand-strong transition-colors"
    >
        <x-keys::icon name="heroicon-o-camera" size="xs" />
    </button>
</div>
```

### Notification List

```blade
<div class="space-y-3">
    @foreach($notifications as $notification)
        <div class="flex items-start gap-3 p-3 rounded-lg hover:bg-hover transition-colors cursor-pointer">
            <x-keys::avatar
                src="{{ $notification->sender->avatar_url }}"
                name="{{ $notification->sender->name }}"
                size="md"
            />
            <div class="flex-1 min-w-0">
                <x-keys::text>
                    <span class="font-medium">{{ $notification->sender->name }}</span>
                    {{ $notification->message }}
                </x-keys::text>
                <x-keys::text size="sm" color="muted" class="mt-1">
                    {{ $notification->created_at->diffForHumans() }}
                </x-keys::text>
            </div>
            @if(!$notification->is_read)
                <span class="w-2 h-2 rounded-full bg-brand"></span>
            @endif
        </div>
    @endforeach
</div>
```

### Colored Avatars Grid

```blade
<div class="grid grid-cols-4 gap-4">
    @foreach($colors as $color)
        <div class="text-center">
            <x-keys::avatar
                name="User {{ $loop->iteration }}"
                :color="$color"
                size="lg"
                class="mx-auto mb-2"
            />
            <x-keys::text size="sm">{{ ucfirst($color) }}</x-keys::text>
        </div>
    @endforeach
</div>
```

## Accessibility

The Avatar component includes comprehensive accessibility features:

- Auto-generated `alt` text from name: "Avatar for {name}"
- Manual `alt` text override support
- Status indicator with `aria-label`
- Lazy loading for performance
- Proper image fallback handling
- Screen reader friendly initials display

```blade
<x-keys::avatar
    src="{{ $user->avatar_url }}"
    name="{{ $user->name }}"
    alt="Profile picture for {{ $user->name }}, {{ $user->role }}"
    status="online"
/>
```

## Component Structure

The Avatar component consists of:

1. **PHP Class** (`Avatar.php`)
   - Props validation
   - Intelligent fallback logic
   - Initials generation algorithm
   - Auto alt-text generation
   - Data attributes generation

2. **Blade Template** (`avatar.blade.php`)
   - Responsive sizing
   - Shape variants
   - Image display with lazy loading
   - Hidden fallback (for image load errors)
   - Initials or icon fallback
   - Status indicator positioning

3. **TypeScript Actions** (`AvatarActions.ts`)
   - Image load error handling
   - Fallback switching
   - Lazy loading management

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-avatar="true"` - Component identifier
- `data-size="md"` - Size variant
- `data-shape="circle"` - Shape variant
- `data-status="online"` - Status indicator
- `data-border="true"` - Border state
- `data-has-image="true"` - Has image source
- `data-avatar-image-active="true"` - Image is displayed
- `data-avatar-fallback-active="true"` - Fallback is displayed
- `data-fallback-type="initials"` - Type of fallback (initials or icon)
- `data-color="brand"` - Background color
- `data-avatar-name="..."` - User name
- `data-avatar-lazy="true"` - Lazy loading enabled

## Initials Generation Logic

The component uses smart initials generation:

**Multiple Words:**
```blade
{{-- "John Doe" → "JD" --}}
<x-keys::avatar name="John Doe" />

{{-- "Alice Bob Charlie" → "AB" (first 2 words) --}}
<x-keys::avatar name="Alice Bob Charlie" />
```

**Single Word:**
```blade
{{-- "Bobby" → "BO" (first 2 chars) --}}
<x-keys::avatar name="Bobby" />

{{-- "A" → "A" --}}
<x-keys::avatar name="A" />
```

## Best Practices

1. **Always provide name**: Ensures meaningful fallback even if image fails

2. **Use appropriate sizes**: Match avatar size to context (xs for inline, xl for profiles)

3. **Enable lazy loading**: Keep default `lazy="true"` for performance

4. **Add borders for overlapping**: Use `border="true"` in avatar stacks

5. **Use status indicators meaningfully**: Only show when status is relevant

6. **Choose semantic colors**: Match color to user role or category

7. **Optimize images**: Use appropriate dimensions for each size variant

8. **Provide alt text for important contexts**: Override auto-generated alt when needed

9. **Test fallbacks**: Ensure initials and icons look good

10. **Consider dark mode**: Colors work in both light and dark themes

## Image Size Recommendations

For optimal performance, serve images at these dimensions:

| Avatar Size | Recommended Image |
|-------------|------------------|
| `xs` (24px) | 48×48px (2x) |
| `sm` (32px) | 64×64px (2x) |
| `md` (40px) | 80×80px (2x) |
| `lg` (48px) | 96×96px (2x) |
| `xl` (64px) | 128×128px (2x) |

## Styling Tips

### Custom Hover Effect

```blade
<x-keys::avatar
    src="{{ $user->avatar_url }}"
    name="{{ $user->name }}"
    class="transition-transform hover:scale-110 cursor-pointer"
/>
```

### Grayscale for Inactive Users

```blade
<x-keys::avatar
    src="{{ $user->avatar_url }}"
    name="{{ $user->name }}"
    class="{{ $user->is_active ? '' : 'grayscale opacity-50' }}"
/>
```

### Custom Border Color

```blade
<x-keys::avatar
    src="{{ $user->avatar_url }}"
    name="{{ $user->name }}"
    class="ring-2 ring-brand"
/>
```

## Known Limitations

- Initials are uppercase only (cannot be customized)
- Status indicator position is bottom-right only
- Maximum 2 character initials
- Border uses fixed white/dark colors (not customizable)
- Icon fallback uses fixed user icon (not customizable)
- Square shape uses fixed border radius

## Performance Tips

- Use lazy loading (enabled by default) for better page load performance
- Serve optimized images at appropriate sizes
- Consider using WebP format with fallbacks
- Cache avatar URLs when possible
- Use CSS aspect-ratio to prevent layout shifts
- Implement CDN for avatar images
- Consider placeholder images for better perceived performance
