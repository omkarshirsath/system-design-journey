# 2. Understanding of DOM with Real-Time Example

## Problem Statement

Explain DOM (Document Object Model) with a
real-world scenario, not theoretical
definition.

---

## What is DOM?

DOM is a tree-like representation of HTML
elements that browsers create. It allows
JavaScript to interact with and modify
webpage content dynamically in real-time.

---

## Real-Time Example - Amazon Add to Cart

**Scenario:** User clicks "Add to Cart" button on Amazon

What happens in DOM:
1. JavaScript finds the button element in DOM tree
2. Button text changes from "Add to Cart" to "Added to Cart"
3. A new DOM element is created for cart counter
4. Cart counter value changes from "0" to "1"
5. All changes happen instantly without page reload

---

## Real-Time Example - Dark Mode Toggle

**Scenario:** User clicks dark mode icon on website

What happens in DOM:
1. JavaScript finds the body element in DOM
2. Background color property changes from white to black
3. JavaScript finds all text elements
4. Text color property changes from black to white
5. Entire page theme changes instantly

---

## Real-Time Example - Live Search

**Scenario:** User types in Google search bar

What happens in DOM:
1. JavaScript listens to each keystroke
2. Creates new DOM elements for search suggestions
3. Removes old suggestion elements
4. Updates without refreshing the page

---

## Key DOM Operations

- Find elements (getElementById, querySelector)
- Create new elements (createElement)
- Change properties (textContent, style, classList)
- Remove elements (remove, removeChild)

---