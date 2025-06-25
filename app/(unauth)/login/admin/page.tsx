/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAdmin } from "@/lib/API/Admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string(),
});

const Login = ()=>{
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{[key: string]: string}>({});
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setError({});
        setLoading(false);
        const res:any = await loginAdmin(values);
        if(res.error){
            setError({backendError: res.error});
            console.error("Error", res.error);
            return;
        }
        router.push('/dashboard');
    }

    return (
        <div className="p-5 pt-16 md:pt-32 flex-1 h-full flex items-center justify-center">
            <Card className="p-5 max-w-md">
                <h1 className="text-2xl font-bold mb-5">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">
                        <div className="flex-1 space-y-5 w-full">
                            <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="!mt-10">
                                {error.backendError && <div className="text-sm font-medium text-destructive mb-2">{error.backendError}</div>}
                                <Button type="submit" className="w-full" disabled={loading}>Login</Button>
                            </div>
                        </div>
                    </form>
                </Form>                       
            </Card>
        </div>
    )
}

export default Login;