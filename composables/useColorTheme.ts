interface ColorTheme {
  fields: {
    internalName: string;
    palette: string;
  }
}

enum ThemeColors {
  silver = 'bg-silver text-black',
  white = 'bg-white text-black',
  black = 'bg-black text-white',
}

// Create a type to ensure the internalName is one of the enum keys
type ThemeKey = keyof typeof ThemeColors;

export const useColorTheme = (colorTheme: Ref<ColorTheme | null | undefined>) => {
  
  const theme = (): string => {
    if (!colorTheme.value) {
      return 'bg-white text-black';
    }
    
    // Check if the internalName exists in the enum
    const key = colorTheme.value.fields.internalName as ThemeKey;
    
    // Return the enum value if it exists, otherwise return the default
    return ThemeColors[key] || 'bg-white text-black';
  }

  return {
    theme
  }
};
