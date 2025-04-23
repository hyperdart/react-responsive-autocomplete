#  ResponsiveAutocomplete

A responsive React component that mimics Material-UI's Autocomplete and adapts to **mobile** with a full-screen Experience for a better UX.

---

## ✨ Features

- ✅ Responsive Design – switches between standard and fullscreen layouts automatically  
- ✅ Mobile Optimization – mobile version takes full screen for better mobile experience
- ✅ Customizable Back Button & Layout – add styles with optional classNames
- ✅ Fully Compatible with MUI v4 Autocomplete – just swap your import, and it works
- ✅ Zero breaking changes: use it exactly like `<Autocomplete>`

---

##  Getting Started

```bash

# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

> Do the same thing in both the main and example folders.

## ⚙️ Props

All standard props from `MUIv4 Autocomplete` are supported.

| Prop                  | Type       | Description |
|-----------------------|------------|-------------|
| `mobileDivClassName`  | string     | Optional class added to the fullscreen <div> container on mobile |
| `backButtonClassName` | string     | Optional class added to the back <IconButton> shown in mobile fullscreen |



## Requirements
### This library requires the following versions:

- React ^17.0.2

- Material-UI Core ^4.12.4

- Material-UI Icons ^4.11.3

- Material-UI Lab ^4.0.0-alpha.47

> ⚠️ Currently works with MUI v4 and React 17 only.


## Customization Tips
- Use mobileDivClassName to tweak mobile fullscreen layout

- Use backButtonClassName to position or restyle the back button

- Override PopperComponent prop if you need custom dropdown behavior