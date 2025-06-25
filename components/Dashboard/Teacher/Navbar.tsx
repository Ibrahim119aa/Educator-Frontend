"use client"

import * as React from "react"
import Link from "next/link"
import Logo from '@/assets/images/logo.png';
import { Menu, Moon, Sun, Bell, LogOut, LayoutDashboard } from "lucide-react"

// import { Icons } from "@/components/icons"
import {
    NavigationMenu,
  
    NavigationMenuItem,
  
    NavigationMenuList,
   
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { useTheme } from "next-themes";
import { Button } from "../../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { logoutTeacher } from "@/lib/API/Teacher";


const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const {  user } = useAuth();
    const router = useRouter();
    const [loggingOut, setLoggingOut] = React.useState(false);

    const handleLogout = async () => {
        if (loggingOut) return;
        try {
            setLoggingOut(true);
            const res = await logoutTeacher();
            if (res) {
                router.push('/login');
            } else {
                console.error('Failed to logout');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <div className="min-h-16 items-center flex justify-between gap-5 px-5 border-b border-gray-100 dark:border-slate-900 sticky top-0 bg-background z-50">
            <Image src={Logo} alt="Logo" width={200} className="h-auto" priority={true} />


            <div className="max-md:fixed max-md:top-0 max-md:h-screen max-md:bg-white max-md:max-w-xs max-md:w-[calc(100%-50px)]
                max-md:peer-checked:left-0 max-md:-left-full max-md:transition-all max-md:duration-300 max-md:shadow-md max-md:shadow-black 
                max-md:p-5 max-md:z-50 dark:bg-black
                ">
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList className="flex max-md:flex-col max-md:w-60 max-md:[&_*]:w-full gap-2">
                        <div className="flex gap-2 [&>*]:text-center">
                            <NavigationMenuItem>
                                <Popover>
                                    <PopoverTrigger className="!w-fit">
                                        <Button className={navigationMenuTriggerStyle() + " text-inherit dark:bg-transparent"}>
                                            <Bell size={24} />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="text-sm text-center">No Notification</div>
                                    </PopoverContent>
                                </Popover>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Button className="bg-transparent !w-fit text-black hover:text-primary-foreground hover:bg-[#393939] dark:bg-transparent" onClick={() => theme == 'dark' ? setTheme('light') : setTheme('dark')}>
                                    {theme == 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                                </Button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Sheet>
                                    <SheetTrigger className="!w-fit">
                                        {<Avatar>
                                            {/* <AvatarImage src={user.photo ? `${process.env.NEXT_PUBLIC_BACKEND}/${user.photo}` : createSVGDataUrl(user?.first_name?.[0] ?? "")} /> */}
                                            <AvatarImage src={`${process.env.NEXT_PUBLIC_BACKEND}/${user.photo}`} />
                                            <AvatarFallback>O</AvatarFallback>
                                        </Avatar>}
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Menu</SheetTitle>
                                            <SheetDescription></SheetDescription>
                                        </SheetHeader>
                                        <div className="[&>*]:w-full [&>*]:justify-start [&_svg]:mr-2 [&_svg]:h-4 [&_svg]:w-4 [&>*]:cursor-pointer">
                                            {/* <Button variant={"ghost"} asChild><Link href="/"><Home /> Home</Link></Button> */}
                                            <Button variant={"ghost"} asChild><Link href="/dashboard"><LayoutDashboard /> Dashboard</Link></Button>
                                            <Button variant={"ghost"} asChild onClick={handleLogout} disabled={loggingOut}><span className="select-none"><LogOut /> Logout</span></Button>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </NavigationMenuItem>
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>



            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <div>
                            <Button variant="ghost"><Menu className="md:hidden" /></Button>
                        </div>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col flex-1 py-5 justify-between [&>*]:w-full [&>*]:justify-start [&_svg]:mr-2 [&_svg]:h-4 [&_svg]:w-4 [&>*]:cursor-pointer">
                            <div className="[&>*]:w-full [&>*]:justify-start [&_svg]:mr-2 [&_svg]:h-4 [&_svg]:w-4 [&>*]:cursor-pointer">
                                {/* <Button variant={"ghost"} asChild><Link href="/"><Home /> Home</Link></Button> */}
                                <SheetClose asChild>
                                    <Button variant={"ghost"} asChild><Link href="/dashboard"><LayoutDashboard /> Dashboard</Link></Button>
                                </SheetClose>
                            </div>
                            <div className="flex justify-start">
                                <NavigationMenu className="mx-auto">
                                    <NavigationMenuList className="flex  max-md:flex-col max-md:w-60 max-md:[&>*]:w-full gap-2">
                                        <div className="flex gap-2 [&>*]:flex [&>*]:!w-fit">
                                            <NavigationMenuItem>
                                                <Popover>
                                                    <PopoverTrigger className="!w-fit">
                                                        <Button className={navigationMenuTriggerStyle() + " text-inherit dark:bg-transparent [&_*]:!m-0"}>
                                                            <Bell size={24} />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <div className="text-sm text-center">No Notification</div>
                                                    </PopoverContent>
                                                </Popover>
                                            </NavigationMenuItem>
                                            <NavigationMenuItem>
                                                <Button className="bg-transparent !w-fit text-black hover:text-primary-foreground hover:bg-[#393939] dark:bg-transparent [&_*]:!m-0" onClick={() => theme == 'dark' ? setTheme('light') : setTheme('dark')}>
                                                    {theme == 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                                                </Button>
                                            </NavigationMenuItem>
                                        </div>
                                        <Button variant={"ghost"} onClick={handleLogout} disabled={loggingOut}><div className="select-none w-full flex items-center "><LogOut /> Logout</div></Button>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )




    return (
        <div className="min-h-16 items-center flex justify-between gap-5 px-5 border-b border-gray-100 dark:border-slate-900 sticky top-0 bg-background z-50">
            <Image src={Logo} alt="Logo" width={250} className="h-auto" priority={true} />
            <label htmlFor="menu-toggle" className="">
                <Menu className="md:hidden" />
            </label>
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <div className="max-md:fixed max-md:top-0 max-md:h-screen max-md:bg-white max-md:max-w-xs max-md:w-[calc(100%-50px)]
                max-md:peer-checked:left-0 max-md:-left-full max-md:transition-all max-md:duration-300 max-md:shadow-md max-md:shadow-black 
                max-md:p-5 max-md:z-50 dark:bg-black
                ">
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList className="flex max-md:flex-col max-md:w-60 max-md:[&_*]:w-full gap-2">
                        <div className="flex gap-2 [&>*]:text-center">
                            <NavigationMenuItem>
                                <Popover>
                                    <PopoverTrigger className="!w-fit">
                                        <Button className={navigationMenuTriggerStyle() + " text-inherit dark:bg-transparent"}>
                                            <Bell size={24} />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="text-sm text-center">No Notification</div>
                                    </PopoverContent>
                                </Popover>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Button className="bg-transparent !w-fit text-black hover:text-primary-foreground hover:bg-[#393939] dark:bg-transparent" onClick={() => theme == 'dark' ? setTheme('light') : setTheme('dark')}>
                                    {theme == 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                                </Button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Sheet>
                                    <SheetTrigger className="!w-fit">
                                        <Avatar>
                                            <AvatarImage src="/profile_default_logo.png" />
                                            <AvatarFallback>O</AvatarFallback>
                                        </Avatar>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Menu</SheetTitle>
                                            <SheetDescription></SheetDescription>
                                        </SheetHeader>
                                        <div className="[&>*]:w-full [&>*]:justify-start [&_svg]:mr-2 [&_svg]:h-4 [&_svg]:w-4 [&>*]:cursor-pointer">
                                            {/* <Button variant={"ghost"} asChild><Link href="/"><Home /> Home</Link></Button> */}
                                            <Button variant={"ghost"} asChild><Link href="/dashboard"><LayoutDashboard /> Dashboard</Link></Button>
                                            <Button variant={"ghost"} asChild onClick={handleLogout} disabled={loggingOut}><span className="select-none"><LogOut /> Logout</span></Button>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </NavigationMenuItem>
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}


export default Navbar;