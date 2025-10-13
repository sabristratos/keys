# Toast Component

Interactive notification system for displaying temporary messages, alerts, and confirmations. Features auto-dismiss functionality, multiple variants, flexible positioning, and a powerful `Keys` facade for programmatic control.

## Basic Usage

```blade
<x-keys::toast
    id="welcome-toast"
    variant="success"
    title="Welcome!"
    message="You've successfully signed in."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Auto-generated | Unique toast identifier |
| `position` | `string` | `'top-right'` | Position on screen |
| `variant` | `string` | `'info'` | Toast variant: `info`, `success`, `warning`, `danger`, `default` |
| `dismissible` | `bool` | `true` | Enable dismiss button |
| `auto-hide` | `bool` | `true` | Auto-dismiss after timeout |
| `timeout` | `int` | `5000` | Auto-dismiss timeout (ms) |
| `icon` | `string` | Auto from variant | Custom icon override |
| `title` | `string` | Empty | Toast title |
| `message` | `string` | Empty | Toast message |
| `persistent` | `bool` | `false` | Persist across page loads |

## Positions

Available toast positions:

- `top-left` - Top left corner
- `top-center` - Top center
- `top-right` - Top right corner (default)
- `bottom-left` - Bottom left corner
- `bottom-center` - Bottom center
- `bottom-right` - Bottom right corner
- `center` - Center of screen

```blade
<x-keys::toast
    id="center-toast"
    position="bottom-right"
    variant="info"
    message="Toast positioned at bottom right"
/>
```

## Variants

### Success
```blade
<x-keys::toast
    id="success-toast"
    variant="success"
    title="Success!"
    message="Your changes have been saved."
/>
```

### Error/Danger
```blade
<x-keys::toast
    id="error-toast"
    variant="danger"
    title="Error"
    message="Something went wrong. Please try again."
/>
```

### Warning
```blade
<x-keys::toast
    id="warning-toast"
    variant="warning"
    title="Warning"
    message="Your session will expire in 5 minutes."
/>
```

### Info
```blade
<x-keys::toast
    id="info-toast"
    variant="info"
    title="Info"
    message="A new version is available."
/>
```

### Default/Neutral
```blade
<x-keys::toast
    id="neutral-toast"
    variant="default"
    message="This is a neutral notification."
/>
```

## Using the Keys Facade

The `Keys` facade provides a powerful API for programmatically showing toasts from anywhere in your application.

### Import the Facade

```php
use Keys\UI\Facades\Keys;
```

### Convenience Methods

#### Success Toast
```php
Keys::success('Your profile has been updated!', 'Success');
```

#### Error Toast
```php
Keys::error('Failed to process your request.', 'Error');
```

#### Warning Toast
```php
Keys::warning('Your subscription will expire soon.', 'Warning');
```

#### Info Toast
```php
Keys::info('New features are available!', 'Info');
```

### Advanced Toast Control

#### Show a Specific Toast
```php
Keys::showToast('welcome-toast', [
    'title' => 'Welcome!',
    'message' => 'Thank you for signing up.'
]);
```

#### Dismiss a Toast
```php
Keys::dismissToast('welcome-toast');
```

#### Dismiss All Toasts
```php
Keys::dismissAllToasts();
```

#### Check if Toast is Visible
```php
if (Keys::isToastVisible('alert-toast')) {
    // Toast is currently displayed
}
```

#### Get All Active Toasts
```php
$toasts = Keys::getToasts();
```

#### Fluent Toast Builder
```php
Keys::toast('custom-toast')
    ->variant('success')
    ->title('Profile Updated')
    ->message('Your changes have been saved.')
    ->position('top-center')
    ->timeout(3000)
    ->show();
```

## Livewire Integration

### Controller/Livewire Component Usage

```php
namespace App\Livewire;

use Keys\UI\Facades\Keys;
use Livewire\Component;

class UserProfile extends Component
{
    public function save()
    {
        // Validate and save...

        Keys::success('Profile updated successfully!');

        // Or with a title
        Keys::success('Your profile has been updated.', 'Success!');
    }

    public function delete()
    {
        try {
            // Delete logic...

            Keys::success('Account deleted successfully.');
        } catch (\Exception $e) {
            Keys::error('Failed to delete account: ' . $e->getMessage(), 'Error');
        }
    }

    public function sendNotification()
    {
        // Send notification...

        Keys::info('Notification sent to your email.', 'Sent');
    }
}
```

### Form Validation Feedback

```php
public function store()
{
    $validated = $this->validate([
        'name' => 'required',
        'email' => 'required|email',
    ]);

    try {
        User::create($validated);

        Keys::success('User created successfully!', 'Success');

        return redirect()->route('users.index');
    } catch (\Exception $e) {
        Keys::error('Failed to create user.', 'Error');
    }
}
```

### Multiple Operations

```php
public function processOrders()
{
    $successful = 0;
    $failed = 0;

    foreach ($this->selectedOrders as $orderId) {
        try {
            $this->processOrder($orderId);
            $successful++;
        } catch (\Exception $e) {
            $failed++;
        }
    }

    if ($successful > 0) {
        Keys::success("{$successful} orders processed successfully.");
    }

    if ($failed > 0) {
        Keys::warning("{$failed} orders failed to process.");
    }
}
```

## Auto-Hide & Timeout

### Default Auto-Hide (5 seconds)
```blade
<x-keys::toast
    id="auto-toast"
    variant="success"
    message="This will auto-dismiss in 5 seconds"
/>
```

### Custom Timeout
```blade
<x-keys::toast
    id="quick-toast"
    variant="info"
    message="Quick message"
    :timeout="2000"
/>
```

### Persistent (No Auto-Hide)
```blade
<x-keys::toast
    id="persistent-toast"
    variant="warning"
    message="This toast stays until manually dismissed"
    :auto-hide="false"
/>
```

### Using Facade
```php
// 3 second timeout
Keys::success('Quick notification')->timeout(3000)->show();

// No auto-hide
Keys::error('Critical error')->autoHide(false)->show();
```

## With Actions

Add action buttons to toasts:

```blade
<x-keys::toast
    id="action-toast"
    variant="info"
    title="Update Available"
    message="A new version of the app is ready to install."
>
    <x-slot:actions>
        <x-keys::button
            size="sm"
            color="primary"
            wire:click="updateApp"
        >
            Update Now
        </x-keys::button>
        <x-keys::button
            size="sm"
            variant="ghost"
            onclick="document.getElementById('action-toast').hidePopover()"
        >
            Later
        </x-keys::button>
    </x-slot:actions>
</x-keys::toast>
```

## Custom Icons

```blade
<x-keys::toast
    id="custom-icon-toast"
    variant="info"
    icon="heroicon-o-sparkles"
    title="New Feature!"
    message="Check out our new dashboard."
/>
```

## Use Cases

### User Authentication
```php
public function login()
{
    if (Auth::attempt($this->credentials)) {
        Keys::success('Welcome back!', 'Login Successful');
        return redirect()->route('dashboard');
    }

    Keys::error('Invalid credentials. Please try again.', 'Login Failed');
}
```

### Form Submission
```php
public function submitForm()
{
    $this->validate();

    try {
        // Save data...
        Keys::success('Form submitted successfully!');
    } catch (ValidationException $e) {
        Keys::error('Please fix the errors and try again.', 'Validation Failed');
    }
}
```

### File Upload
```php
public function uploadFile()
{
    $this->validate(['file' => 'required|file|max:10240']);

    try {
        $this->file->store('uploads');
        Keys::success('File uploaded successfully!', 'Upload Complete');
    } catch (\Exception $e) {
        Keys::error('Failed to upload file.', 'Upload Failed');
    }
}
```

### Background Job
```php
public function processLargeDataset()
{
    ProcessDatasetJob::dispatch($this->dataset);

    Keys::info('Processing started in the background.', 'Job Queued');
}
```

### API Request
```php
public function syncData()
{
    try {
        $response = Http::get('api/sync');

        if ($response->successful()) {
            Keys::success('Data synced successfully!', 'Sync Complete');
        } else {
            Keys::warning('Sync completed with warnings.', 'Partial Success');
        }
    } catch (\Exception $e) {
        Keys::error('Failed to sync data.', 'Sync Failed');
    }
}
```

### Confirmation Actions
```php
public function deleteAccount()
{
    // After confirmation...
    $user->delete();

    Keys::success('Your account has been deleted.', 'Account Deleted');

    Auth::logout();
    return redirect()->route('home');
}
```

### Multi-Step Process
```php
public function checkout()
{
    Keys::info('Processing payment...', 'Step 1 of 3');

    // Process payment
    sleep(1);

    Keys::info('Sending confirmation email...', 'Step 2 of 3');

    // Send email
    sleep(1);

    Keys::success('Order completed!', 'Step 3 of 3');
}
```

## Complete Example

```blade
{{-- Define toasts in your layout --}}
<x-keys::toast
    id="success-notification"
    variant="success"
    position="top-right"
/>

<x-keys::toast
    id="error-notification"
    variant="danger"
    position="top-right"
/>

<x-keys::toast
    id="info-notification"
    variant="info"
    position="bottom-center"
/>
```

```php
// Trigger from any Livewire component or controller
class CheckoutController extends Controller
{
    public function process(Request $request)
    {
        try {
            // Process checkout
            $order = Order::create($request->validated());

            // Show success toast
            Keys::success(
                "Order #{$order->id} has been placed successfully!",
                'Order Confirmed'
            );

            return redirect()->route('orders.show', $order);
        } catch (\Exception $e) {
            Keys::error(
                'There was a problem processing your order. Please try again.',
                'Checkout Error'
            );

            return back();
        }
    }
}
```

## Accessibility

The Toast component includes comprehensive accessibility features:

- `role="status"` for non-critical notifications
- `aria-live="polite"` for normal toasts
- `aria-live="assertive"` for danger/warning toasts
- `aria-labelledby` for title association
- `aria-describedby` for message association
- `aria-atomic="true"` for complete message reading
- Focus management for dismiss buttons
- Keyboard accessible dismiss (Escape key)

## Component Structure

The Toast component consists of:

1. **PHP Class** (`Toast.php`)
   - Props validation
   - Auto-hide logic
   - Variant icon mapping
   - Data attributes generation

2. **Blade Template** (`toast.blade.php`)
   - HTML Popover API integration
   - Variant-based styling
   - Icon display
   - Dismiss button
   - Actions slot

3. **Facade** (`Keys.php`)
   - Programmatic toast control
   - Convenience methods
   - Toast management

4. **Services**:
   - `KeysManager` - Main manager
   - `ToastManager` - Toast-specific logic
   - `ToastInstance` - Fluent builder

5. **TypeScript Actions** (`ToastActions.ts`)
   - Auto-dismiss handling
   - Position management
   - Animation control
   - Queue management

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-toast="true"` - Component identifier
- `data-variant="success"` - Toast variant
- `data-position="top-right"` - Screen position
- `data-element-type="dialog"` - Element type
- `data-dismissible="true"` - Can be dismissed
- `data-auto-hide="true"` - Auto-hide enabled
- `data-timeout="5000"` - Timeout duration
- `data-persistent="false"` - Persistence state
- `data-has-title="true"` - Has title
- `data-has-icon="true"` - Has icon
- `data-icon="..."` - Icon name

## Best Practices

1. **Use appropriate variants**: Match variant to message severity

2. **Keep messages concise**: Toast content should be brief and scannable

3. **Use titles for context**: Titles help users quickly understand the notification

4. **Set appropriate timeouts**: Critical messages need longer display time

5. **Don't overuse**: Too many toasts are annoying and reduce effectiveness

6. **Position consistently**: Use the same position throughout your app

7. **Provide actions when needed**: For actionable notifications

8. **Use facade convenience methods**: Simpler API for common cases

9. **Handle errors gracefully**: Always show feedback for failed operations

10. **Test accessibility**: Ensure screen reader compatibility

## Known Limitations

- Maximum recommended: 3 toasts visible simultaneously
- HTML Popover API required for modern features (fallback provided)
- Position `center` not ideal for multiple toasts
- Auto-hide timing may need adjustment for longer messages

## Performance Tips

- Reuse toast IDs when possible instead of creating many unique toasts
- Limit simultaneous toast count
- Use appropriate timeouts to clear toasts promptly
- Consider queueing toasts for better UX
- Dismiss old toasts before showing new ones in rapid succession
