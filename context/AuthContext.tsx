import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRole } from '@/lib/API/Miscellaneous';

// Create AuthContext
const AuthContext = createContext<
  {
    user: any,
    loading: boolean,
    role: string,
    availableRoles: string[],
  }
>({ user: {}, loading: true, role: "", availableRoles: [] });



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | { role: string }>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("T");
  const [availableRoles, setAvailableRoles] = useState(["teacher", "student", "parent", "admin"]); // Available roles [teacher, student
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await getRole() as any;
      setRole(response.role);
      setUser(response);
      return;

    } catch (error) {


      console.error('Error fetching user data:', error);

      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const isAuthorized = (allowedRoles: string[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };


  const authContextValue = {
    user,
    loading,
    role,
    availableRoles
  };


  return <AuthContext.Provider value={authContextValue}>
    {loading ? <div className='w-screen flex items-center justify-center' style={{ height: '100vh' }}><div className='border-gray-300 animate-spin rounded-full' style={{ height: '200px', width: '200px', borderWidth: '0px', borderLeftWidth: '4px', borderTopWidth: '4px', boxSizing: 'border-box' }}></div></div> : children}
  </AuthContext.Provider>;
};


// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);