import { useState, useRef, useEffect, useMemo } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import { logoutAdmin } from '@/lib/API/Admin';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import { ChevronDown, ChevronUp, LogOut, Settings, Users, LayoutDashboard, Logs, Sun, Moon } from 'lucide-react';
import { RiUserFollowLine, RiListCheck, RiUserUnfollowLine } from 'react-icons/ri';
import { PiChalkboardTeacher } from "react-icons/pi";
import { Button } from '@/components/ui/button';
import { useTheme } from "next-themes";
import Link from 'next/link';

// Define the shape of the state object
interface OpenSections {
    [key: string]: boolean;
}

const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const [openSections, setOpenSections] = useState<OpenSections>({});
    const sectionsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [loggingOut, setLoggingOut] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const toggleSection = (section: string) => {
        setOpenSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const handleLogout = async () => {
        if (loggingOut) return;
        try {
            setLoggingOut(true);
            const res = await logoutAdmin();
            if (res) {
                router.push('/login/admin');
            } else {
                console.error('Failed to logout');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoggingOut(false);
        }
    };

    const handleLinkClick = () => {
        setSidebarOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (sidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen]);

    const logo = useMemo(() => (
        <Image src={Logo} alt="logo" width={260} height={70} className='w-auto h-auto' />
      ), []);

    return (
        <div className="relative" ref={sidebarRef}>
            <button
                className={`md:hidden p-2 fixed top-4 left-4 z-50 transition-transform duration-300 ease-in-out ${sidebarOpen && ''}`}
                onClick={() => setSidebarOpen(prev=>!prev)}
            >
                <Logs className="w-6 h-6" />
            </button>
            <div
                className={`bg-background fixed overflow-clip md:static z-40 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col w-64 h-screen border-r border-gray-200 dark:border-slate-800 duration-300`}
            >
                <div className='flex p-5 text-center items-center justify-center max-md:pl-16'>
                    {logo}
                </div>
                <div className="px-6 text-2xl font-semibold">
                    👋 Hi, {user?.first_name ? user?.first_name : "Chief"}
                </div>
                <div className="flex flex-col p-4 flex-grow overflow-y-auto">
                    <Link href="/dashboard" className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800" onClick={handleLinkClick}>
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                    </Link>
                    <div className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800 cursor-pointer" onClick={() => toggleSection('teachers')}>
                        <PiChalkboardTeacher className="w-5 h-5 mr-2" /> Teachers
                        {openSections.teachers ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />}
                    </div>
                    <div 
                        ref={(el) => { sectionsRefs.current['teachers'] = el; }}
                        className={`overflow-clip transition-all duration-300 ${openSections.teachers ? 'max-h-96' : 'max-h-0'}`}
                        style={{ maxHeight: openSections.teachers ? sectionsRefs.current['teachers']?.scrollHeight : 0 }}
                    >
                        <div className='flex flex-col ml-5'>
                            <Link href="/dashboard/teachers/request-to-join/" className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800" onClick={handleLinkClick}>
                                <RiUserFollowLine className="w-4 h-4 mr-2" /> Requests to Join
                            </Link>
                            <Link href="/dashboard/teachers/" className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800" onClick={handleLinkClick}>
                                <RiListCheck className="w-4 h-4 mr-2" /> List All
                            </Link>
                            <Link href="/dashboard/teachers/blocked" className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800" onClick={handleLinkClick}>
                                <RiUserUnfollowLine className="w-4 h-4 mr-2" /> Blocked Teachers
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800 cursor-pointer" onClick={() => toggleSection('users')}>
                        <Users className="w-4 h-4 mr-2" /> Students
                        {openSections.users ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />}
                    </div>
                    <div 
                        ref={(el) => { sectionsRefs.current['users'] = el; }}
                        className={`overflow-clip transition-all duration-300 ${openSections.users ? 'max-h-96' : 'max-h-0'}`}
                        style={{ maxHeight: openSections.users ? sectionsRefs.current['users']?.scrollHeight : 0 }}
                    >
                        <div className='flex flex-col ml-5'>
                            <Link href="#" className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800" onClick={handleLinkClick}>
                                <RiUserFollowLine className="w-4 h-4 mr-2" /> Requests to Join
                            </Link>
                            <Link href="#" className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800" onClick={handleLinkClick}>
                                <RiListCheck className="w-4 h-4 mr-2" /> List All
                            </Link>
                            <Link href="#" className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800" onClick={handleLinkClick}>
                                <RiUserUnfollowLine className="w-4 h-4 mr-2" /> Blocked Students
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 border-t border-gray-200 dark:border-slate-800">
                    <div className='py-5'>
                        {/* dark mode button */}
                        <Button className="bg-transparent items-center justify-center text-center mx-auto !w-fit text-black hover:text-primary-foreground hover:bg-[#393939] dark:bg-transparent dark:border-slate-800 border" onClick={() => theme == 'dark' ? setTheme('light') : setTheme('dark')}>
                            {theme == 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </Button>
                    </div>
                    <Link href="#" className="flex items-center p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800" onClick={handleLinkClick}>
                        <Settings className="w-4 h-4 mr-2" /> Settings
                    </Link>
                    <Button variant="ghost" onClick={handleLogout} className="flex items-center justify-start p-2 rounded-md hover:bg-primary hover:text-white dark:hover:text-slate-800 text-start">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
