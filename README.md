# 📱 ResponsiveAutocomplete

A responsive React component that mimics Material-UI's Autocomplete and adapts to **mobile** with a full-screen dialog for a better UX.

---

## ✨ Features

- ✅ MUI Autocomplete on desktop  
- ✅ Full-screen dialog on mobile With same autocomplete features 
- ✅ Mobile-specific optional onInputChangeMobile props  (Retains last search if back is pressed without selecting )
- ✅ Can be use with same props as mui Autocomplete

---

## 🔧 Getting Started

```bash

# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

> Do the same thing in both main and example folder

## ⚙️ Props

| Prop                  | Type       | Description |
|-----------------------|------------|-------------|
| `options`             | array      | Options to display in the dropdown. |
| `inputValue`          | string     | Current text input value. |
| `onInputChange`       | function   | Called when input changes. `(event, value, reason)` |
| `onInputChangeMobile` | function   | Called when input changes on mobile. `(value)` |
| `onChange`            | function   | Called when a user selects an option. `(event, value)` |
| `getOptionLabel`      | function   | Returns the label for a given option. |
| `renderInput`         | function   | Renders the input field (required for MUI Autocomplete). |
| `renderOption`        | function   | Custom rendering for each dropdown option. |
| `label`               | string     | Label to show inside the TextField (mobile only). |
| `loading`             | boolean    | If true, shows loading spinner in dropdown. |
| `style`               | object     | Custom inline styles for the component. |
| `classes`             | object     | MUI-style object for class overrides. |
| `freeSolo`            | boolean    | Allows custom values not in the dropdown. |

## Desktop Flow

- Uses Material-UI's native Autocomplete component.

- You can pass all the usual props you use with MUI Autocomplete.


## Mobile Flow

- Input field is readonly.

- Clicking it opens a full-screen dialog.

- Inside dialog, user types search and sees dropdown options.

```mermaid
flowchart TD
  A[User clicks input field] --> B[Dialog Opens Fullscreen]
  B --> C[User types query]
  C --> D[Options Rendered Below]
  D --> E{Did user select an option?}
  E -- Yes --> F[Close Dialog & Pass Value to onChange]
  E -- No --> G[User presses back button]
  G --> H{Was onInputChangeMobile passed?}
  H -- Yes --> I[Dialog Closes, Last Input Retained ]
  H -- No --> J[Dialog Closes, User-entered query shown ]
 ```


## 🧩 Requirements
### This library requires the following versions:

- React ^17.0.2

- Material-UI Core ^4.12.4

- Material-UI Icons ^4.11.3

- Material-UI Lab ^4.0.0-alpha.47

> ⚠️ Currently works with MUI v4 and React 17 only.
## 💡 Key Points

- 📱 On **mobile**, clicking the input opens a full-screen dialog with a input-box and dropdown.
- 🖥️ On **desktop**, it uses native Material-UI's `Autocomplete` with all default behavior.
- `onInputChangeMobile` is optional. If not provided, 
`onInputChange` will be reused on mobile.
- `label` is optional. For showing label on mobile text box, 
- When user presses the **back arrow** in mobile view without selecting an option, the last typed query is retained or new query retained based on wether the onInputChangeMobile is passed or not.
- You can pass `style` and `classes` props for both desktop and mobile customization.