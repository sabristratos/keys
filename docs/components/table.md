# Table Component

A comprehensive data table component with support for striped rows, hover effects, responsive layouts, pagination, selectable rows, and loading states. Built with nested sub-components for headers, rows, and cells.

## Basic Usage

```blade
<x-keys::table>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Name</x-keys::table.header>
            <x-keys::table.header>Email</x-keys::table.header>
            <x-keys::table.header>Role</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($users as $user)
            <x-keys::table.row>
                <x-keys::table.cell>{{ $user->name }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->email }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->role }}</x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `bool` | `false` | Alternate row colors |
| `hover` | `bool` | `false` | Row hover effects |
| `size` | `string` | `'md'` | Text size: `sm`, `md`, `lg` |
| `paginate` | `Paginator\|null` | `null` | Laravel paginator instance |
| `bordered` | `bool` | `false` | Table border |
| `responsive` | `bool` | `true` | Horizontal scrolling on small screens |
| `selectable` | `bool` | `false` | Enable row selection |
| `selection-name` | `string` | `'selected[]'` | Form field name for selections |
| `selected-ids` | `array` | `[]` | Pre-selected row IDs |
| `livewire-selection-method` | `string\|null` | `null` | Livewire method to call on selection |
| `loading` | `bool` | `false` | Show loading state |
| `loading-text` | `string` | `'Loading...'` | Loading message |
| `loading-animation` | `string` | `'spinner'` | Loading animation type |

## Table Structure

Tables are built using nested components:

- `x-keys::table` - Main table wrapper
- `x-keys::table.head` - Table header section
- `x-keys::table.body` - Table body section
- `x-keys::table.row` - Table row (used in both head and body)
- `x-keys::table.header` - Header cell (th)
- `x-keys::table.cell` - Body cell (td)

## Striped Rows

```blade
<x-keys::table :striped="true">
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Product</x-keys::table.header>
            <x-keys::table.header>Price</x-keys::table.header>
            <x-keys::table.header>Stock</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($products as $product)
            <x-keys::table.row>
                <x-keys::table.cell>{{ $product->name }}</x-keys::table.cell>
                <x-keys::table.cell>${{ $product->price }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $product->stock }}</x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

## Hover Effects

```blade
<x-keys::table :hover="true">
    <!-- table content -->
</x-keys::table>
```

## Sizes

```blade
<x-keys::table size="sm">Small Text</x-keys::table>
<x-keys::table size="md">Medium Text (Default)</x-keys::table>
<x-keys::table size="lg">Large Text</x-keys::table>
```

## Bordered Table

```blade
<x-keys::table :bordered="true">
    <!-- table content -->
</x-keys::table>
```

## With Pagination

```blade
<x-keys::table :paginate="$users">
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Name</x-keys::table.header>
            <x-keys::table.header>Email</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($users as $user)
            <x-keys::table.row>
                <x-keys::table.cell>{{ $user->name }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->email }}</x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

Controller:
```php
public function index()
{
    $users = User::paginate(10);

    return view('users.index', compact('users'));
}
```

## Selectable Rows

```blade
<x-keys::table
    :selectable="true"
    selection-name="selected_users[]"
    :selected-ids="$selectedUsers"
>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>
                <!-- Select all checkbox -->
            </x-keys::table.header>
            <x-keys::table.header>Name</x-keys::table.header>
            <x-keys::table.header>Email</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($users as $user)
            <x-keys::table.row>
                <x-keys::table.cell>
                    <x-keys::checkbox
                        name="selected_users[]"
                        :value="$user->id"
                        :checked="in_array($user->id, $selectedUsers)"
                    />
                </x-keys::table.cell>
                <x-keys::table.cell>{{ $user->name }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->email }}</x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

## Loading State

```blade
<x-keys::table :loading="$isLoading">
    <!-- table content -->
</x-keys::table>
```

## Empty State

```blade
<x-keys::table>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Name</x-keys::table.header>
            <x-keys::table.header>Email</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @forelse($users as $user)
            <x-keys::table.row>
                <x-keys::table.cell>{{ $user->name }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->email }}</x-keys::table.cell>
            </x-keys::table.row>
        @empty
            <x-keys::table.empty-state colspan="2">
                No users found
            </x-keys::table.empty-state>
        @endforelse
    </x-keys::table.body>
</x-keys::table>
```

## With Actions

```blade
<x-keys::table :striped="true" :hover="true">
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Name</x-keys::table.header>
            <x-keys::table.header>Email</x-keys::table.header>
            <x-keys::table.header>Actions</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($users as $user)
            <x-keys::table.row>
                <x-keys::table.cell>{{ $user->name }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->email }}</x-keys::table.cell>
                <x-keys::table.cell>
                    <div class="flex gap-2 justify-end">
                        <x-keys::button
                            variant="ghost"
                            size="sm"
                            icon-left="heroicon-o-pencil"
                            href="{{ route('users.edit', $user) }}"
                        >
                            Edit
                        </x-keys::button>
                        <x-keys::button
                            variant="ghost"
                            size="sm"
                            color="danger"
                            icon-left="heroicon-o-trash"
                            wire:click="delete({{ $user->id }})"
                            wire:confirm="Are you sure?"
                        >
                            Delete
                        </x-keys::button>
                    </div>
                </x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

## With Status Badges

```blade
<x-keys::table>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Order ID</x-keys::table.header>
            <x-keys::table.header>Customer</x-keys::table.header>
            <x-keys::table.header>Status</x-keys::table.header>
            <x-keys::table.header>Total</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($orders as $order)
            <x-keys::table.row>
                <x-keys::table.cell>{{ $order->id }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $order->customer->name }}</x-keys::table.cell>
                <x-keys::table.cell>
                    <x-keys::badge
                        :color="$order->status_color"
                        size="sm"
                    >
                        {{ $order->status }}
                    </x-keys::badge>
                </x-keys::table.cell>
                <x-keys::table.cell>${{ number_format($order->total, 2) }}</x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

## Livewire Integration

```blade
<x-keys::table
    :striped="true"
    :hover="true"
    :paginate="$users"
    wire:loading.class="opacity-50"
>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>
                <div class="flex items-center gap-2 cursor-pointer" wire:click="sortBy('name')">
                    Name
                    @if($sortField === 'name')
                        <x-keys::icon
                            :name="$sortDirection === 'asc' ? 'heroicon-o-chevron-up' : 'heroicon-o-chevron-down'"
                            size="xs"
                        />
                    @endif
                </div>
            </x-keys::table.header>
            <x-keys::table.header>Email</x-keys::table.header>
            <x-keys::table.header>Actions</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($users as $user)
            <x-keys::table.row>
                <x-keys::table.cell>{{ $user->name }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->email }}</x-keys::table.cell>
                <x-keys::table.cell>
                    <x-keys::dropdown id="user-{{ $user->id }}">
                        <x-slot:trigger>
                            <x-keys::button
                                variant="ghost"
                                size="sm"
                                icon-left="heroicon-o-ellipsis-horizontal"
                            />
                        </x-slot:trigger>

                        <x-keys::dropdown.item wire:click="edit({{ $user->id }})">
                            Edit
                        </x-keys::dropdown.item>
                        <x-keys::dropdown.item
                            wire:click="delete({{ $user->id }})"
                            wire:confirm="Are you sure?"
                            color="danger"
                        >
                            Delete
                        </x-keys::dropdown.item>
                    </x-keys::dropdown>
                </x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

Component class:
```php
class UsersTable extends Component
{
    public string $sortField = 'name';
    public string $sortDirection = 'asc';

    public function sortBy(string $field)
    {
        if ($this->sortField === $field) {
            $this->sortDirection = $this->sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            $this->sortField = $field;
            $this->sortDirection = 'asc';
        }
    }

    public function render()
    {
        $users = User::orderBy($this->sortField, $this->sortDirection)->paginate(10);

        return view('livewire.users-table', compact('users'));
    }
}
```

## Complete Example

```blade
<x-keys::table
    :striped="true"
    :hover="true"
    :bordered="true"
    :paginate="$products"
    size="md"
>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Product</x-keys::table.header>
            <x-keys::table.header>Category</x-keys::table.header>
            <x-keys::table.header>Price</x-keys::table.header>
            <x-keys::table.header>Stock</x-keys::table.header>
            <x-keys::table.header>Status</x-keys::table.header>
            <x-keys::table.header>Actions</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @forelse($products as $product)
            <x-keys::table.row>
                <x-keys::table.cell>
                    <div class="flex items-center gap-3">
                        <x-keys::image
                            :src="$product->image"
                            :alt="$product->name"
                            class="w-10 h-10 rounded object-cover"
                        />
                        <div>
                            <div class="font-medium">{{ $product->name }}</div>
                            <div class="text-xs text-text-muted">{{ $product->sku }}</div>
                        </div>
                    </div>
                </x-keys::table.cell>
                <x-keys::table.cell>{{ $product->category->name }}</x-keys::table.cell>
                <x-keys::table.cell>${{ number_format($product->price, 2) }}</x-keys::table.cell>
                <x-keys::table.cell>
                    @if($product->stock > 10)
                        <span class="text-success">{{ $product->stock }}</span>
                    @elseif($product->stock > 0)
                        <span class="text-warning">{{ $product->stock }}</span>
                    @else
                        <span class="text-danger">Out of stock</span>
                    @endif
                </x-keys::table.cell>
                <x-keys::table.cell>
                    <x-keys::badge
                        :color="$product->is_active ? 'success' : 'neutral'"
                        size="sm"
                    >
                        {{ $product->is_active ? 'Active' : 'Inactive' }}
                    </x-keys::badge>
                </x-keys::table.cell>
                <x-keys::table.cell>
                    <div class="flex gap-2 justify-end">
                        <x-keys::button
                            variant="ghost"
                            size="sm"
                            href="{{ route('products.edit', $product) }}"
                        >
                            Edit
                        </x-keys::button>
                    </div>
                </x-keys::table.cell>
            </x-keys::table.row>
        @empty
            <x-keys::table.empty-state colspan="6">
                No products found
            </x-keys::table.empty-state>
        @endforelse
    </x-keys::table.body>
</x-keys::table>
```

## Accessibility

- Proper `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` structure
- Responsive design with horizontal scrolling
- Focus-visible styles for interactive elements
- Screen reader friendly

## Component Structure

The Table component consists of:

1. **PHP Class** (`Table.php`)
   - Props validation
   - Pagination support
   - Selection handling
   - Data attributes generation

2. **Blade Template** (`table.blade.php`)
   - Responsive wrapper
   - Pagination display
   - Variant styling

3. **Child Components**:
   - `Table\Head` - Table header
   - `Table\Body` - Table body
   - `Table\Row` - Table row
   - `Table\Header` - Header cell
   - `Table\Cell` - Body cell
   - `Table\EmptyState` - Empty state message

## Data Attributes

- `data-keys-table="true"` - Component identifier
- `data-size="md"` - Size variant
- `data-selectable="true"` - Selectable rows
- `data-striped="true"` - Striped rows
- `data-hover="true"` - Hover effects
- `data-bordered="true"` - Bordered table
- `data-responsive="true"` - Responsive mode
- `data-loading="true"` - Loading state
- `data-has-pagination="true"` - Has pagination

## Best Practices

1. **Use appropriate sizes**: Match text size to content density
2. **Enable hover for interactive rows**: Improves usability
3. **Use striping for long tables**: Easier row tracking
4. **Right-align numeric data**: Standard convention
5. **Provide empty states**: Handle no data gracefully
6. **Use pagination for large datasets**: Improve performance
7. **Keep actions in last column**: Standard UI pattern
8. **Use badges for status**: Visual differentiation
9. **Maintain column consistency**: Same data types in columns
10. **Consider mobile users**: Test responsive behavior
