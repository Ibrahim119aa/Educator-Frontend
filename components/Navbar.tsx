"use client"

import * as React from "react";

import Link from "next/link"
import Logo from '@/assets/images/logo.png';
import { Menu } from 'lucide-react';
import { Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import { Icons } from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useState } from "react"

const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Teachers", href: "/teachers" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Login", href: "/login" },
];

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleLinkClick = () => {
        setIsSheetOpen(false);
    };

    return (
        <div className="min-h-16 items-center flex justify-between gap-5 px-5 border-b border-gray-100 dark:border-slate-900 sticky top-0 bg-background z-10">
            <Image src={Logo} alt="Logo" width={200} className="h-auto" priority={true} />

            <div className="max-lg:fixed max-lg:top-0 max-lg:h-screen max-lg:bg-white max-lg:max-w-xs max-lg:w-[calc(100%-50px)]
                max-lg:peer-checked:left-0 max-lg:-left-full max-lg:transition-all max-lg:duration-300 max-lg:shadow-md max-lg:shadow-black 
                max-lg:p-5 max-lg:z-50 dark:bg-black
                ">
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList className="flex max-lg:flex-col max-lg:w-60 max-lg:[&_*]:w-full gap-2">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.href}>
                                <Link href={item.href} legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {item.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                        <NavigationMenuItem>
                            <Button
                                variant="link"
                                className="!w-fit"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="lg:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <div>
                            <Button variant="ghost"><Menu className="lg:hidden" /></Button>
                        </div>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col">
                        <div className="py-5 w-full">
                            <NavigationMenu className="w-full">
                                <NavigationMenuList className="flex max-lg:flex-col max-lg:w-60 max-lg:[&_*]:w-full gap-2">
                                    {navItems.map((item) => (
                                        <NavigationMenuItem key={item.href}>
                                            <Link href={item.href}>
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={handleLinkClick}>
                                                    {item.label}
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                    ))}
                                    <NavigationMenuItem>
                                        <Button
                                            className="bg-transparent !w-fit text-black hover:text-primary-foreground hover:bg-[#393939] dark:bg-transparent"
                                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                        >
                                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                                        </Button>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default Navbar;