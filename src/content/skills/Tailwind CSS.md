---
tags:
  - synced
  - coding
  - skill
  - portfolio
  - notes
  - tag
  - framework
created: 2025-05-31T22:28:00
modified: 2025-07-23T14:21:08+01:00
viewCount: 11
aliases:
  - Tailwind
skillRating: 25
skillDescription: Utilised across my Portfolio and useful for quick prototyping, but end up regularly falling back to CSS.
logoFileName: tailwind.svg
---
# Tailwind CSS

> [!back] Link back to [[Skills Notes]]

> A framework for [[CSS]]

## Table of Contents

```table-of-contents
```

## Tailwind CSS Cheat Sheet

> This is a concise reference for Tailwind CSS utility classes, with inline comments for clarity. Each section includes a link to the official documentation.

### Layout

> [Layout Docs](https://tailwindcss.com/docs/container)

```html
<div class="container mx-auto">        <!-- Responsive max-width container with horizontal auto margin -->
<div class="box-border">               <!-- Includes padding and border in element's total width/height -->
<div class="box-content">              <!-- Excludes padding and border from total width/height -->
<div class="block">                    <!-- Display block -->
<div class="inline-block">             <!-- Display inline-block -->
<div class="inline">                   <!-- Display inline -->
<div class="flex">                     <!-- Display flex -->
<div class="inline-flex">              <!-- Display inline-flex -->
<div class="grid">                     <!-- Display grid -->
<div class="hidden">                   <!-- Hide element -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Spacing (Margin & Padding)

> [Spacing Docs](https://tailwindcss.com/docs/margin)

```html
<!-- Margin -->
<div class="m-4">                      <!-- Margin on all sides -->
<div class="mx-4">                    <!-- Horizontal margin -->
<div class="my-4">                    <!-- Vertical margin -->
<div class="mt-4">                    <!-- Margin top -->
<div class="mr-4">                    <!-- Margin right -->
<div class="mb-4">                    <!-- Margin bottom -->
<div class="ml-4">                    <!-- Margin left -->

<!-- Padding -->
<div class="p-4">                      <!-- Padding on all sides -->
<div class="px-4">                     <!-- Horizontal padding -->
<div class="py-4">                     <!-- Vertical padding -->
<div class="pt-4">                     <!-- Padding top -->
<div class="pr-4">                     <!-- Padding right -->
<div class="pb-4">                     <!-- Padding bottom -->
<div class="pl-4">                     <!-- Padding left -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Sizing

> [Width Docs](https://tailwindcss.com/docs/width) and [Height Docs](https://tailwindcss.com/docs/height)

```html
<!-- Width -->
<div class="w-full">                  <!-- Width: 100% -->
<div class="w-screen">                <!-- Width: 100vw -->
<div class="w-1/2">                   <!-- Width: 50% -->
<div class="w-64">                    <!-- Width: 16rem -->

<!-- Height -->
<div class="h-full">                  <!-- Height: 100% -->
<div class="h-screen">                <!-- Height: 100vh -->
<div class="h-32">                    <!-- Height: 8rem -->

<!-- Min/Max -->
<div class="min-w-full">              <!-- Min-width: 100% -->
<div class="max-h-screen">            <!-- Max-height: 100vh -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Colours

> [Colours Docs](https://tailwindcss.com/docs/text-color)

```html
<div class="text-blue-500">           <!-- Text color: blue -->
<div class="bg-red-100">              <!-- Background color: light red -->
<div class="border-green-600">        <!-- Border color: dark green -->
<div class="placeholder-gray-400">    <!-- Placeholder text color -->
<div class="divide-yellow-300">       <!-- Divider color for children -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Typography

> [Typography Docs](https://tailwindcss.com/docs/font-size)

```html
<p class="text-sm font-light">        <!-- Small text, light weight -->
<p class="text-lg font-bold">         <!-- Large text, bold weight -->

<p class="text-left">                 <!-- Align left -->
<p class="text-center">               <!-- Align center -->
<p class="text-right">                <!-- Align right -->

<p class="leading-tight tracking-wide"> <!-- Tight line-height, wide letter spacing -->

<p class="underline italic uppercase"> <!-- Underlined, italic, all caps -->

<p class="font-sans">                 <!-- Sans-serif font -->
<p class="font-serif">                <!-- Serif font -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Borders

> [Border Docs](https://tailwindcss.com/docs/border-width)

```html
<div class="border">                  <!-- 1px solid border -->
<div class="border-2 border-blue-500"> <!-- 2px border with blue color -->
<div class="rounded">                 <!-- Small border radius -->
<div class="rounded-full">            <!-- Fully rounded (circle) -->
<div class="border-t-4 border-dashed"> <!-- 4px top border, dashed style -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Flexbox & Grid

> [Flexbox Docs](https://tailwindcss.com/docs/flex) and [Grid Docs](https://tailwindcss.com/docs/grid-template-columns)

```html
<!-- Flexbox -->
<div class="flex flex-row justify-between items-center">
  <!-- Flex row, space-between, center alignment -->

<div class="flex-col">                <!-- Flex direction: column -->
<div class="flex-wrap">               <!-- Wrap flex items -->
<div class="gap-4">                   <!-- Gap between items: 1rem -->

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">  <!-- Grid with 3 columns and 1rem gap -->
<div class="col-span-2 row-span-1">   <!-- Span 2 columns, 1 row -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Positioning

> [Position Docs](https://tailwindcss.com/docs/position)

```html
<div class="relative">                <!-- Relative positioning -->
<div class="absolute top-0 left-0">   <!-- Absolutely positioned top-left -->
<div class="fixed bottom-0 right-0">  <!-- Fixed to bottom-right of screen -->
<div class="z-50">                    <!-- High z-index (stack order) -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Display & Visibility

> [Display Docs](https://tailwindcss.com/docs/display)

```html
<div class="block">                   <!-- Display block -->
<div class="inline-block">            <!-- Display inline-block -->
<div class="hidden">                  <!-- Hide element (display: none) -->
<div class="invisible">               <!-- Hide element but keep space -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Responsive Design

> [Responsive Design Docs](https://tailwindcss.com/docs/responsive-design)

```html
<div class="text-sm md:text-lg lg:text-xl">
  <!-- Responsive text sizes for breakpoints: sm, md, lg -->

<div class="p-2 sm:p-4 md:p-6">        <!-- Responsive padding for breakpoints -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Transitions & Animations

> [Transition Docs](https://tailwindcss.com/docs/transition-property) and [Animation Docs](https://tailwindcss.com/docs/animation)

```html
<div class="transition duration-300 ease-in-out">
  <!-- Smooth transition over 300ms with ease-in-out -->

<div class="hover:scale-110">         <!-- Scale up on hover -->

<div class="animate-bounce">          <!-- Apply bounce animation -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### State Variants

> [Hover, Focus, Active Docs](https://tailwindcss.com/docs/hover-focus-and-other-states)

```html
<button class="bg-blue-500 hover:bg-blue-700 focus:ring-2 active:scale-95">
  <!-- Blue background, darker on hover, focus ring, scale down on click -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Dark Mode

> [Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  <!-- Light mode: white bg, black text; Dark mode: dark bg, white text -->
```

>[!top] [Back to top](#Table%20of%20Contents)

### Utilities

> [All Utilities Overview](https://tailwindcss.com/docs)

```html
<div class="overflow-hidden">         <!-- Hide overflow -->
<img class="object-cover">            <!-- Cover entire container with preserved aspect -->
<div class="shadow-lg">               <!-- Large box-shadow -->
<button class="cursor-pointer">       <!-- Pointer cursor -->
<div class="opacity-50">              <!-- 50% opacity -->
```

>[!top] [Back to top](#Table%20of%20Contents)

## Links

- [Tailwind CSS Site](https://tailwindcss.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation/using-vite)

>[!top] [Back to top](#Table%20of%20Contents)

## Skill

```meta-bind  
INPUT[progressBar(title(Skill Rating), minValue(0), maxValue(100)):skillRating]  
```

>[!top] [Back to top](#Table%20of%20Contents)

## Skill Description

`=this.skillDescription`

>[!top] [Back to top](#Table%20of%20Contents)

## Analysis

### Linked Projects

>[!projects] Linked Projects
>```dataview
TABLE WITHOUT ID file.link as "Linked Project", file.mday as "Last Modified"
FROM #project 
WHERE contains(technologies, this.file.link)
SORT length(file.inlinks) DESC
>```

>[!top] [Back to top](#Table%20of%20Contents)

### Unread Links

>[!reading] Unread Reading List
>```dataview
TASK
WHERE !completed AND !contains(file.path, "Template") AND text != "" AND contains(text, this.file.name)
GROUP BY file.link
LIMIT 100

>[!top] [Back to top](#Table%20of%20Contents)

### Read Links

>[!reading] Completed Reading List
>```dataview
TASK
WHERE completed AND !contains(file.path, "Template") AND text != "" AND contains(text, this.file.name)
GROUP BY file.link
LIMIT 100

>[!top] [Back to top](#Table%20of%20Contents)

### Total Count

```dataview
TABLE WITHOUT ID length(this.file.inlinks) as "Links"
FROM [[]]
GROUP BY "Links"
```

>[!top] [Back to top](#Table%20of%20Contents)

### Last Mentioned

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
LIMIT 5
```

>[!top] [Back to top](#Table%20of%20Contents)

### All Mentions

```dataview
TABLE file.mtime As ModifiedTime
FROM [[]]
SORT file.ctime DESC
```

>[!top] [Back to top](#Table%20of%20Contents)