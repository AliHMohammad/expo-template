import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

type TStyle = { backgroundColor: string; textStyle?: string; restaurantCardStyle?: string };

type StyleContextType = {
    theme: TStyle;
};

const StyleContext = createContext<StyleContextType>(null!);

export default function StyleProvider(props: { children: React.ReactNode }) {
    const colorScheme = useColorScheme();

    const lightTheme: TStyle = {
        backgroundColor: "bg-slate-100",
    };

    const darkTheme: TStyle = {
        backgroundColor: "bg-slate-800",
        textStyle: "text-slate-300",
        restaurantCardStyle: "bg-slate-700",
    };

    const theme = colorScheme === "light" ? lightTheme : darkTheme;

    return <StyleContext.Provider value={{ theme }}>{props.children}</StyleContext.Provider>;
}

export function useStyling() {
    return useContext(StyleContext);
}
