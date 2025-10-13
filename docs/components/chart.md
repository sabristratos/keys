# Chart Component

A zero-dependency SVG-based chart component supporting bar, line, area, pie, and sparkline charts with interactivity, animations, and customizable styling.

## Basic Usage

```blade
<x-keys::chart
    type="bar"
    :data="$salesData"
    x-field="month"
    y-field="sales"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `array` | `[]` | Chart data array |
| `type` | `string` | `'bar'` | Chart type: `bar`, `line`, `area`, `pie`, `sparkline` |
| `x-field` | `string` | `'x'` | X-axis data field |
| `y-field` | `string` | `'y'` | Y-axis data field |
| `series` | `array` | `[]` | Multi-series configuration |
| `colors` | `array` | auto | Custom color palette |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl` |
| `show-grid` | `bool` | `true` | Show grid lines |
| `show-legend` | `bool` | `false` | Show legend |
| `show-axes` | `bool` | `true` | Show axes |
| `animate` | `bool` | `true` | Enable animations |
| `interactive` | `bool` | `true` | Enable interactivity (tooltips, hover) |
| `width` | `int` | `800` | SVG viewBox width |
| `height` | `int` | `400` | SVG viewBox height |
| `padding` | `int` | `120` | Internal padding |
| `title` | `string\|null` | `null` | Chart title |
| `x-label` | `string\|null` | `null` | X-axis label |
| `y-label` | `string\|null` | `null` | Y-axis label |
| `sparkline-variant` | `string` | `'line'` | Sparkline variant: `line`, `bars`, `dots`, `area` |

## Chart Types

### Bar Chart

```blade
<x-keys::chart
    type="bar"
    :data="[
        ['month' => 'Jan', 'sales' => 1200],
        ['month' => 'Feb', 'sales' => 1900],
        ['month' => 'Mar', 'sales' => 1500],
        ['month' => 'Apr', 'sales' => 2100]
    ]"
    x-field="month"
    y-field="sales"
    title="Monthly Sales"
/>
```

### Line Chart

```blade
<x-keys::chart
    type="line"
    :data="$temperatureData"
    x-field="day"
    y-field="temp"
    title="Temperature Over Time"
/>
```

### Area Chart

```blade
<x-keys::chart
    type="area"
    :data="$pageViewsData"
    x-field="date"
    y-field="views"
    title="Page Views"
/>
```

### Pie Chart

```blade
<x-keys::chart
    type="pie"
    :data="[
        ['category' => 'Desktop', 'value' => 45],
        ['category' => 'Mobile', 'value' => 35],
        ['category' => 'Tablet', 'value' => 20]
    ]"
    x-field="category"
    y-field="value"
    :show-legend="true"
/>
```

### Sparkline

Compact charts for inline display:

```blade
<!-- Line sparkline -->
<x-keys::chart
    type="sparkline"
    sparkline-variant="line"
    :data="$quickStats"
    x-field="day"
    y-field="count"
/>

<!-- Bar sparkline -->
<x-keys::chart
    type="sparkline"
    sparkline-variant="bars"
    :data="$weeklyData"
/>

<!-- Dot sparkline -->
<x-keys::chart
    type="sparkline"
    sparkline-variant="dots"
    :data="$trends"
/>
```

## Multi-Series Charts

```blade
<x-keys::chart
    type="line"
    :data="$salesData"
    x-field="month"
    :series="[
        ['name' => 'Product A', 'field' => 'product_a'],
        ['name' => 'Product B', 'field' => 'product_b'],
        ['name' => 'Product C', 'field' => 'product_c']
    ]"
    :show-legend="true"
    title="Product Sales Comparison"
/>
```

## Custom Colors

```blade
<x-keys::chart
    type="bar"
    :data="$data"
    :colors="['#3b82f6', '#ef4444', '#10b981', '#f59e0b']"
/>
```

## Chart Customization

### Without Grid

```blade
<x-keys::chart
    type="line"
    :data="$data"
    :show-grid="false"
/>
```

### Without Axes

```blade
<x-keys::chart
    type="area"
    :data="$data"
    :show-axes="false"
/>
```

### With Labels

```blade
<x-keys::chart
    type="bar"
    :data="$data"
    title="Revenue Analysis"
    x-label="Quarter"
    y-label="Revenue ($)"
/>
```

## Sizes

```blade
<x-keys::chart type="bar" :data="$data" size="xs" />
<x-keys::chart type="bar" :data="$data" size="sm" />
<x-keys::chart type="bar" :data="$data" size="md" />
<x-keys::chart type="bar" :data="$data" size="lg" />
<x-keys::chart type="bar" :data="$data" size="xl" />
```

## Use Cases

### Dashboard Analytics

```blade
<div class="grid grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <x-keys::chart
            type="bar"
            :data="$monthlyRevenue"
            x-field="month"
            y-field="revenue"
            :colors="['#3b82f6']"
        />
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">User Growth</h3>
        <x-keys::chart
            type="line"
            :data="$userGrowth"
            x-field="date"
            y-field="users"
            :colors="['#10b981']"
        />
    </div>
</div>
```

### Traffic Sources (Pie)

```blade
<div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Traffic Sources</h3>
    <x-keys::chart
        type="pie"
        :data="[
            ['source' => 'Organic', 'visits' => 4500],
            ['source' => 'Direct', 'visits' => 2300],
            ['source' => 'Social', 'visits' => 1800],
            ['source' => 'Referral', 'visits' => 900]
        ]"
        x-field="source"
        y-field="visits"
        :show-legend="true"
        :interactive="true"
    />
</div>
```

### Inline Sparklines

```blade
<div class="grid grid-cols-4 gap-4">
    <div class="bg-white p-4 rounded shadow">
        <p class="text-sm text-gray-500">Sales</p>
        <p class="text-2xl font-bold">$12,345</p>
        <x-keys::chart
            type="sparkline"
            :data="$salesTrend"
            x-field="day"
            y-field="amount"
        />
    </div>

    <div class="bg-white p-4 rounded shadow">
        <p class="text-sm text-gray-500">Users</p>
        <p class="text-2xl font-bold">1,234</p>
        <x-keys::chart
            type="sparkline"
            sparkline-variant="bars"
            :data="$usersTrend"
        />
    </div>
</div>
```

### Comparison Chart

```blade
<div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">Sales Comparison</h3>
    <x-keys::chart
        type="line"
        :data="$comparisonData"
        x-field="week"
        :series="[
            ['name' => '2023', 'field' => 'sales_2023'],
            ['name' => '2024', 'field' => 'sales_2024']
        ]"
        :show-legend="true"
        :interactive="true"
        title="Year-over-Year Sales"
    />
</div>
```

## Livewire Integration

```blade
<div>
    <div class="flex gap-4 mb-6">
        <x-keys::button
            wire:click="setChartType('bar')"
            :variant="$chartType === 'bar' ? 'solid' : 'outlined'"
        >
            Bar
        </x-keys::button>
        <x-keys::button
            wire:click="setChartType('line')"
            :variant="$chartType === 'line' ? 'solid' : 'outlined'"
        >
            Line
        </x-keys::button>
        <x-keys::button
            wire:click="setChartType('area')"
            :variant="$chartType === 'area' ? 'solid' : 'outlined'"
        >
            Area
        </x-keys::button>
    </div>

    <x-keys::chart
        :type="$chartType"
        :data="$chartData"
        x-field="label"
        y-field="value"
    />
</div>
```

## Accessibility

The Chart component includes:

- Semantic SVG structure
- ARIA labels for data points
- Keyboard navigation support
- Screen reader friendly data tables (optional)
- High contrast mode support

## Data Attributes

- `data-keys-chart="true"`
- `data-chart-type="bar"`
- `data-size="md"`
- `data-interactive="true"`
- `data-animated="true"`
- `data-show-grid="true"`
- `data-show-legend="false"`
- `data-show-axes="true"`
- `data-has-data="true"`
- `data-data-count` - Number of data points

## Best Practices

1. **Prepare data server-side**: Format data in PHP for optimal performance
2. **Choose appropriate chart type**: Bar for comparison, line for trends, pie for proportions
3. **Limit data points**: Too many points can reduce readability
4. **Use meaningful colors**: Choose colors that enhance understanding
5. **Provide tooltips**: Enable interactive mode for detailed information
6. **Include legends for multi-series**: Help users understand what they're viewing
7. **Test responsiveness**: Ensure charts work well on all screen sizes

## Component Structure

1. **PHP Class** (`Chart.php`)
   - Data processing
   - Scale calculation
   - Coordinate transformation
   - Pie geometry calculation
   - Data attributes generation

2. **Blade Template** (`chart.blade.php`)
   - SVG rendering
   - Chart type variants
   - Grid and axes
   - Legend
   - Tooltips

3. **CSS Styles**
   - Chart colors
   - Animations
   - Hover states
   - Responsive sizing
