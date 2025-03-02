export function formatCurrency(value: number): string {
  // For very large numbers, use abbreviations
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }

  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }

  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`
  }

  // For small values (less than $1)
  if (value < 1) {
    return `$${value.toFixed(6)}`
  }

  // For normal values
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

