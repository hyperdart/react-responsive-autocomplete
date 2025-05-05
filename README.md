#  ResponsiveAutocomplete

A responsive React component that mimics Material-UI's Autocomplete and adapts to **mobile** with a full-screen Experience for a better UX.

---

## ✨ Features
- ✅ Support Mutiple MUI version (4,5 & 6)
- ✅ Responsive Design – switches between standard and fullscreen layouts automatically  
- ✅ Mobile Optimization – mobile version takes full screen for better mobile experience
- ✅ Customizable Back Button & Layout – add styles with the available props
- ✅ Fully Compatible with MUI  Autocomplete – just swap your import, and it works
- ✅ Zero breaking changes: use it exactly like mui Autocomplete

---

##  Getting Started

```bash

# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

## Components  
There are 2 components that can be used from this package  
- `Autocomplete` for muiv5 and muiv6 versions  

```js
import { Autocomplete } from 'react-responsive-autocomplete';
```
- `AutocompleteV4` for muiv4 version
```js
import { AutocompleteV4 } from 'react-responsive-autocomplete';
```


## Mobile View
<table align="center" >
    <tr>
      <td style="border: 1px solid #eeeeee; padding: 4px; text-align: center;">
        <img src="assets/mobile-example.gif" width="350px" alt="Demo" />
      </td>
    </tr>
  </table>

## Desktop View
<table align="center">
    <tr>
      <td style="border: 1px solid #f5f5f5; padding: 4px; text-align: center;">
        <img src="assets/desktop-example.gif" width="700px" alt="Demo" />
      </td>
    </tr>
  </table>

## ⚙️ Props

### Autocomplete
All standard props from `MUI v5/v6 Autocomplete` are supported.

| Prop                  | Type       | Description |
|-----------------------|------------|-------------|
| `mobilebackgroundClassName`  | string     | Optional class added to the fullscreen container on mobile |
| `backButtonClassName` | string     | Optional class added to the back <IconButton> shown in mobile fullscreen |
| `mobileBackgroundSx`  | object     | Optional sz added to the fullscreen  container on mobile |
| `backButtonSx` | object     | Optional sx added to the back <IconButton> shown in mobile fullscreen |

### AutocompleteV4
All standard props from `MUI v5/v6 Autocomplete` are supported.
| Prop                  | Type       | Description |
|-----------------------|------------|-------------|
| `mobilebackgroundClassName`  | string     | Optional class added to the fullscreen <div> container on mobile |
| `backButtonClassName` | string     | Optional class added to the back <IconButton> shown in mobile fullscreen |


## Customization Tips
- Use mobileDivClassName to tweak mobile fullscreen layout

- Use backButtonClassName to position or restyle the back button

