import { createTheme } from "@material-ui/core";
const overrides = {
	"light": {
		MuiTableRow: {
			head: {
				background: '#EEEEEE',
			},
		},
	},
	"dark": {
		MuiTableRow: {
			head: {
				background: '#212121',
			},
		},
	},
	"lightsOut": {
		MuiTableRow: {
			head: {
				background: '#212121',
			},
		},
	}
}
const themes = {
	default: {
		palette: {
			type: 'light',
		},
		typography: { useNextVariants: true,
		    // "fontFamily": "Quicksand"
		 },
		shape:{
			borderRadius:12
		}
		
	},
	light: {
		overrides: {
			...overrides["light"]
		},
		palette: {
			primary: {
				main: '#F05F40'
			},
			secondary: {
				main: '#40f0bb'
			},
			type: 'light',
			background: {
				default: '#F5F5F5',
				cardContainer:"#fafafa",
			},
			customShadow:"0px 6px 9px 0px #00000014"
		},
		typography: { useNextVariants: true,
		    // "fontFamily": "Quicksand"
		 },
		shape:{
			borderRadius:12
		}
	},
	dark: {
		overrides: {
			...overrides["dark"]
		  },
		palette: {
			primary: {
				main: '#F05F40'
			},
			type: 'dark',
			background: {
				cardContainer:null,
			},
			customShadow:"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
		},
		typography: { useNextVariants: true,
		    // "fontFamily": "Quicksand"
		 },
		shape:{
			borderRadius:12
		}
	},
	lightsOut: {
		overrides: {
			...overrides["lightsOut"]
		  },
		palette: {
			primary: {
				main: '#F05F40'
      },
			type: 'dark',
			background: {
				default: '#000',
				paper: '#000',
				cardContainer:'#000'
			}
		},
		shadows: Array(25).fill('0px 4px 12px #888888'),
		typography: { useNextVariants: true,
		    // "fontFamily": "Quicksand"
		 },
		shape:{
			borderRadius:12
		}
  },
}
export const makeTheme = (theme="light") => {
	let themeObj = themes[theme] 
	const original = createTheme(themeObj);
	if(themeObj.palette.customShadow){
	  original.shadows[1] =themeObj.palette.customShadow;
	  original.shadows[2] =themeObj.palette.customShadow;
	}
	return original
  };

export default themes;
