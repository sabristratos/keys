# File Upload Component

A comprehensive file upload component with drag-and-drop support, file preview, validation, multiple file uploads, and Livewire integration for real-time progress tracking.

## Basic Usage

```blade
<x-keys::file-upload name="document" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | auto-generated | Input ID |
| `accept` | `string` | `'*'` | Accepted file types (MIME types or extensions) |
| `max-size` | `string\|null` | `null` | Maximum file size (e.g., "5MB", "100KB") |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `disabled` | `bool` | `false` | Disable the upload |
| `required` | `bool` | `false` | Mark as required |
| `label` | `string\|null` | `null` | Label text (shorthand mode) |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |
| `drag-drop` | `bool` | `true` | Enable drag and drop |
| `placeholder` | `string\|null` | auto-generated | Placeholder text |
| `preview-style` | `string` | `'transform'` | Preview style: `transform`, `list` |
| `multiple` | `bool` | `false` | Allow multiple files |
| `max-files` | `int\|null` | `null` | Maximum number of files |
| `variant` | `string` | `'default'` | Variant: `default`, `compact`, `image-fill` |
| `aspect-ratio` | `string` | `'auto'` | Aspect ratio: `auto`, `1:1`, `16:9`, `4:3`, `3:2` |
| `object-fit` | `string` | `'cover'` | Object fit: `cover`, `contain`, `fill` |

## Basic Examples

```blade
<x-keys::field>
    <x-keys::label for="avatar">Profile Picture</x-keys::label>
    <x-keys::file-upload
        id="avatar"
        name="avatar"
        accept="image/*"
        max-size="5MB"
    />
</x-keys::field>
```

## File Type Restrictions

### Images Only
```blade
<x-keys::file-upload
    name="photo"
    accept="image/*"
/>
```

### Specific Image Types
```blade
<x-keys::file-upload
    name="logo"
    accept="image/png,image/jpeg,image/webp"
/>
```

### Documents
```blade
<x-keys::file-upload
    name="document"
    accept=".pdf,.doc,.docx"
/>
```

### Multiple Types
```blade
<x-keys::file-upload
    name="attachment"
    accept="image/*,application/pdf,.doc,.docx"
/>
```

## File Size Limits

```blade
<!-- 5 Megabytes -->
<x-keys::file-upload name="file" max-size="5MB" />

<!-- 500 Kilobytes -->
<x-keys::file-upload name="file" max-size="500KB" />

<!-- 1 Gigabyte -->
<x-keys::file-upload name="file" max-size="1GB" />
```

## Multiple Files

```blade
<x-keys::file-upload
    label="Upload Images"
    name="images"
    accept="image/*"
    :multiple="true"
    :max-files="5"
/>
```

## Variants

### Default
Standard upload area with drag-and-drop:

```blade
<x-keys::file-upload
    name="file"
    variant="default"
/>
```

### Compact
Smaller upload button:

```blade
<x-keys::file-upload
    name="file"
    variant="compact"
/>
```

### Image Fill
Image-focused upload with preview:

```blade
<x-keys::file-upload
    name="cover_image"
    variant="image-fill"
    accept="image/*"
    aspect-ratio="16:9"
/>
```

## Aspect Ratios (Image Fill Variant)

```blade
<!-- Square -->
<x-keys::file-upload
    name="avatar"
    variant="image-fill"
    aspect-ratio="1:1"
/>

<!-- Widescreen -->
<x-keys::file-upload
    name="banner"
    variant="image-fill"
    aspect-ratio="16:9"
/>

<!-- Photo -->
<x-keys::file-upload
    name="photo"
    variant="image-fill"
    aspect-ratio="4:3"
/>
```

## Disable Drag and Drop

```blade
<x-keys::file-upload
    name="file"
    :drag-drop="false"
/>
```

## Sizes

```blade
<x-keys::file-upload size="sm" name="file" />
<x-keys::file-upload size="md" name="file" />
<x-keys::file-upload size="lg" name="file" />
```

## Shorthand with Label

```blade
<x-keys::file-upload
    label="Upload Document"
    name="document"
    accept=".pdf,.doc"
    max-size="10MB"
    hint="PDF or Word document, maximum 10MB"
/>
```

## Livewire Integration

```blade
<x-keys::file-upload
    label="Profile Picture"
    name="avatar"
    wire:model="avatar"
    accept="image/*"
    max-size="2MB"
/>

@if ($avatar)
    <div class="mt-4">
        <p>Preview:</p>
        <img src="{{ $avatar->temporaryUrl() }}" class="w-32 h-32 object-cover rounded">
    </div>
@endif
```

### Multiple Files with Livewire

```blade
<x-keys::file-upload
    label="Upload Photos"
    name="photos"
    wire:model="photos"
    accept="image/*"
    :multiple="true"
    :max-files="10"
/>

@if ($photos)
    <div class="grid grid-cols-4 gap-4 mt-4">
        @foreach($photos as $photo)
            <img src="{{ $photo->temporaryUrl() }}" class="w-full h-24 object-cover rounded">
        @endforeach
    </div>
@endif
```

### With Progress

```blade
<x-keys::file-upload
    label="Upload Video"
    name="video"
    wire:model="video"
    accept="video/*"
    max-size="100MB"
/>

<div wire:loading wire:target="video" class="mt-2">
    <div class="bg-blue-100 rounded-full h-2">
        <div class="bg-blue-600 h-2 rounded-full" style="width: 0%" x-data x-init="
            let progress = 0;
            let interval = setInterval(() => {
                progress += 10;
                $el.style.width = progress + '%';
                if (progress >= 100) clearInterval(interval);
            }, 200);
        "></div>
    </div>
    <p class="text-sm text-gray-600 mt-1">Uploading...</p>
</div>
```

## With Validation

```blade
<form wire:submit="save">
    <x-keys::file-upload
        label="Resume"
        name="resume"
        wire:model="resume"
        accept=".pdf,.doc,.docx"
        max-size="5MB"
        :required="true"
        :errors="$errors->get('resume')"
    />

    <x-keys::button type="submit" color="primary" class="mt-4">
        Upload Resume
    </x-keys::button>
</form>
```

## Use Cases

### Profile Picture Upload

```blade
<div class="flex items-center gap-6">
    <img
        src="{{ $user->avatar_url }}"
        alt="{{ $user->name }}"
        class="w-24 h-24 rounded-full object-cover"
    >

    <div class="flex-1">
        <x-keys::file-upload
            label="Update Profile Picture"
            name="avatar"
            wire:model="avatar"
            accept="image/jpeg,image/png,image/webp"
            max-size="2MB"
            variant="compact"
        />
    </div>
</div>
```

### Document Upload Form

```blade
<form wire:submit="submitDocuments">
    <div class="space-y-6">
        <x-keys::file-upload
            label="ID Document"
            name="id_document"
            wire:model="idDocument"
            accept="image/*,.pdf"
            max-size="5MB"
            :required="true"
        />

        <x-keys::file-upload
            label="Proof of Address"
            name="proof_address"
            wire:model="proofAddress"
            accept="image/*,.pdf"
            max-size="5MB"
            :required="true"
        />

        <x-keys::file-upload
            label="Additional Documents"
            name="additional"
            wire:model="additional"
            :multiple="true"
            :max-files="3"
        />
    </div>

    <x-keys::button
        type="submit"
        color="primary"
        class="mt-6"
        :loading="$isUploading"
    >
        Submit Documents
    </x-keys::button>
</form>
```

### Gallery Upload

```blade
<x-keys::file-upload
    label="Upload Gallery Images"
    name="gallery"
    wire:model="galleryImages"
    accept="image/*"
    :multiple="true"
    :max-files="20"
    max-size="5MB"
/>

@if ($galleryImages)
    <div class="grid grid-cols-4 gap-4 mt-6">
        @foreach($galleryImages as $index => $image)
            <div class="relative group">
                <img
                    src="{{ $image->temporaryUrl() }}"
                    class="w-full h-32 object-cover rounded"
                >
                <button
                    type="button"
                    wire:click="removeImage({{ $index }})"
                    class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100"
                >
                    <x-icon name="heroicon-o-x-mark" class="w-4 h-4" />
                </button>
            </div>
        @endforeach
    </div>
@endif
```

### Cover Image Upload

```blade
<x-keys::file-upload
    label="Cover Image"
    name="cover"
    wire:model="coverImage"
    accept="image/*"
    variant="image-fill"
    aspect-ratio="16:9"
    max-size="5MB"
    hint="Recommended size: 1920x1080px"
/>
```

## Accessibility

The File Upload component includes:

- Proper label association
- Keyboard navigation (Enter/Space to trigger)
- ARIA labels for screen readers
- Focus-visible styles
- File type announcements

## Data Attributes

- `data-keys-file-upload="true"`
- `data-size="md"`
- `data-drag-drop="true"`
- `data-livewire="true"` (if Livewire enabled)
- `data-preview-style="transform"`
- `data-multiple="true"` (if applicable)
- `data-variant="default"`
- `data-aspect-ratio="auto"`
- `data-accept` - Accepted file types
- `data-max-size` - Maximum file size in bytes
- `data-max-files` - Maximum number of files

## Best Practices

1. **Set file type restrictions**: Only accept necessary file types
2. **Limit file size**: Prevent server overload with reasonable limits
3. **Show upload progress**: Provide feedback during upload
4. **Validate server-side**: Always validate on the server
5. **Handle errors gracefully**: Show clear error messages
6. **Provide clear instructions**: Tell users what files are accepted
7. **Use multiple for galleries**: Enable multiple file selection
8. **Preview before upload**: Show preview of selected files
9. **Sanitize filenames**: Clean filenames before storing

## Component Structure

1. **PHP Class** (`FileUpload.php`)
   - Props validation
   - File size conversion
   - Livewire detection
   - Data attributes generation

2. **Blade Template** (`file-upload.blade.php`)
   - Drop zone rendering
   - File input
   - Preview display
   - Livewire integration

3. **TypeScript Actions** (`FileUploadActions.ts`)
   - Drag and drop handling
   - File validation
   - Preview generation
   - Progress tracking
