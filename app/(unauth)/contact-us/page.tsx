/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactUs } from "@/lib/API/ContactUs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { z } from "zod";


const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name can't exceed 50 characters"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number").min(10, "Phone number must be at least 10 characters long"),
    email: z.string().email("Invalid email address"),
    message: z.string()
})

const ContactUs = () => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ [key: string]: string }>({});
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            message: "",
        },
    })
    const { reset } = form;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const res: any = await contactUs(values);
            if (res.message) {
                alert(res.message);
                reset();
            } else {
                setError({ backendError: res.error });
            }
        } catch (e) {
            console.error(e);
            alert("Something went wrong, Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="p-5">
            <div className="flex flex-wrap gap-5 justify-center [&>*]:min-w-[300px]">
                <Card className="relative z-0 overflow-hidden flex-1 max-w-[500px] bg-accent text-slate-800 dark:text-primary p-5">
                    <div className="h-full">
                        <h1 className="text-2xl font-semibold leading-none tracking-tight">Contact Information</h1>
                        <div className="flex flex-col justify-between h-full pb-10">
                            <div className="mt-10 space-y-5 font-semibold">
                                <Link href="mailto:info@oeducators.com" target="_blank" passHref className="hover:underline flex gap-2 items-center hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaEnvelope size={24} />info@oeducators.com</Link>
                                <Link href="tel:+918292168666" passHref className="hover:underline flex gap-2 items-center hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><BsFillTelephoneFill size={24}/> +918292168666</Link>
                                {/* <address className="not-italic flex gap-2 hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100">
                                    <FaLocationDot size={24}/>
                                    House Number - GE.004.1524 <br/>
                                    Siddharthpuri Colony, <br/>
                                    Road Number - 01, <br/>
                                    Manpur - Gaya, Bihar 823003 <br/>
                                </address> */}
                                <address className="not-italic flex gap-2 hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100">
                                    <FaLocationDot size={24}/>
                                    Nutan Nagar, <br/>
                                    Gaya, Bihar 823003 <br/>
                                </address>
                            </div>
                            <div className="z-10 flex gap-5 hover:[&>*]:bg-white hover:[&>*]:border-primary [&>*]:rounded-full [&>*]:border-2 [&>*]:border-transparent [&>*]:transition-all [&>*]:ease-in-out [&>*]:duration-500">
                                <Link href="https://www.instagram.com/oeducators/" target="_blank" passHref className="hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaInstagram size={24} /></Link>
                                <Link href="https://www.facebook.com/oeducators/" target="_blank" passHref className="hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaFacebookF size={24} /></Link>
                                <Link href="https://www.linkedin.com/company/oeducators/" target="_blank" passHref className="hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaLinkedinIn size={24} /></Link>
                                <Link href="https://x.com/OmniFriend2019" target="_blank" passHref className="hover:text-black p-2 rounded-full transition-colors ease-in-out duration-100"><FaXTwitter size={24} /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="bg-primary/50 h-10 w-10 md:h-52 md:w-52 rounded-full animate-[ping_50000ms_ease-out_0ms_infinite_alternate] absolute z-0 bottom-10 -right-20"></div>
                        <div className="bg-primary/50 h-10 w-10 md:h-24 md:w-24 rounded-full animate-[ping_10000ms_ease-out_10ms_infinite_alternate] absolute z-0 bottom-10 -right-10"></div>
                        <div className="bg-primary/50 h-10 w-10 md:h-10 md:w-10 rounded-full animate-[ping_20000ms_ease-out_50ms_infinite_alternate] absolute z-0 bottom-10 -right-5"></div>
                    </div>
                    <div className="flex">
                        <div className="bg-primary/50 h-10 w-10 md:h-52 md:w-52 rounded-full animate-[ping_50000ms_ease-out_00ms_infinite_alternate] absolute z-0 -bottom-30 -left-20"></div>
                        <div className="bg-primary/50 h-10 w-10 md:h-24 md:w-24 rounded-full animate-[ping_10000ms_ease-out_10ms_infinite_alternate] absolute z-0 -bottom-30 -left-10"></div>
                        <div className="bg-primary/50 h-10 w-10 md:h-10 md:w-10 rounded-full animate-[ping_20000ms_ease-out_50ms_infinite_alternate] absolute z-0 -bottom-30 -left-5"></div>
                    </div>
                </Card>
                <Card className="max-w-[500px] flex-1">
                    <CardHeader>
                        <h1 className="text-2xl font-semibold leading-none tracking-tight">Contact Us</h1>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter your full name." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter your Phone Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please enter your Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                {/* <Input placeholder="Your Message" {...field} /> */}
                                                <Textarea placeholder="Please enter Your Message." {...field}></Textarea>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="!mt-5">
                                    {error.backendError && <div className="text-sm font-medium text-destructive mb-2">{error.backendError}</div>}
                                    <Button type="submit" className="w-full" disabled={loading}>Register</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                
            </div>
        </div>
    );
}

export default ContactUs;