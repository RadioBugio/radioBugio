import * as React from "react";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { langRouteMap } from "../Lang/";
import { useLocation } from "react-router-dom";
import { langId } from "../Lang/translation";
import { useNavigate } from "react-router-dom";

const LangContext = React.createContext({ lang: langId.PT, toggle: () => {} });

export const useLang = () => useContext(LangContext);

export function LangProvider({ children }) {
    const [lang, setLang] = useState(langId.PT);
    const [animationDone, setAnimationDone] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const basePath = pathname.split("/")[1];
        let newLang = lang;
        Object.entries(langRouteMap).forEach(([lang, routeObject]) => {
            if (Object.values(routeObject).includes(basePath)) {
                newLang = lang;
            }
        });
        setLang(newLang);
    }, [pathname]);

    const toggleLang = () => {
        const newLang = lang === langId.PT ? langId.EN : langId.PT;
        const [pre, base, ...rest] = pathname.split("/");
        const newBase = langRouteMap[newLang][base];
        const newPathname = [pre, newBase, ...rest].join("/");
        navigate(newPathname);
        setLang(newLang);
        localStorage.setItem("lang", newLang);
    };

    useState(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang) {
            setLang(storedLang);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-lang", lang);
    }, [lang]);

    const translateRoute = (routeKey) => {
        const routeTranslations = {
            home: { pt: "/", en: "/en" },
            sobre: { pt: "/sobre", en: "/about" },
            arquivo: { pt: "/arquivo", en: "/archive" },
            filme: { pt: "/arquivo/:slug", en: "/archive/:slug" },
        };
        return routeTranslations[routeKey][lang.toLowerCase()];
    };

    return (
        <LangContext.Provider
            value={{
                lang,
                toggleLang,
                animationDone,
                setAnimationDone,
                translateRoute,
                setLang,
            }}
        >
            {children}
        </LangContext.Provider>
    );
}
