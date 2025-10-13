@php
    $containerClasses = '';
    if ($responsive) {
        $containerClasses .= 'overflow-x-auto ';
    }
    if ($bordered) {
        $containerClasses .= 'border border-border rounded-md overflow-hidden ';
    }
    $containerClasses = trim($containerClasses);

    $tableBaseClasses = 'min-w-full divide-y divide-border';
    $tableSizeClasses = match ($size) {
        'sm' => 'text-sm',
        'md' => 'text-sm',
        'lg' => 'text-base',
        default => 'text-sm'
    };

    // MODIFIED: Added hover variant directly here
    $tableVariantClasses = '';
    if ($striped) {
        $tableVariantClasses .= '[&_tbody_tr:nth-child(odd)]:bg-body ';
    }
    if ($hover) {
        // This arbitrary variant replaces the need for table.css
        $tableVariantClasses .= '[&_tbody_tr:not([data-selected=true])]:hover:bg-hover ';
    }

    // Default column alignment (left for all, right for last column which is typically actions)
    $columnAlignmentClasses = implode(' ', [
        '[&_thead_tr_th]:text-left',
        '[&_tbody_tr_td]:text-left',
        '[&_thead_tr_th:last-child]:text-right',
        '[&_thead_tr_th:last-child]:w-max',
        '[&_tbody_tr_td:last-child]:text-right',
        '[&_tbody_tr_td:last-child]:w-max',
        // Target flex wrapper inside headers for proper alignment
        '[&_thead_tr_th>div]:justify-start',
        '[&_thead_tr_th:last-child>div]:justify-end',
    ]);

    $tableClasses = trim("$tableBaseClasses $tableSizeClasses $tableVariantClasses $columnAlignmentClasses");
@endphp

<div {{ $attributes->merge(['class' => $containerClasses])->merge($dataAttributes) }}>
    <table class="{{ $tableClasses }}">
        {{ $slot }}
    </table>

    @if($hasPagination())
        <div class="px-6 py-3 bg-body border-t border-border">
            <div class="flex items-center justify-between">
                <div class="text-sm text-text-muted">
                    {{ $getPaginationInfo() }}
                </div>
                <div>
                    {{ $paginate->links() }}
                </div>
            </div>
        </div>
    @endif
</div>
