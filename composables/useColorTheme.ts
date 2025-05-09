interface ColorTheme {
  fields: {
    palette: string;
  }
}

enum ThemeColors {
  white = 'bg-white text-black',
  black = 'bg-black text-white',
  silver = 'bg-ff-silver text-black',
}

// Create a type to ensure the internalName is one of the enum keys
type ThemeKey = keyof typeof ThemeColors;

export const useColorTheme = (colorTheme: Ref<ColorTheme | null | undefined>) => {
  
  const theme = computed((): string => {
    if (!colorTheme.value) {
      return 'bg-white text-black';
    }
    
    // Check if the palette exists in the enum
    const key = colorTheme.value.fields.palette.toLowerCase() as ThemeKey;
    
    // Return the enum value if it exists, otherwise return the default
    return ThemeColors[key] || 'bg-white text-black';
  });

  return {
    theme
  }
};
